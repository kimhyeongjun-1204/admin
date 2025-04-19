import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 로그인 요청 보내고 값을 리턴받는 컴포넌트 
import { login } from '../../services/authService'; 
import ErrorPopup from './ErrorPopup';
import '../css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    
    try {
      const response = await login(formData.id, formData.password);
      
      if (response.result_code === 201) {
        navigate('/dashboard');
      } else {
        setErrorMessage(response.message || '아이디 또는 비밀번호가 일치하지 않습니다');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('서버와의 통신 중 오류가 발생했습니다');
      setShowError(true);
    }
  };

  return (
    <div className="login-page">
      <div className="top-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-container">
              <span className="plus-icon">+</span>
            </div>
            <span className="logo-text">AI Groove</span>
          </div>
        </div>
      </div>

      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>관리자 로그인</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            <button type="submit" className="login-button">
              로그인
            </button>

            <div className="signup-link">
              <Link to="/signup">회원가입</Link>
            </div>
          </form>
        </div>
      </div>

      {showError && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
};

export default Login; 