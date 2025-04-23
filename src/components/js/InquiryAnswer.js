import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import ErrorPopup from './ErrorPopup';
import '../css/InquiryAnswer.css';
import { SERVER_URL } from '../../config/config';

const InquiryAnswer = () => {
  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [answerTitle, setAnswerTitle] = useState('');
  const [answerContent, setAnswerContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOriginalInquiryVisible, setIsOriginalInquiryVisible] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchInquiryDetail();
  }, [inquiryId]);

  const fetchInquiryDetail = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/admin/inquiry/${parseInt(inquiryId)}`, {
        params: {
          admin_id: localStorage.getItem('adminId')
        }
      });

      if (response.data.result_code === 200) {
        setInquiry(response.data.inquiry);
      }
    } catch (error) {
      console.error('Error fetching inquiry detail:', error);
      setError('문의글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/admin/inquiry/${inquiryId}/answer`, {
        admin_id: localStorage.getItem('adminId'),
        title: answerTitle,
        content: answerContent
      });

      if (response.data.result_code === 200) {
        setShowSuccessPopup(true);
      } else {
        setError('답변 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('답변 등록에 실패했습니다.');
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    navigate(`/admin/inquiry`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const toggleOriginalInquiry = () => {
    setIsOriginalInquiryVisible(!isOriginalInquiryVisible);
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!inquiry) return <div className="not-found">문의글을 찾을 수 없습니다.</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <TopHeader />
        <div className="inquiry-answer">
          <div className="answer-header">
            <button className="back-button" onClick={handleBack}>
              ← 목록으로
            </button>
            <h1>답변 작성</h1>
          </div>

          <div className="original-inquiry">
            <div className="original-inquiry-header" onClick={toggleOriginalInquiry}>
              <h2>원본 문의</h2>
              <button className="toggle-button">
                {isOriginalInquiryVisible ? '숨기기 ▼' : '펼치기 ▶'}
              </button>
            </div>
            
            {isOriginalInquiryVisible && (
              <div className="detail-content">
                <div className="detail-row">
                  <div className="detail-label">제목</div>
                  <div className="detail-value">{inquiry.title}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">작성자</div>
                  <div className="detail-value">{inquiry.username}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">작성일</div>
                  <div className="detail-value">{formatDate(inquiry.inquiry_date)}</div>
                </div>
                
                <div className="detail-row content">
                  <div className="detail-label">내용</div>
                  <div className="detail-value content-text">{inquiry.content}</div>
                </div>
              </div>
            )}
          </div>

          <form className="answer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>답변 제목</label>
              <input
                type="text"
                value={answerTitle}
                onChange={(e) => setAnswerTitle(e.target.value)}
                placeholder="답변 제목을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>답변 내용</label>
              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="답변 내용을 입력하세요"
                required
                rows={10}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">
                답변 등록
              </button>
              <button type="button" className="cancel-button" onClick={handleBack}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessPopup && (
        <ErrorPopup
          message="답변이 성공적으로 등록되었습니다."
          onClose={handleSuccessPopupClose}
        />
      )}
    </div>
  );
};

export default InquiryAnswer;