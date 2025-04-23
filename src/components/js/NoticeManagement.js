import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopHeader from './TopHeader';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import '../css/NoticeManagement.css';
import { SERVER_URL } from '../../config/config';

const NoticeManagement = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5; // 페이지당 항목 수

  useEffect(() => {
    fetchNotices();
  }, [currentPage]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/admin/notice`);
      
      if (response.data.result_code === 201) {
        setNotices(response.data.notices);
        setTotalCount(response.data.notices.length);
      } else {
        console.error('Error fetching notices:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  // 현재 페이지의 항목들만 가져오기
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return notices.slice(startIndex, endIndex);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleWriteClick = () => {
    navigate('/admin/notice/write');
  };

  const handleDeleteClick = async (noticeId, e) => {
    e.stopPropagation();
    if (window.confirm('공지사항을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/admin/notice/${noticeId}`);
        fetchNotices();
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    }
  };

  const handleNoticeClick = (noticeId) => {
    navigate(`/admin/notice/${noticeId}`);
  };

  return (
    <div className="admin-layout">
      <TopHeader />
      <Sidebar />
      <div className="admin-main">
        <div className="notice-management">
          <div className="notice-header">
            <h1>공지사항 관리({totalCount}개)</h1>
            <button className="write-button" onClick={handleWriteClick}>
              글쓰기
            </button>
          </div>

          <div className="notice-table">
            <div className="table-header">
              <div className="header-no">NO</div>
              <div className="header-title">제목</div>
              <div className="header-author">작성자</div>
              <div className="header-date">작성시간</div>
              <div className="header-actions"></div>
            </div>
            {getCurrentItems().map((notice) => (
              <div
                key={notice.notice_id}
                className="table-row"
                onClick={() => handleNoticeClick(notice.notice_id)}
              >
                <div className="cell-no">{notice.notice_id}</div>
                <div className="cell-title">{notice.title}</div>
                <div className="cell-author">{notice.author_admin_id}</div>
                <div className="cell-date">
                  {new Date(notice.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
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

export default NoticeManagement; 