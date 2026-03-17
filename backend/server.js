import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  listItems,
  getItem,
  getItemById,
  createItem,
  updateItem,
  setPublished,
  deleteItem,
  getDataDir,
} from './storage.js';
import pool from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_USER = 'wanglyuran66';
const ADMIN_PASS = 'pkuyyds66';
const ADMIN_TOKEN = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));

// 上传中间件：限制单个文件和字段大小，避免超大 base64 或图片导致崩溃
const upload = multer({
  dest: path.join(__dirname, 'tmp'),
  limits: {
    fileSize: 20 * 1024 * 1024,      // 单个文件最大 20MB（封面、正文图片）
    fieldSize: 100 * 1024 * 1024,    // 单个字段（如 meta）最大 100MB
  },
});

function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
  if (token === ADMIN_TOKEN) return next();
  res.status(401).json({ error: '未授权' });
}

// 静态提供 news-data 下的上传文件（封面、正文图）
app.get('/api/uploads/:type/:folder/cover*', (req, res) => {
  const { type, folder } = req.params;
  const suffix = req.params[0] || '';
  const dir = type === 'news' ? 'latest-updates' : 'case-studies';
  const file = path.join(__dirname, '..', 'news-data', dir, folder, 'cover' + (suffix.startsWith('.') ? suffix : '.' + suffix));
  res.sendFile(file, (err) => {
    if (err) res.status(404).end();
  });
});

app.get('/api/uploads/:type/:folder/images/:filename', (req, res) => {
  const { type, folder, filename } = req.params;
  const dir = type === 'news' ? 'latest-updates' : 'case-studies';
  const file = path.join(__dirname, '..', 'news-data', dir, folder, 'images', filename);
  res.sendFile(file, (err) => {
    if (err) res.status(404).end();
  });
});

// 登录
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ token: ADMIN_TOKEN });
    return;
  }
  res.status(401).json({ error: '账号或密码错误' });
});

// ---------- 最新动态 ----------
// 前台：仅已上架（轻量字段，避免大 JSON 排序占用内存）
app.get('/api/news', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, folder_name, title, date, author, category, description, img, published
       FROM news
       WHERE published = 1
       ORDER BY date DESC, id DESC`,
    );

    const list = rows.map((row) => ({
      id: row.id,
      folderName: row.folder_name,
      title: row.title,
      date: row.date,
      author: row.author,
      category: row.category,
      desc: row.description,
      img: row.img,
      content: [], // 列表页不需要正文，详情页会通过 by-id 再取
      published: !!row.published,
    }));

    res.json(list);
  } catch (e) {
    console.error('/api/news error', e);
    res.status(500).json({ error: e.message || '服务器错误' });
  }
});

// 管理员：全部（含下架）——仅返回列表需要的轻量字段
app.get('/api/admin/news', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, folder_name, title, date, author, published
       FROM news
       ORDER BY date DESC, id DESC`,
    );

    const list = rows.map((row) => ({
      id: row.id,
      folderName: row.folder_name,
      title: row.title,
      date: row.date,
      author: row.author,
      published: !!row.published,
    }));

    res.json(list);
  } catch (e) {
    console.error('GET /api/admin/news error', e);
    res.status(500).json({ error: e.message || '服务器错误' });
  }
});

