/**
 * 基于文件的存储：news-data/latest-updates 与 news-data/case-studies
 * 每条推送一个文件夹，命名为 日期_标题(slug)，内含 meta.json、封面图、images/
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_ROOT = path.resolve(__dirname, '../news-data');

const TYPES = {
  news: 'latest-updates',
  cases: 'case-studies',
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

export function getDataDir(type) {
  const dir = TYPES[type];
  if (!dir) throw new Error('Invalid type: ' + type);
  return path.join(DATA_ROOT, dir);
}

export async function listItems(type, options = {}) {
  const { publishedOnly = false } = options;
  const baseDir = getDataDir(type);
  await fs.mkdir(baseDir, { recursive: true });
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  const folders = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.'));
  const items = [];
  for (const f of folders) {
    const metaPath = path.join(baseDir, f.name, 'meta.json');
    try {
      const raw = await fs.readFile(metaPath, 'utf-8');
      const meta = JSON.parse(raw);
      meta.folderName = f.name;
      meta.id = meta.id ?? meta.folderName ?? f.name;
      if (publishedOnly && !meta.published) continue;
      items.push(meta);
    } catch (_) {
      // 无 meta 或损坏则跳过
    }
  }
  items.sort((a, b) => {
    const tA = new Date(a.date || 0).getTime();
    const tB = new Date(b.date || 0).getTime();
    return tB - tA;
  });
  return items;
}

export async function getItem(type, folderName) {
  const baseDir = getDataDir(type);
  const metaPath = path.join(baseDir, folderName, 'meta.json');
  try {
    const raw = await fs.readFile(metaPath, 'utf-8');
    const meta = JSON.parse(raw);
    meta.folderName = folderName;
    return meta;
  } catch (_) {
    return null;
  }
}

export async function getItemById(type, id) {
  const items = await listItems(type, { publishedOnly: false });
  const found = items.find((i) => String(i.id) === String(id));
  return found || null;
}

export async function createItem(type, meta, coverFile) {
  const baseDir = getDataDir(type);
  await fs.mkdir(baseDir, { recursive: true });
  const isDraft = meta.published === false;
  const name = folderName(meta);
  if (isDraft) {
    const items = await listItems(type, { publishedOnly: false });
    const existing = items.find((i) => !i.published && (i.folderName === name || i.folderName.startsWith(name + '-')));
    if (existing) {
      const updated = await updateItem(type, existing.folderName, meta, coverFile);
      return updated;
    }
  }
  const items = await listItems(type);
  const maxId = items.length ? Math.max(...items.map((i) => Number(i.id) || 0), 0) : 0;
  const id = maxId + 1;
  meta.id = id;
  meta.published = meta.published !== false;
  if (!Array.isArray(meta.content)) meta.content = [];
  let folder = name;
  let n = 0;
  while (await exists(path.join(baseDir, folder))) {
    n++;
    folder = `${name}-${n}`;
  }
  const itemDir = path.join(baseDir, folder);
  await fs.mkdir(itemDir, { recursive: true });
  await fs.mkdir(path.join(itemDir, 'images'), { recursive: true });

  if (coverFile) {
    const ext = path.extname(coverFile.originalname) || '.jpg';
    const coverPath = path.join(itemDir, 'cover' + ext);
    await fs.copyFile(coverFile.path, coverPath);
    meta.cover = 'cover' + ext;
    meta.img = `/api/uploads/${type}/${folder}/cover` + ext;
  }

  meta.folderName = folder;
  await fs.writeFile(path.join(itemDir, 'meta.json'), JSON.stringify(meta, null, 2), 'utf-8');
  return meta;
}

export async function updateItem(type, folderName, meta, coverFile) {
  const baseDir = getDataDir(type);
  const itemDir = path.join(baseDir, folderName);
  const metaPath = path.join(itemDir, 'meta.json');
  const existing = await getItem(type, folderName);
  if (!existing) return null;

  if (coverFile) {
    const ext = path.extname(coverFile.originalname) || '.jpg';
    const coverPath = path.join(itemDir, 'cover' + ext);
    await fs.copyFile(coverFile.path, coverPath);
    meta.cover = 'cover' + ext;
    meta.img = `/api/uploads/${type}/${folderName}/cover` + ext;
  } else if (existing.img) {
    meta.img = existing.img;
    meta.cover = existing.cover;
  }

  meta.id = existing.id;
  meta.folderName = folderName;
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
  return meta;
}

export async function setPublished(type, folderName, published) {
  const meta = await getItem(type, folderName);
  if (!meta) return null;
  meta.published = !!published;
  const metaPath = path.join(getDataDir(type), folderName, 'meta.json');
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
  return meta;
}

export async function deleteItem(type, folderName) {
  const baseDir = getDataDir(type);
  const itemDir = path.join(baseDir, folderName);
  await fs.rm(itemDir, { recursive: true, force: true });
  return true;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
