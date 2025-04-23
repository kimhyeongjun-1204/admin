import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import '../css/InquiryDetail.css';
import { SERVER_URL } from '../../config/config';

const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAnswer = () => {
    // 답변 페이지로 이동
    navigate(`/admin/inquiry/${inquiryId}/answer`);
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!inquiry) return <div className="not-found">문의글을 찾을 수 없습니다.</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <TopHeader />
        <div className="inquiry-detail">
          <div className="detail-header">
            <button className="back-button" onClick={handleBack}>
              ← 목록으로
            </button>
            <h1>문의 상세</h1>
            {!inquiry._answered && (
              <button className="answer-button" onClick={handleAnswer}>
                답변하기
              </button>
            )}
          </div>
          
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
            
            <div className="detail-row">
              <div className="detail-label">답변 상태</div>
              <div className="detail-value">
                <span className={inquiry._answered ? "status-answered" : "status-pending"}>
                  {inquiry._answered ? "답변완료" : "답변대기"}
                </span>
              </div>
            </div>
            
            <div className="detail-row content">
              <div className="detail-label">내용</div>
              <div className="detail-value content-text">{inquiry.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail; 