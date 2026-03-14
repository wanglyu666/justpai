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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_USER = 'wanglyuran66';
const ADMIN_PASS = 'pkuyyds66';
const ADMIN_TOKEN = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));

const upload = multer({
  dest: path.join(__dirname, 'tmp'),
  limits: { fileSize: 20 * 1024 * 1024, fieldSize: 50 * 1024 * 1024 },
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
// 前台：仅已上架
app.get('/api/news', async (req, res) => {
  try {
    const list = await listItems('news', { publishedOnly: true });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 管理员：全部（含下架）
app.get('/api/admin/news', auth, async (req, res) => {
  try {
    const list = await listItems('news', { publishedOnly: false });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
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
app.get('/api/cases', async (req, res) => {
  try {
    const list = await listItems('cases', { publishedOnly: true });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/cases', auth, async (req, res) => {
  try {
    const list = await listItems('cases', { publishedOnly: false });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
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
  if (err.code === 'LIMIT_FILE_SIZE' || err.code === 'LIMIT_FIELD_SIZE') {
    return res.status(413).json({ error: '内容过大，请压缩图片或减少正文中的图片' });
  }
  console.error(err);
  res.status(500).json({ error: err.message || '服务器错误' });
});

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT}`);
});
