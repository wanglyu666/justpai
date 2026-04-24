import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import * as api from '../api';
import './Editor.css';

export default function Editor() {
  const { id: idParam } = useParams();
  const { pathname } = useLocation();
  const isNews = pathname.startsWith('/news');
  const isNew = pathname.endsWith('/new');
  const navigate = useNavigate();
  const editId = idParam ? String(idParam) : null;

  const [currentFolder, setCurrentFolder] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(!pathname.includes('/new'));
  const fileInputRef = useRef(null);

  function parseDateToInput(d) {
    if (!d) return '';
    const t = new Date(d).getTime();
    if (Number.isNaN(t)) return '';
    return new Date(t).toISOString().slice(0, 10);
  }

  useEffect(() => {
    if (isNew) {
      const d = new Date();
      setDate(d.toISOString().slice(0, 10));
      setLoading(false);
      return;
    }
    if (!editId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError('');
    const getById = isNews ? api.getNewsById : api.getCaseById;
    getById(editId, true)
      .then((item) => {
        setCurrentFolder(item.folderName || null);
        setTitle(item.title || '');
        setDate(parseDateToInput(item.date));
        setAuthor(item.author || '');
        setCategory(item.category || '');
        setDesc(item.desc || '');
        setContent(Array.isArray(item.content) ? [...item.content] : []);
        if (item.img) setCoverPreview(item.img);
      })
      .catch((e) => setLoadError(e.message))
      .finally(() => setLoading(false));
  }, [isNew, editId]);

  function addBlock(blockType) {
    if (blockType === 'text') setContent((c) => [...c, { type: 'text', value: '' }]);
    if (blockType === 'h3') setContent((c) => [...c, { type: 'h3', value: '' }]);
    if (blockType === 'img') setContent((c) => [...c, { type: 'img', value: '' }]);
  }

  function updateBlock(index, value) {
    setContent((c) => c.map((b, i) => (i === index ? { ...b, value } : b)));
  }

  function removeBlock(index) {
    setContent((c) => c.filter((_, i) => i !== index));
  }

  function moveBlock(fromIndex, toIndex) {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= content.length) return;
    setContent((c) => {
      const next = [...c];
      const [removed] = next.splice(fromIndex, 1);
      const insertAt = fromIndex < toIndex ? toIndex - 1 : toIndex;
      next.splice(insertAt, 0, removed);
      return next;
    });
  }

  function handleBlockDragStart(e, index) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    e.currentTarget.classList.add('editor-block-dragging');
  }
  function handleBlockDragEnd(e) {
    e.currentTarget.classList.remove('editor-block-dragging');
  }
  function handleBlockDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }
  function handleBlockDrop(e, toIndex) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (Number.isNaN(fromIndex)) return;
    moveBlock(fromIndex, toIndex);
  }

  function onCoverChange(e) {
    const f = e.target.files?.[0];
    if (f) {
      setCoverFile(f);
      const url = URL.createObjectURL(f);
      setCoverPreview(url);
    }
  }

  function insertImage(index) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      if (currentFolder) {
        try {
          const url = await api.uploadBodyImage(isNews ? 'news' : 'cases', currentFolder, f);
          updateBlock(index, url);
        } catch (err) {
          alert(err.message);
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        updateBlock(index, reader.result);
      };
      reader.readAsDataURL(f);
    };
    input.click();
  }

  async function save(publish) {
    setSaving(true);
    // 规范化正文：过滤空块，并去掉超大的 base64 图片，避免触发 Multer 的字段长度限制
    const cleanedContent = content
      .filter((b) => b.type && (b.value !== undefined && b.value !== ''))
      .map((b) => {
        if (b.type === 'img' && typeof b.value === 'string' && b.value.startsWith('data:')) {
          // data: 前缀的图片是本地 base64，大字段容易导致上传失败；这里先丢弃，提示用户改用“上传本地图片”
          return { ...b, value: '' };
        }
        return b;
      })
      .filter((b) => b.value !== '');

    const meta = {
      title,
      date: date || new Date().toISOString().slice(0, 10),
      author,
      category,
      desc,
      content: cleanedContent,
      published: publish,
    };
    try {
      if (isNew) {
        isNews ? await api.createNews(meta, coverFile) : await api.createCase(meta, coverFile);
      } else {
        if (!currentFolder) {
          alert('无法获取记录，请返回列表重试');
          return;
        }
        if (isNews) await api.updateNews(currentFolder, meta, coverFile);
        else await api.updateCase(currentFolder, meta, coverFile);
      }
      navigate(isNews ? '/news' : '/cases');
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  const listPath = isNews ? '/news' : '/cases';

  if (loadError && !isNew) {
    return (
      <div className="editor-page">
        <p className="editor-error">{loadError}</p>
        <button type="button" className="btn-sm" onClick={() => navigate(listPath)}>返回列表</button>
      </div>
    );
  }

  if (loading && !isNew) {
    return (
      <div className="editor-page">
        <p className="editor-loading">加载中…</p>
      </div>
    );
  }

  return (
    <div className="editor-page">
      <div className="editor-header">
        <button type="button" className="btn-sm" onClick={() => navigate(listPath)}>← 返回</button>
        <h1>{isNew ? '新增' : '编辑'}{isNews ? '动态' : '案例'}</h1>
      </div>

      <div className="editor-form">
        <label>
          标题
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="标题" />
        </label>
        <label>
          日期
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          作者
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="作者名称" />
        </label>
        <label>
          分类
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="如：企业新闻、产品发布" />
        </label>
        <label>
          摘要
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="摘要" rows={3} />
        </label>

        <label>
          封面图片
          <div className="cover-row">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={onCoverChange} className="hidden" />
            <button type="button" className="btn-sm" onClick={() => fileInputRef.current?.click()}>选择图片</button>
            {coverPreview && <img src={coverPreview} alt="" className="cover-preview" />}
          </div>
        </label>

        <div className="editor-body">
          <div className="editor-body-toolbar">
            <span>正文</span>
            <div>
              <button type="button" className="btn-sm" onClick={() => addBlock('text')}>+ 段落</button>
              <button type="button" className="btn-sm" onClick={() => addBlock('h3')}>+ 小标题</button>
              <button type="button" className="btn-sm" onClick={() => addBlock('img')}>+ 图片</button>
            </div>
          </div>
          <div className="editor-blocks">
            {content.map((block, index) => (
              <div
                key={index}
                className="editor-block"
                draggable
                onDragStart={(e) => handleBlockDragStart(e, index)}
                onDragEnd={handleBlockDragEnd}
                onDragOver={handleBlockDragOver}
                onDrop={(e) => handleBlockDrop(e, index)}
              >
                <span className="editor-block-handle" title="拖动调整顺序">⋮⋮</span>
                {block.type === 'text' && (
                  <textarea
                    value={block.value}
                    onChange={(e) => updateBlock(index, e.target.value)}
                    placeholder="段落文字"
                    rows={3}
                  />
                )}
                {block.type === 'h3' && (
                  <input
                    type="text"
                    value={block.value}
                    onChange={(e) => updateBlock(index, e.target.value)}
                    placeholder="小标题"
                  />
                )}
                {block.type === 'img' && (
                  <div className="block-img">
                    <input
                      type="text"
                      value={block.value}
                      onChange={(e) => updateBlock(index, e.target.value)}
                      placeholder="图片 URL 或点击下方上传本地图片"
                    />
                    <button type="button" className="btn-sm btn-upload" onClick={() => insertImage(index)}>
                      上传本地图片
                    </button>
                    {block.value && <img src={block.value} alt="" className="block-img-preview" />}
                  </div>
                )}
                <button type="button" className="block-remove" onClick={() => removeBlock(index)} title="删除此块">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="editor-actions">
          <button type="button" className="btn-primary" onClick={() => save(true)} disabled={saving}>
            {saving ? '保存中…' : '推送'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => save(false)} disabled={saving}>
            暂存
          </button>
        </div>
      </div>
    </div>
  );
}
