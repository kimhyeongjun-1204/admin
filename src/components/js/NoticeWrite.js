import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import ErrorPopup from './ErrorPopup';
import '../css/NoticeWrite.css';
import { SERVER_URL } from '../../config/config';

const NoticeWrite = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const isEditMode = !!noticeId;

  useEffect(() => {
    if (isEditMode) {
      fetchNoticeDetail();
    }
  }, [noticeId]);

  const fetchNoticeDetail = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/admin/notice/${noticeId}`);
      if (response.data.result_code === 201) {
        const notice = response.data.notice;
        console.log('notice:', notice);
        setTitle(notice.title);
        setContent(notice.content);
      }
    } catch (error) {
      console.error('Error fetching notice detail:', error);
      setError('공지사항을 불러오는데 실패했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem('adminId');
      console.log('adminId:', adminId);
      if (!adminId) {
        setError('로그인이 필요합니다. 다시 로그인해주세요.');
        return;
      }

      if (!title.trim() || !content.trim()) {
        setError('제목과 내용을 모두 입력해주세요.');
        return;
      }

      const url = isEditMode 
        ? `${SERVER_URL}/admin/notice/${noticeId}`
        : `${SERVER_URL}/admin/notice`;
      
      const method = isEditMode ? 'get  ' : 'post';
      
      const response = await axios[method](url, {
        admin_id: adminId,
        title: title.trim(),
        content: content.trim()
      });

      if (response.data.result_code === 200) {
        setShowSuccessPopup(true);
      } else {
        setError(response.data.message || (isEditMode ? '공지사항 수정에 실패했습니다.' : '공지사항 등록에 실패했습니다.'));
      }
    } catch (error) {
      console.error('Error submitting notice:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(isEditMode ? '공지사항 수정에 실패했습니다.' : '공지사항 등록에 실패했습니다.');
      }
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/admin/notice');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <TopHeader />
        <div className="notice-write">
          <div className="write-header">
            <button className="back-button" onClick={handleBack}>
              ← 목록으로
            </button>
            <h1>{isEditMode ? '공지사항 조회' : '공지사항 작성'}</h1>
          </div>

          <div className="write-content">
            <form className="write-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="공지사항 제목을 입력하세요"
                  required
                  readOnly={isEditMode}
                />
              </div>

              <div className="form-group">
                <label>내용</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="공지사항 내용을 입력하세요"
                  required
                  rows={15}
                  readOnly={isEditMode}
                />
              </div>

              <div className="button-group">
                {!isEditMode && (
                  <button type="submit" className="submit-button">
                    등록
                  </button>
                )}
                {!isEditMode && (
                    <button type="button" className="cancel-button" onClick={handleBack}>
                       취소
                    </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccessPopup && (
        <ErrorPopup
          message={isEditMode ? "공지사항이 성공적으로 수정되었습니다." : "공지사항이 성공적으로 등록되었습니다."}
          onClose={handleSuccessPopupClose}
        />
      )}
    </div>
  );
};

export default NoticeWrite; 