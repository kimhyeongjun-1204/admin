import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Pagination from './Pagination';
import ConfirmPopup from './ConfirmPopup';
import ErrorPopup from './ErrorPopup';
import UserDetailModal from './UserDetailModal';
import '../css/UserManagement.css';

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const ITEMS_PER_PAGE = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const endpoint = searchTerm 
        ? `/admin/user/search?keyword=${encodeURIComponent(searchTerm)}` 
        : '/admin/user';
      const response = await api.get(endpoint);
      if (response.data.result_code === 200 && response.data.success) {
        setAllUsers(response.data.users);
      } else {
        throw new Error(response.data.message || '사용자 목록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError(err.message || '사용자 목록을 불러오는데 실패했습니다.');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleUserDelete = async (userId) => {
    setSelectedUserId(userId);
    const user = allUsers.find(u => u.userId === userId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/admin/user/delete/id=${selectedUserId}`);
      if (response.data.result_code === 200 && response.data.success) {
        setAllUsers(allUsers.filter(user => user.userId !== selectedUserId));
        setShowConfirm(false);
        setError('사용자 탈퇴가 완료되었습니다.');
        setShowError(true);
      } else {
        throw new Error(response.data.message || '사용자 삭제에 실패했습니다.');
      }
    } catch (err) {
      setError(err.message || '사용자 삭제에 실패했습니다.');
      setShowError(true);
    }
  };

  const handleUserRowDoubleClick = async (userId) => {
    try {
      const response = await api.get(`/admin/user/detail/${userId}`);
      if (response.data.result_code === 200 && response.data.success) {
        setUserDetail(response.data);
        setShowUserDetail(true);
      } else {
        throw new Error(response.data.message || '사용자 정보를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError(err.message || '사용자 정보를 불러오는데 실패했습니다.');
      setShowError(true);
    }
  };

  const filteredUsers = allUsers;

  const getCurrentPageItems = (items) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="user-management">
        <TopHeader />
        <div className="content-wrapper">
          <Sidebar />
          <div className="main-content">
            <div className="loading">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <TopHeader />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          <div className="header-section">
            <h1>사용자({filteredUsers.length}명)</h1>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="검색"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="users-table">
            <div className="table-header">
              <div className="header-cell">ID</div>
              <div className="header-cell">아이디</div>
              <div className="header-cell">이메일</div>
              <div className="header-cell">닉네임</div>
              <div className="header-cell">옵션</div>
            </div>
            <div className="table-body">
              {getCurrentPageItems(filteredUsers).map((user) => (
                <div 
                  key={user.userId} 
                  className="table-row"
                  onDoubleClick={() => handleUserRowDoubleClick(user.userId)}
                >
                  <div className="cell">{user.userId}</div>
                  <div className="cell">{user.username}</div>
                  <div className="cell">{user.email}</div>
                  <div className="cell">{user.nickname}</div>
                  <div className="cell">
                    <button
                      className="delete-button"
                      onClick={() => handleUserDelete(user.userId)}
                    >
                      회원 탈퇴
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showConfirm && (
        <ConfirmPopup
          message={`정말로 이 회원을 탈퇴시키시겠습니까?\n(유저 아이디 : ${allUsers.find(user => user.userId === selectedUserId)?.nickname})`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showError && (
        <ErrorPopup
          message={error}
          onClose={() => setShowError(false)}
        />
      )}

      {showUserDetail && userDetail && (
        <UserDetailModal
          userDetail={userDetail}
          onClose={() => setShowUserDetail(false)}
        />
      )}
    </div>
  );
};

export default UserManagement; 