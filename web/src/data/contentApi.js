/**
 * 内容数据源：当配置了 VITE_API_URL 时从后端 API 拉取新闻与案例，否则使用本地 content.js
 */
import { ALL_NEWS, ALL_CASES } from './content';

const BASE = import.meta.env.VITE_API_URL || '';

function join(base, path) {
  if (!base) return path.startsWith('/') ? path : '/' + path;
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
}

export async function fetchNewsList() {
  try {
    const url = BASE ? join(BASE, '/api/news') : '/api/news';
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (_) {}
  return ALL_NEWS;
}

export async function fetchCasesList() {
  try {
    const url = BASE ? join(BASE, '/api/cases') : '/api/cases';
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (_) {}
  return ALL_CASES;
}

export async function fetchNewsById(id) {
  try {
    const url = BASE ? join(BASE, `/api/news/by-id/${id}`) : `/api/news/by-id/${id}`;
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (_) {}
  return ALL_NEWS.find((n) => String(n.id) === String(id)) || null;
}

export async function fetchCaseById(id) {
  try {
    const url = BASE ? join(BASE, `/api/cases/by-id/${id}`) : `/api/cases/by-id/${id}`;
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (_) {}
  return ALL_CASES.find((c) => String(c.id) === String(id)) || null;
}

/** 用于正文/封面图片：若为相对路径则加上 API 基地址 */
export function contentImageSrc(url) {
  if (!url) return url;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  return BASE ? join(BASE, url) : url;
}
