# JustPai 后端（文件存储）

为官网提供新闻与合作案例的 API，数据存储在 `../news-data` 文件夹，无需数据库。

## 启动

```bash
cd backend
npm install
npm start
```

默认端口 3001。开发时可使用 `npm run dev`（带 watch）。

## 接口说明

- **登录**  
  `POST /api/login`  
  Body: `{ "username": "wanglyuran66", "password": "pkuyyds66" }`  
  返回: `{ "token": "..." }`  
  后续管理接口需在请求头中带 `Authorization: Bearer <token>`。

- **前台（无需 token）**  
  - `GET /api/news` — 已上架的动态列表  
  - `GET /api/news/by-id/:id` — 按 id 取单条动态  
  - `GET /api/cases` — 已上架的合作案例列表  
  - `GET /api/cases/by-id/:id` — 按 id 取单条案例  

- **管理端（需 token）**  
  - `GET /api/admin/news`、`GET /api/admin/cases` — 全部列表（含下架）  
  - `POST /api/admin/news`、`POST /api/admin/cases` — 新增（multipart: meta JSON + cover 文件）  
  - `PUT /api/admin/news/:folder`、`PUT /api/admin/cases/:folder` — 更新  
  - `PATCH /api/admin/news/:folder`、`PATCH /api/admin/cases/:folder` — 上架/下架（body: `{ "published": true/false }`）  
  - `DELETE /api/admin/news/:folder`、`DELETE /api/admin/cases/:folder` — 彻底删除  
  - `POST /api/admin/news/:folder/images`、`POST /api/admin/cases/:folder/images` — 上传正文图片（multipart: image）  

上传的封面与正文图片通过 `/api/uploads/:type/:folder/...` 访问。

## 部署

将 `backend` 与 `news-data` 一起部署，保证进程对 `news-data` 有读写权限即可。环境变量可选 `PORT`。
