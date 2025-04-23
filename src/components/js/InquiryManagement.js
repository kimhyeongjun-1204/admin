import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Pagination from './Pagination';
import '../css/InquiryManagement.css';
import { SERVER_URL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [showUnanswered, setShowUnanswered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5; // 페이지당 항목 수
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, showUnanswered, searchTerm]);

  const fetchInquiries = async () => {
    try {
      // 검색어 유무에 따라 다른 엔드포인트 사용
      const url = searchTerm 
        ? `${SERVER_URL}/admin/inquiry/search` 
        : `${SERVER_URL}/admin/inquiry`;

      const params = {
        admin_id: localStorage.getItem('adminId')
      };

      // 검색 시에만 keyword 파라미터 추가
      if (searchTerm) {
        params.keyword = searchTerm;
      }

      const response = await axios.get(url, { params });

      if (response.data.result_code === 200) {
        let filteredInquiries = response.data.inquirys;
        if (showUnanswered) {
          filteredInquiries = filteredInquiries.filter(inquiry => !inquiry._answered);
        }
        setInquiries(filteredInquiries);
        setTotalCount(filteredInquiries.length);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // 현재 페이지의 항목들만 가져오기
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return inquiries.slice(startIndex, endIndex);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleInquiryClick = (inquiryId) => {
    navigate(`/admin/inquiry/${inquiryId}`);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <TopHeader />
        <div className="inquiry-management">
          <div className="inquiry-header">
            <h1>{showUnanswered ? '답변 대기' : '문의 관리'}({totalCount}개)</h1>
            <div className="inquiry-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="검색"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <i className="search-icon">🔍</i>
              </div>
              <label className="unanswered-toggle">
                <input
                  type="checkbox"
                  checked={showUnanswered}
                  onChange={(e) => {
                    setShowUnanswered(e.target.checked);
                    setCurrentPage(1);
                  }}
                />
                답변 안된 문의글만
              </label>
            </div>
          </div>

          <div className="inquiry-table">
            <div className="table-header">
              <div className="header-no">NO</div>
              <div className="header-title">제목</div>
              <div className="header-username">유저아이디</div>
              <div className="header-date">작성시간</div>
              <div className="header-status">답변 여부</div>
            </div>

            <div className="table-body">
              {getCurrentItems().map((inquiry) => (
                <div 
                  key={inquiry.inquiry_id} 
                  className="table-row"
                  onClick={() => handleInquiryClick(inquiry.inquiry_id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="cell-no">{inquiry.inquiry_id}</div>
                  <div className="cell-title">{inquiry.title}</div>
                  <div className="cell-username">{inquiry.username}</div>
                  <div className="cell-date">{formatDate(inquiry.inquiry_date)}</div>
                  <div className="cell-status">
                    {inquiry._answered ? (
                      <span className="status-answered">답변완료</span>
                    ) : (
                      <span className="status-pending">답변대기</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryManagement; 