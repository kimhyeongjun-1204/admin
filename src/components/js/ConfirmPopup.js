import React from 'react';
import '../css/ConfirmPopup.css';

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup">
        <div className="confirm-popup-content">
          <p>{message}</p>
        </div>
        <div className="confirm-popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            확인
          </button>
          <button className="cancel-button" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup; 