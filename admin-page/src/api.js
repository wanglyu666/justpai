const API = '/api';
const token = () => localStorage.getItem('admin_token');

export async function login(username, password) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '登录失败');
  return data.token;
}

export async function listNews(admin = false) {
  const url = admin ? `${API}/admin/news` : `${API}/news`;
  const res = await fetch(url, admin ? { headers: { Authorization: `Bearer ${token()}` } } : {});
  if (!res.ok) throw new Error('获取列表失败');
  return res.json();
}

export async function listCases(admin = false) {
  const url = admin ? `${API}/admin/cases` : `${API}/cases`;
  const res = await fetch(url, admin ? { headers: { Authorization: `Bearer ${token()}` } } : {});
  if (!res.ok) throw new Error('获取列表失败');
  return res.json();
}

export async function getNews(folder, admin = false) {
  const url = admin ? `${API}/admin/news/${encodeURIComponent(folder)}` : `${API}/news/${encodeURIComponent(folder)}`;
  const res = await fetch(url, admin ? { headers: { Authorization: `Bearer ${token()}` } } : {});
  if (!res.ok) throw new Error('获取失败');
  return res.json();
}

export async function getNewsById(id, admin = false) {
  if (!admin) return getNews(id, false);
  const res = await fetch(`${API}/admin/news/by-id/${encodeURIComponent(String(id))}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error('获取失败');
  return res.json();
}

export async function getCase(folder, admin = false) {
  const url = admin ? `${API}/admin/cases/${encodeURIComponent(folder)}` : `${API}/cases/${encodeURIComponent(folder)}`;
  const res = await fetch(url, admin ? { headers: { Authorization: `Bearer ${token()}` } } : {});
  if (!res.ok) throw new Error('获取失败');
  return res.json();
}

export async function getCaseById(id, admin = false) {
  if (!admin) return getCase(id, false);
  const res = await fetch(`${API}/admin/cases/by-id/${encodeURIComponent(String(id))}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error('获取失败');
  return res.json();
}

export async function createNews(meta, coverFile) {
  const form = new FormData();
  form.append('meta', JSON.stringify(meta));
  if (coverFile) form.append('cover', coverFile);
  const res = await fetch(`${API}/admin/news`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '创建失败');
  return data;
}

export async function updateNews(folder, meta, coverFile) {
  const form = new FormData();
  form.append('meta', JSON.stringify(meta));
  if (coverFile) form.append('cover', coverFile);
  const res = await fetch(`${API}/admin/news/${encodeURIComponent(folder)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token()}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '更新失败');
  return data;
}

export async function createCase(meta, coverFile) {
  const form = new FormData();
  form.append('meta', JSON.stringify(meta));
  if (coverFile) form.append('cover', coverFile);
  const res = await fetch(`${API}/admin/cases`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '创建失败');
  return data;
}

export async function updateCase(folder, meta, coverFile) {
  const form = new FormData();
  form.append('meta', JSON.stringify(meta));
  if (coverFile) form.append('cover', coverFile);
  const res = await fetch(`${API}/admin/cases/${encodeURIComponent(folder)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token()}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '更新失败');
  return data;
}

export async function setPublished(type, folder, published) {
  const res = await fetch(`${API}/admin/${type}/${encodeURIComponent(folder)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
    body: JSON.stringify({ published }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '操作失败');
  return data;
}

export async function deleteItem(type, folder) {
  const res = await fetch(`${API}/admin/${type}/${encodeURIComponent(folder)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token()}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '删除失败');
  return data;
}

export async function uploadBodyImage(type, folder, file) {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API}/admin/${type}/${encodeURIComponent(folder)}/images`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '上传失败');
  return data.url;
}
