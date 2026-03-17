import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_ROOT = path.resolve(__dirname, '../news-data');

const TYPES = {
  news: { dir: 'latest-updates', table: 'news' },
  cases: { dir: 'case-studies', table: 'cases' },
};

function slug(s) {
  return String(s)
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5\-]/g, '')
    .slice(0, 50);
}

function dateStr(d) {
  if (!d) return '';
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function folderName(meta) {
  const d = dateStr(meta.date);
  const t = slug(meta.title) || 'untitled';
  return `${d}_${t}`;
}

function getConfig(type) {
  const cfg = TYPES[type];
  if (!cfg) throw new Error('Invalid type: ' + type);
  return cfg;
}

export function getDataDir(type) {
  const { dir } = getConfig(type);
  return path.join(DATA_ROOT, dir);
}

function mapRowToMeta(row) {
  let content = [];
  if (row.content_json) {
    try {
      content = JSON.parse(row.content_json);
    } catch {
      content = [];
    }
  }

  return {
    id: row.id,
    folderName: row.folder_name,
    title: row.title,
    date: row.date,
    author: row.author || '',
    category: row.category || '',
    desc: row.description || '',
    content,
    img: row.img || '',
    published: !!row.published,
  };
}

export async function listItems(type, options = {}) {
  const { table } = getConfig(type);
  const { publishedOnly = false } = options;

  let sql = `SELECT id, folder_name, title, date, author, category, description, content_json, img, published FROM ${table}`;
  const params = [];
  if (publishedOnly) {
    sql += ' WHERE published = 1';
  }
  sql += ' ORDER BY date DESC, id DESC';

  const [rows] = await pool.query(sql, params);
  return rows.map(mapRowToMeta);
}

export async function getItem(type, folderName) {
  const { table } = getConfig(type);
  const [rows] = await pool.query(
    `SELECT id, folder_name, title, date, author, category, description, content_json, img, published FROM ${table} WHERE folder_name = ? LIMIT 1`,
    [folderName],
  );
  if (!rows.length) return null;
  return mapRowToMeta(rows[0]);
}

export async function getItemById(type, id) {
  const { table } = getConfig(type);
  const [rows] = await pool.query(
    `SELECT id, folder_name, title, date, author, category, description, content_json, img, published FROM ${table} WHERE id = ? LIMIT 1`,
    [id],
  );
  if (!rows.length) return null;
  return mapRowToMeta(rows[0]);
}

export async function createItem(type, meta, coverFile) {
  const { table } = getConfig(type);
  const baseDir = getDataDir(type);
  await fs.mkdir(baseDir, { recursive: true });

  const isDraft = meta.published === false;
  const name = folderName(meta);

  if (isDraft) {
    const [rows] = await pool.query(
      `SELECT id, folder_name, title, date, author, category, description, content_json, img, published FROM ${table} WHERE published = 0 AND folder_name LIKE ? LIMIT 1`,
      [name + '%'],
    );
    if (rows.length) {
      return updateItem(type, rows[0].folder_name, meta, coverFile);
    }
  }

  let folder = name;
  let n = 0;
  // 确保 folder_name 唯一
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [rows] = await pool.query(`SELECT id FROM ${table} WHERE folder_name = ? LIMIT 1`, [folder]);
    if (!rows.length) break;
    n += 1;
    folder = `${name}-${n}`;
  }

  const itemDir = path.join(baseDir, folder);
  await fs.mkdir(itemDir, { recursive: true });
  await fs.mkdir(path.join(itemDir, 'images'), { recursive: true });

  const contentJson = JSON.stringify(Array.isArray(meta.content) ? meta.content : []);

  const published = meta.published === false ? 0 : 1;
  const d = meta.date ? dateStr(meta.date) : null;

  const [result] = await pool.query(
    `INSERT INTO ${table} (folder_name, title, date, author, category, description, content_json, img, published, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [folder, meta.title || '', d, meta.author || '', meta.category || '', meta.desc || '', contentJson, null, published],
  );

  const id = result.insertId;
  let img = null;

  if (coverFile) {
    const ext = path.extname(coverFile.originalname) || '.jpg';
    const coverPath = path.join(itemDir, 'cover' + ext);
    await fs.copyFile(coverFile.path, coverPath);
    const urlPath = `/api/uploads/${type}/${folder}/cover${ext}`;
    img = urlPath;
    await pool.query(`UPDATE ${table} SET img = ?, updated_at = NOW() WHERE id = ?`, [img, id]);
  }

  return {
    id,
    folderName: folder,
    title: meta.title || '',
    date: d,
    author: meta.author || '',
    category: meta.category || '',
    desc: meta.desc || '',
    content: JSON.parse(contentJson),
    img: img || '',
    published: !!published,
  };
}

export async function updateItem(type, folderName, meta, coverFile) {
  const { table } = getConfig(type);
  const baseDir = getDataDir(type);

  const existing = await getItem(type, folderName);
  if (!existing) return null;

  const itemDir = path.join(baseDir, folderName);
  await fs.mkdir(itemDir, { recursive: true });
  await fs.mkdir(path.join(itemDir, 'images'), { recursive: true });

  let img = existing.img || null;

  if (coverFile) {
    const ext = path.extname(coverFile.originalname) || '.jpg';
    const coverPath = path.join(itemDir, 'cover' + ext);
    await fs.copyFile(coverFile.path, coverPath);
    img = `/api/uploads/${type}/${folderName}/cover${ext}`;
  }

  const contentJson = JSON.stringify(Array.isArray(meta.content) ? meta.content : []);
  const published = meta.published === false ? 0 : 1;
  const d = meta.date ? dateStr(meta.date) : null;

  await pool.query(
    `UPDATE ${table}
     SET title = ?, date = ?, author = ?, category = ?, description = ?, content_json = ?, img = ?, published = ?, updated_at = NOW()
     WHERE folder_name = ?`,
    [meta.title || '', d, meta.author || '', meta.category || '', meta.desc || '', contentJson, img, published, folderName],
  );

  return {
    id: existing.id,
    folderName,
    title: meta.title || '',
    date: d,
    author: meta.author || '',
    category: meta.category || '',
    desc: meta.desc || '',
    content: JSON.parse(contentJson),
    img: img || '',
    published: !!published,
  };
}

export async function setPublished(type, folderName, published) {
  const { table } = getConfig(type);
  const existing = await getItem(type, folderName);
  if (!existing) return null;
  const value = published ? 1 : 0;
  await pool.query(
    `UPDATE ${table} SET published = ?, updated_at = NOW() WHERE folder_name = ?`,
    [value, folderName],
  );
  return { ...existing, published: !!value };
}

export async function deleteItem(type, folderName) {
  const { table } = getConfig(type);
  const baseDir = getDataDir(type);
  await pool.query(`DELETE FROM ${table} WHERE folder_name = ?`, [folderName]);
  const itemDir = path.join(baseDir, folderName);
  await fs.rm(itemDir, { recursive: true, force: true });
  return true;
}
