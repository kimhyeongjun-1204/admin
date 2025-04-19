import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignupSuccess.css';

function SignupSuccess() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/login');
  };

  return (
    <div className="signup-success-page">
      <div className="success-content">

        <div className="message-container">
          <h1>회원가입 신청이 완료되었습니다.</h1>
          <p>관리자 승인 이후 로그인 가능합니다</p>
        </div>
        <button className="confirm-button" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}

export default SignupSuccess; 