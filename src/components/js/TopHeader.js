import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import '../css/TopHeader.css';

const TopHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('adminName');
    if (name) {
      setAdminName(name);
    }
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('adminName');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="top-header">
      <div className="header-content">
        <div className="logo-section" onClick={goToDashboard} style={{ cursor: 'pointer' }}>
          <div className="logo-container">
            <span className="plus-icon">+</span>
          </div>
          <span className="logo-texts">AI Groove</span>
        </div>
        <div className="header-right">
          <div className="user-menu" onClick={toggleMenu}>
            <div className="profile-image">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3155 14.1014 15.6903 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.68449 14.1014 3.33331 14.9493 3.33331 15.8333V17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9.16667C11.841 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.841 2.5 10 2.5C8.15905 2.5 6.66666 3.99238 6.66666 5.83333C6.66666 7.67428 8.15905 9.16667 10 9.16667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="user-names">{adminName || '관리자'} 님</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader; 