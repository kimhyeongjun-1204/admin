import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../services/authService';
import '../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAIMenuOpen, setIsAIMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleAIMenu = () => {
    setIsAIMenuOpen(!isAIMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('adminName');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="menu-section">
        <div className="menu-items">
          <div className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
            <span className="menu-icon">📊</span>
            <span className="menu-text">대시보드</span>
          </div>
          <div className={`menu-item ${isActive('/admin/user') || isActive('/inquiries') || isActive('/notices') ? 'active' : ''}`} onClick={toggleUserMenu}>
            <span className="menu-icon">👥</span>
            <span className="menu-text">사용자 관리</span>
            <span className={`dropdown-icon ${isUserMenuOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isUserMenuOpen && (
            <div className="submenu-items">
              <div className={`submenu-item ${isActive('/admin/user') ? 'active' : ''}`} onClick={() => navigate('/admin/user')}>
                <span className="menu-icon">👤</span>
                <span className="menu-text">사용자 계정 관리</span>
              </div>
              <div className={`submenu-item ${isActive('/admin/inquiry') ? 'active' : ''}`} onClick={() => navigate('/admin/inquiry')}>         
                <span className="menu-icon">❓</span>
                <span className="menu-text">문의 관리</span>
              </div>
              <div className={`submenu-item ${isActive('/admin/notice') ? 'active' : ''}`} onClick={() => navigate('/admin/notice')}>
                <span className="menu-icon">📢</span>
                <span className="menu-text">공지사항 관리</span>
              </div>
            </div>
          )}
          <div className={`menu-item ${isActive('/admin/admin') ? 'active' : ''}`} onClick={() => navigate('/admin/admin')}>
            <span className="menu-icon">👨‍💼</span>
            <span className="menu-text">관리자 관리</span>
          </div>
          <div className={`menu-item ${isActive('/songs') ? 'active' : ''}`} onClick={() => navigate('/songs')}>
            <span className="menu-icon">🎵</span>
            <span className="menu-text">기본 제공 곡 조회</span>
          </div>
          <div className={`menu-item ${isActive('/ai-models') ? 'active' : ''}`} onClick={toggleAIMenu}>
            <span className="menu-icon">🤖</span>
            <span className="menu-text">AI 모델 관리</span>
            <span className={`dropdown-icon ${isAIMenuOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isAIMenuOpen && (
            <div className="submenu-items">
              <div className={`submenu-item ${isActive('/ai-models/dataset') ? 'active' : ''}`} onClick={() => navigate('/ai-models/dataset')}>
                <span className="menu-icon">📊</span>
                <span className="menu-text">데이터셋 관리</span>
              </div>
              <div className={`submenu-item ${isActive('/ai-models/training') ? 'active' : ''}`} onClick={() => navigate('/ai-models/training')}>
                <span className="menu-icon">🎓</span>
                <span className="menu-text">AI 학습</span>
              </div>
              <div className={`submenu-item ${isActive('/ai-models/versions') ? 'active' : ''}`} onClick={() => navigate('/ai-models/versions')}>
                <span className="menu-icon">🔄</span>
                <span className="menu-text">버전 관리</span>
              </div>
            </div>
          )}
          <div className={`menu-item ${isActive('/server-status') ? 'active' : ''}`} onClick={() => navigate('/server-status')}>
            <span className="menu-icon">🖥️</span>
            <span className="menu-text">서버 상태 확인</span>
          </div>
          <div className={`menu-item ${isActive('/logs') ? 'active' : ''}`} onClick={() => navigate('/logs')}>
            <span className="menu-icon">📝</span>
            <span className="menu-text">로그 확인</span>
          </div>
        </div>
      </div>

      
      <div className="logout-section" onClick={handleLogout}>
        <span className="logout-text">로그아웃</span>
      </div>
    </div>
  );
};

export default Sidebar; 