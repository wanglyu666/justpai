import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('admin_token');
    navigate('/login');
  }
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">内容管理</div>
        <nav>
          <NavLink to="/news" end className={({ isActive }) => (isActive ? 'active' : '')}>
            最新动态
          </NavLink>
          <NavLink to="/cases" className={({ isActive }) => (isActive ? 'active' : '')}>
            合作案例
          </NavLink>
        </nav>
        <button type="button" className="sidebar-logout" onClick={logout}>
          退出登录
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
