import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/js/Login';
import Signup from './components/js/Signup';
import SignupSuccess from './components/js/SignupSuccess';
import Dashboard from './components/js/Dashboard';
import AdminManagement from './components/js/AdminManagement';
import UserManagement from './components/js/UserManagement';
import InquiryManagement from './components/js/InquiryManagement';
import InquiryDetail from './components/js/InquiryDetail';
import InquiryAnswer from './components/js/InquiryAnswer';
import ProtectedRoute from './components/js/ProtectedRoute';
import NoticeManagement from './components/js/NoticeManagement';
import NoticeWrite from './components/js/NoticeWrite';
import './App.css';

const App = () => {
  // Simple auth check function
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admin"
            element={
              <ProtectedRoute>
                <AdminManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiry"
            element={
              <ProtectedRoute>
                <InquiryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiry/:inquiryId"
            element={
              <ProtectedRoute>
                <InquiryDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiry/:inquiryId/answer"
            element={
              <ProtectedRoute>
                <InquiryAnswer />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/notice"
            element={
              <ProtectedRoute>
                <NoticeManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/notice/write"
            element={
              <ProtectedRoute>
                <NoticeWrite />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/notice/:noticeId"
            element={
              <ProtectedRoute>
                <NoticeWrite />
              </ProtectedRoute>
            }
          />
          
          {/* Catch all route - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  );
};

export default App; 