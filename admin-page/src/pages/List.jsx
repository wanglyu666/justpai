import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as api from '../api';
import './List.css';

export default function List() {
  const { pathname } = useLocation();
  const isNews = pathname.startsWith('/news');
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const list = isNews ? api.listNews : api.listCases;
  const deleteItem = isNews ? () => api.deleteItem('news', deleteConfirm.folderName) : () => api.deleteItem('cases', deleteConfirm.folderName);
  const setPublished = (folder, published) => api.setPublished(isNews ? 'news' : 'cases', folder, published);

  useEffect(() => {
    let cancelled = false;
    list(true).then((data) => {
      if (!cancelled) setItems(data);
    }).catch(() => {
      if (!cancelled) setItems([]);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [pathname]);

  const filtered = items.filter(
    (i) =>
      !search.trim() ||
      (i.title && i.title.includes(search)) ||
      (i.author && i.author.includes(search)) ||
      (i.category && i.category.includes(search))
  );

  async function handleOffline(item) {
    try {
      await setPublished(item.folderName, false);
      setItems((prev) => prev.map((x) => (x.folderName === item.folderName ? { ...x, published: false } : x)));
    } catch (e) {
      alert(e.message);
    }
  }

  async function handlePublish(item) {
    try {
      await setPublished(item.folderName, true);
      setItems((prev) => prev.map((x) => (x.folderName === item.folderName ? { ...x, published: true } : x)));
    } catch (e) {
      alert(e.message);
    }
  }

  function openDelete(item) {
    if (deleteConfirm && deleteConfirm.folderName === item.folderName) {
      setDeleteConfirm({ ...item, step: 2 });
      return;
    }
    setDeleteConfirm({ ...item, step: 1 });
  }

  async function confirmDelete() {
    if (!deleteConfirm || deleteConfirm.step !== 2) return;
    try {
      await deleteItem();
      setItems((prev) => prev.filter((i) => i.folderName !== deleteConfirm.folderName));
      setDeleteConfirm(null);
    } catch (e) {
      alert(e.message);
    }
  }

  const title = isNews ? '最新动态' : '合作案例';
  const addPath = isNews ? '/news/new' : '/cases/new';
  const editPath = isNews ? '/news/edit/' : '/cases/edit/';

  return (
    <div className="list-page">
      <div className="list-toolbar">
        <input
          type="search"
          placeholder="搜索标题、作者、分类…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="list-search"
        />
        <button type="button" className="btn-primary" onClick={() => navigate(addPath)}>
          新增
        </button>
      </div>
      {loading ? (
        <p className="list-loading">加载中…</p>
      ) : (
        <div className="list-table-wrap">
          <table className="list-table">
            <thead>
              <tr>
                <th>标题</th>
                <th>日期</th>
                <th>作者</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.folderName}>
                  <td className="list-title">{item.title || item.folderName}</td>
                  <td>{item.date || '—'}</td>
                  <td>{item.author || '—'}</td>
                  <td>
                    <span className={`status-badge ${item.published ? 'published' : 'offline'}`}>
                      {item.published ? '已上架' : '已下架'}
                    </span>
                  </td>
                  <td className="list-actions">
                    <button type="button" className="btn-sm" onClick={() => navigate(editPath + item.id)}>
                      编辑
                    </button>
                    {item.published ? (
                      <button type="button" className="btn-sm btn-warn" onClick={() => handleOffline(item)}>
                        下架
                      </button>
                    ) : (
                      <button type="button" className="btn-sm btn-ok" onClick={() => handlePublish(item)}>
                        上架
                      </button>
                    )}
                    <button type="button" className="btn-sm btn-danger" onClick={() => openDelete(item)}>
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="list-empty">暂无内容</p>}
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>确认删除</h3>
            {deleteConfirm.step === 1 ? (
              <>
                <p>确定要删除「{deleteConfirm.title}」吗？删除后不可恢复。</p>
                <div className="modal-actions">
                  <button type="button" className="btn-sm" onClick={() => setDeleteConfirm(null)}>取消</button>
                  <button type="button" className="btn-sm btn-danger" onClick={() => setDeleteConfirm((c) => ({ ...c, step: 2 }))}>
                    确认删除
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="modal-warn">请再次确认：将彻底删除该条内容，无法恢复。</p>
                <div className="modal-actions">
                  <button type="button" className="btn-sm" onClick={() => setDeleteConfirm(null)}>取消</button>
                  <button type="button" className="btn-sm btn-danger" onClick={confirmDelete}>确认彻底删除</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