app.get('/api/news/by-id/:id', async (req, res) => {
  try {
    const list = await listItems('news', { publishedOnly: true });
    const item = list.find((i) => String(i.id) === String(req.params.id));
    if (!item) return res.status(404).json({ error: '未找到' });
    const full = await getItem('news', item.folderName);
    res.json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/news/:folder', async (req, res) => {
  try {
    const item = await getItem('news', req.params.folder);
    if (!item || !item.published) return res.status(404).json({ error: '未找到' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/news/by-id/:id', auth, async (req, res) => {
  try {
    const list = await listItems('news', { publishedOnly: false });
    const found = list.find((i) => String(i.id) === String(req.params.id));
    if (!found) return res.status(404).json({ error: '未找到' });
    const item = await getItem('news', found.folderName);
    if (!item) return res.status(404).json({ error: '未找到' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/news/:folder', auth, async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const item = await getItem('news', folder);
    if (!item) return res.status(404).json({ error: '未找到' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/news', auth, upload.single('cover'), async (req, res) => {
  try {
    const raw = req.body?.meta;
    if (raw === undefined) {
      return res.status(400).json({ error: '缺少 meta 数据' });
    }
    const meta = typeof raw === 'string' ? JSON.parse(raw) : raw;
    console.log('POST /api/admin/news meta:', JSON.stringify(meta));
    const created = await createItem('news', meta, req.file);
    res.json(created);
  } catch (e) {
    console.error('POST /api/admin/news', e);
    res.status(500).json({ error: e.message || '服务器错误' });
  }
});

app.put('/api/admin/news/:folder', auth, upload.single('cover'), async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const raw = req.body?.meta;
    if (raw === undefined) return res.status(400).json({ error: '缺少 meta 数据' });
    const meta = typeof raw === 'string' ? JSON.parse(raw) : raw;
    console.log('PUT /api/admin/news meta:', JSON.stringify(meta));
    const updated = await updateItem('news', folder, meta, req.file);
    if (!updated) return res.status(404).json({ error: '未找到' });
    res.json(updated);
  } catch (e) {
    console.error('PUT /api/admin/news/:folder', e);
    res.status(500).json({ error: e.message || '服务器错误' });
  }
});

app.patch('/api/admin/news/:folder', auth, async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const { published } = req.body || {};
    const updated = await setPublished('news', folder, published);
    if (!updated) return res.status(404).json({ error: '未找到' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/news/:folder', auth, async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    await deleteItem('news', folder);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 正文内图片上传（先有 item 再上传）
app.post('/api/admin/news/:folder/images', auth, upload.single('image'), async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const itemDir = path.join(getDataDir('news'), folder, 'images');
    const fs = await import('fs/promises');
    await fs.mkdir(itemDir, { recursive: true });
    const ext = path.extname(req.file.originalname) || '.jpg';
    const filename = `img-${Date.now()}${ext}`;
    const dest = path.join(itemDir, filename);
    await fs.copyFile(req.file.path, dest);
    const url = `${req.protocol}://${req.get('host')}/api/uploads/news/${folder}/images/${filename}`;
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---------- 合作案例 ----------
// 前台：仅已上架（轻量字段）
app.get('/api/cases', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, folder_name, title, date, author, category, description, img, published
       FROM cases
       WHERE published = 1
       ORDER BY date DESC, id DESC`,
    );

    const list = rows.map((row) => ({
      id: row.id,
      folderName: row.folder_name,
      title: row.title,
      date: row.date,
      author: row.author,
      category: row.category,
      desc: row.description,
      img: row.img,
      content: [],
      published: !!row.published,
    }));

    res.json(list);
  } catch (e) {
    console.error('/api/cases error', e);
    res.status(500).json({ error: e.message || '服务器错误' });
  }
});

// 管理员：全部（含下架）——仅返回列表需要的轻量字段
app.get('/api/admin/cases', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, folder_name, title, date, author, published
       FROM cases
       ORDER BY date DESC, id DESC`,
    );

    const list = rows.map((row) => ({
      id: row.id,
      folderName: row.folder_name,
      title: row.title,
      date: row.date,
      author: row.author,
      published: !!row.published,
    }));

    res.json(list);
  } catch (e) {
    console.error('GET /api/admin/cases error', e);
    res.status(500).json({ error: e.message || '服务器错误' });
  }
});

app.get('/api/cases/by-id/:id', async (req, res) => {
  try {
    const list = await listItems('cases', { publishedOnly: true });
    const item = list.find((i) => String(i.id) === String(req.params.id));
    if (!item) return res.status(404).json({ error: '未找到' });
    const full = await getItem('cases', item.folderName);
    res.json(full);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/cases/:folder', async (req, res) => {
  try {
    const item = await getItem('cases', req.params.folder);
    if (!item || !item.published) return res.status(404).json({ error: '未找到' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/cases/by-id/:id', auth, async (req, res) => {
  try {
    const list = await listItems('cases', { publishedOnly: false });
    const found = list.find((i) => String(i.id) === String(req.params.id));
    if (!found) return res.status(404).json({ error: '未找到' });
    const item = await getItem('cases', found.folderName);
    if (!item) return res.status(404).json({ error: '未找到' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/cases/:folder', auth, async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const item = await getItem('cases', folder);
    if (!item) return res.status(404).json({ error: '未找到' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/cases', auth, upload.single('cover'), async (req, res) => {
  try {
    const meta = typeof req.body.meta === 'string' ? JSON.parse(req.body.meta) : req.body.meta;
    console.log('POST /api/admin/cases meta:', JSON.stringify(meta));
    const created = await createItem('cases', meta, req.file);
    res.json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/cases/:folder', auth, upload.single('cover'), async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const meta = typeof req.body.meta === 'string' ? JSON.parse(req.body.meta) : req.body.meta;
    console.log('PUT /api/admin/cases meta:', JSON.stringify(meta));
    const updated = await updateItem('cases', folder, meta, req.file);
    if (!updated) return res.status(404).json({ error: '未找到' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch('/api/admin/cases/:folder', auth, async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const { published } = req.body || {};
    const updated = await setPublished('cases', folder, published);
    if (!updated) return res.status(404).json({ error: '未找到' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/cases/:folder', auth, async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    await deleteItem('cases', folder);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/cases/:folder/images', auth, upload.single('image'), async (req, res) => {
  try {
    const folder = decodeURIComponent(req.params.folder);
    const itemDir = path.join(getDataDir('cases'), folder, 'images');
    const fs = await import('fs/promises');
    await fs.mkdir(itemDir, { recursive: true });
    const ext = path.extname(req.file.originalname) || '.jpg';
    const filename = `img-${Date.now()}${ext}`;
    const dest = path.join(itemDir, filename);
    await fs.copyFile(req.file.path, dest);
    const url = `${req.protocol}://${req.get('host')}/api/uploads/cases/${folder}/images/${filename}`;
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use((err, req, res, next) => {
  if (
    err.code === 'LIMIT_FILE_SIZE' ||
    err.code === 'LIMIT_FIELD_SIZE' ||
    err.code === 'LIMIT_FIELD_VALUE'
  ) {
    return res
      .status(413)
      .json({ error: '内容过大，请压缩图片或减少正文中的图片（不要直接粘贴超大的 base64 图片）' });
  }
  console.error(err);
  res.status(500).json({ error: err.message || '服务器错误' });
});

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT}`);
});
