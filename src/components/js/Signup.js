import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
import { SERVER_URL } from '../../config/config';
import '../css/Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    birth: ''
  });
  const [showErrorPopup, setShowErrorPopup] = useState(false);
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
    
    try {
      const response = await fetch(`${SERVER_URL}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.result_code === 409) {
        setErrorMessage('아이디 중복입니다.');
        setShowErrorPopup(true);
      } else if (data.result_code === 201) {
        navigate('/signup-success');
      } else {
        setErrorMessage('회원가입 중 오류가 발생했습니다.');
        setShowErrorPopup(true);
      }
    } catch (err) {
      setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
      setShowErrorPopup(true);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="signup-page">
      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
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

      <main className="signup-content">
        <h1 className="signup-title">회원가입</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디"
              required
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
              placeholder="비밀번호"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birth">생년월일</label>
            <input
              type="date"
              id="birth"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              가입하기  
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Signup; 