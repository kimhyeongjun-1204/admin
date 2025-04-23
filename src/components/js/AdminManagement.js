import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../css/AdminManagement.css';
import { SERVER_URL } from '../../config/config';
import Pagination from './Pagination';
import ErrorPopup from './ErrorPopup';
import ConfirmPopup from './ConfirmPopup';
import TopHeader from './TopHeader';
const AdminManagement = () => {
  // admins => 승인된 관리자, pendingAdmins => 승인 대기 관리자
  const [admins, setAdmins] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [currentAdminPage, setCurrentAdminPage] = useState(1);
  const [currentPendingPage, setCurrentPendingPage] = useState(1);
  const [totalAdminPages, setTotalAdminPages] = useState(1);
  const [totalPendingPages, setTotalPendingPages] = useState(1);
  const ITEMS_PER_PAGE = 5; // 한 페이지당 10개의 항목 표시
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorPopupMessage, setErrorPopupMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminName, setSelectedAdminName] = useState('');
  const [isRejectAction, setIsRejectAction] = useState(false);
  const [isApproveAction, setIsApproveAction] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${SERVER_URL}/admin/admin`);
      
      if (response.data.result_code === 200) {
        // signup_date가 null이 아닌 관리자는 승인된 관리자
        const approved = response.data.admins.filter(admin => admin.signup_date !== null);
        // signup_date가 null인 관리자는 승인 대기 관리자
        const pending = response.data.admins.filter(admin => admin.signup_date === null);
        
        setAdmins(approved);
        setPendingAdmins(pending);
        setTotalAdminPages(Math.ceil(approved.length / ITEMS_PER_PAGE));
        setTotalPendingPages(Math.ceil(pending.length / ITEMS_PER_PAGE));
      } else {
        setError('Failed to fetch admin data');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Failed to fetch admin data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const getCurrentPageItems = (items, currentPage) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handleAdminPageChange = (page) => {
    setCurrentAdminPage(page);
  };

  const handlePendingPageChange = (page) => {
    setCurrentPendingPage(page);
  };

  // 2. 관리자 탈퇴 기능
  const handleRemoveAdmin = async (adminId) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/admin/admin/delete`, {
        params: {
          admin_id: Number(adminId)
        }
      });
      
      if (response.data.result_code === 200) {
        setAdmins(admins.filter(admin => admin.admin_id !== adminId));
        setTotalAdminPages(Math.ceil((admins.length - 1) / ITEMS_PER_PAGE));
        if (currentAdminPage > Math.ceil((admins.length - 1) / ITEMS_PER_PAGE)) {
          setCurrentAdminPage(Math.ceil((admins.length - 1) / ITEMS_PER_PAGE));
        }
        setErrorPopupMessage(response.data.message);
        setShowErrorPopup(true);
      } else {
        console.error('Failed to remove admin:', response.data);
        setErrorPopupMessage(response.data.message || '관리자 탈퇴 처리에 실패했습니다.');
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error('Error removing admin:', error);
      const errorMessage = error.response?.data?.message || '관리자 탈퇴 처리 중 오류가 발생했습니다.';
      setErrorPopupMessage(errorMessage);
      setShowErrorPopup(true);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
    setErrorPopupMessage('');
  };

  const handleAdminApprove = async (adminId) => {
    try {
      const response = await axios.post(`${SERVER_URL}/admin/admin/accept`, null, {
        params: {
          admin_id: Number(adminId)
        }
      });
      if (response.data.result_code === 200) {
        await fetchAdmins(); // 승인 후 목록 새로고침
        setErrorPopupMessage(response.data.message);
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error('Error approving admin:', error);
      const errorMessage = error.response?.data?.message || '관리자 승인 중 오류가 발생했습니다.';
      setErrorPopupMessage(errorMessage);
      setShowErrorPopup(true);
    }
  };

  const handleAdminReject = async (adminId) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/admin/admin/delete`, {
        params: {
          admin_id: adminId
        }
      });
      if (response.data.result_code === 200) {
        await fetchAdmins(); // 거절 후 목록 새로고침
        setErrorPopupMessage(response.data.message);
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error('Error rejecting admin:', error);
      const errorMessage = error.response?.data?.message || '관리자 거절 중 오류가 발생했습니다.';
      setErrorPopupMessage(errorMessage);
      setShowErrorPopup(true);
    }
  };

  const handleRemoveClick = (adminId, name) => {
    setSelectedAdminId(adminId);
    setSelectedAdminName(name);
    setIsRejectAction(false);
    setShowConfirmPopup(true);
  };

  const handleRejectClick = (adminId, name) => {
    setSelectedAdminId(adminId);
    setSelectedAdminName(name);
    setIsRejectAction(true);
    setShowConfirmPopup(true);
  };

  const handleApproveClick = (adminId, name) => {
    setSelectedAdminId(adminId);
    setSelectedAdminName(name);
    setIsApproveAction(true);
    setIsRejectAction(false);
    setShowConfirmPopup(true);
  };

  const handleConfirmAction = async () => {
    if (isApproveAction) {
      await handleAdminApprove(selectedAdminId);
    } else if (isRejectAction) {
      await handleAdminReject(selectedAdminId);
    } else {
      await handleRemoveAdmin(selectedAdminId);
    }
    setShowConfirmPopup(false);
    setSelectedAdminId(null);
    setSelectedAdminName('');
    setIsApproveAction(false);
    setIsRejectAction(false);
  };

  const handleCancelAction = () => {
    setShowConfirmPopup(false);
    setSelectedAdminId(null);
    setSelectedAdminName('');
    setIsApproveAction(false);
    setIsRejectAction(false);
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-content">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-content">
          <div className="error">{error}</div>
          <button onClick={fetchAdmins} className="retry-button">다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <TopHeader />
      <Sidebar />
      <div className="admin-content">
        {/* <h2 className="section-title">관리자 목록</h2> */}
        <div className="admin-section">
          <h2 className="section-title">관리자 목록 ({admins.length}명)</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>가입일</th>
                <th>이름</th>
                <th>아이디</th>
                <th>생년월일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageItems(admins, currentAdminPage).map((admin) => (
                <tr key={admin.admin_id}>
                  <td>{admin.admin_id}</td>
                  <td>{admin.signup_date}</td>
                  <td>{admin.name}</td>
                  <td>{admin.username}</td>
                  <td>{admin.birth}</td>
                  <td>
                    <button 
                      className="remove-button"
                      onClick={() => handleRemoveClick(admin.admin_id, admin.name)}
                    >
                      관리자 탈퇴
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentAdminPage}
            totalPages={totalAdminPages}
            onPageChange={handleAdminPageChange}
          />
        </div>

        <div className="pending-section">
          <h2 className="section-title">승인 대기 ({pendingAdmins.length}명)</h2>
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>아이디</th>
                <th>생년월일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {pendingAdmins.map((admin) => (
                <tr key={admin.username}>
                  <td>{admin.name}</td>
                  <td>{admin.username}</td>
                  <td>{admin.birth}</td>
                  <td className="cell-options">
                    <button 
                      className="approve-button"
                      onClick={() => handleApproveClick(admin.admin_id, admin.name)}
                    >
                      승인
                    </button>
                    <button 
                      className="reject-button"
                      onClick={() => handleRejectClick(admin.admin_id, admin.name)}
                    >
                      거절
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPendingPage}
            totalPages={totalPendingPages}
            onPageChange={handlePendingPageChange}
          />
        </div>
        {showErrorPopup && (
          <ErrorPopup
            message={errorPopupMessage}
            onClose={handleCloseErrorPopup}
          />
        )}
        {showConfirmPopup && (
          <ConfirmPopup
            message={isApproveAction 
              ? `정말 ${selectedAdminName}님의 가입을 승인하시겠습니까?`
              : isRejectAction 
                ? `정말 ${selectedAdminName}님의 가입 승인을 거절하시겠습니까?`
                : `정말 ${selectedAdminName}님의 관리자탈퇴를 진행하시겠습니까?`}
            onConfirm={handleConfirmAction}
            onCancel={handleCancelAction}
          />
        )}
      </div>
    </div>
  );
};

export default AdminManagement; 
