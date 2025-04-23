import React from 'react';
import '../css/UserDetailModal.css';

const UserDetailModal = ({ userDetail, onClose }) => {
  const formatPlayTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}H ${remainingMinutes}min`;
  };

  return (
    <div className="user-detail-modal-overlay">
      <div className="user-detail-modal">
        <div className="user-detail-header">
          <h2>{userDetail.nickname}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="user-detail-content">
          <div className="detail-item">
            <span className="label">플레이 타임:</span>
            <span className="value">{formatPlayTime(userDetail.play_time)}</span>
          </div>
          <div className="detail-item">
            <span className="label">등록한 곡 수:</span>
            <span className="value">{userDetail.song_number}개</span>
          </div>
          <div className="detail-item">
            <span className="label">작성한 문의글 수:</span>
            <span className="value">{userDetail.inquiry_number}개</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal; 