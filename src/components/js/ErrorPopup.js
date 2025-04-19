import React from 'react';
import '../css/ErrorPopup.css';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <div className="error-popup-content">
          <p>{message}</p>
        </div>
        <button className="error-popup-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup; 