import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import '../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
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
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">AI Groove</div>
      </div>
      <div className="menu-section">
        <div className="menu-items">
          <div className="menu-item active" onClick={() => navigate('/dashboard')}>
            <span className="menu-icon">📊</span>
            <span className="menu-text">대시보드</span>
          </div>
          <div className="menu-item" onClick={toggleUserMenu}>
            <span className="menu-icon">👥</span>
            <span className="menu-text">사용자 관리</span>
            <span className={`dropdown-icon ${isUserMenuOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isUserMenuOpen && (
            <div className="submenu-items">
              <div className="submenu-item" onClick={() => navigate('/user-accounts')}>
                <span className="menu-icon">👤</span>
                <span className="menu-text">사용자 계정 관리</span>
              </div>
              <div className="submenu-item" onClick={() => navigate('/inquiries')}>
                <span className="menu-icon">❓</span>
                <span className="menu-text">문의 관리</span>
              </div>
              <div className="submenu-item" onClick={() => navigate('/notices')}>
                <span className="menu-icon">📢</span>
                <span className="menu-text">공지사항 관리</span>
              </div>
            </div>
          )}
          <div className="menu-item" onClick={() => navigate('/admin/admin')}>
            <span className="menu-icon">👨‍💼</span>
            <span className="menu-text">관리자 관리</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/songs')}>
            <span className="menu-icon">🎵</span>
            <span className="menu-text">기본 제공 곡 조회</span>
          </div>
          <div className="menu-item" onClick={toggleAIMenu}>
            <span className="menu-icon">🤖</span>
            <span className="menu-text">AI 모델 관리</span>
            <span className={`dropdown-icon ${isAIMenuOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isAIMenuOpen && (
            <div className="submenu-items">
              <div className="submenu-item">
                <span className="menu-icon">📊</span>
                <span className="menu-text">데이터셋 관리</span>
              </div>
              <div className="submenu-item">
                <span className="menu-icon">🎓</span>
                <span className="menu-text">AI 학습</span>
              </div>
              <div className="submenu-item">
                <span className="menu-icon">🔄</span>
                <span className="menu-text">버전 관리</span>
              </div>
            </div>
          )}
          <div className="menu-item">
            <span className="menu-icon">🖥️</span>
            <span className="menu-text">서버 상태 확인</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">📝</span>
            <span className="menu-text">로그 확인</span>
          </div>
          <div className="menu-item logout" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span className="menu-text">로그아웃</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 