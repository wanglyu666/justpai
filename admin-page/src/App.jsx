import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import List from './pages/List';
import Editor from './pages/Editor';
import './App.css';

function RequireAuth({ children }) {
  const t = localStorage.getItem('admin_token');
  if (!t) return <Navigate to="/login" replace />;
  return children;
}

function EditorWithKey() {
  const location = useLocation();
  return <Editor key={location.pathname} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/news" replace />} />
          <Route path="news" element={<List />} />
          <Route path="news/new" element={<EditorWithKey />} />
          <Route path="news/edit/:id" element={<EditorWithKey />} />
          <Route path="cases" element={<List />} />
          <Route path="cases/new" element={<EditorWithKey />} />
          <Route path="cases/edit/:id" element={<EditorWithKey />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
