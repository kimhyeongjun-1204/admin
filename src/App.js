import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/js/Login';
import Signup from './components/js/Signup';
import SignupSuccess from './components/js/SignupSuccess';
import Dashboard from './components/js/Dashboard';
import AdminManagement from './components/js/AdminManagement';
import ProtectedRoute from './components/js/ProtectedRoute';
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

        {/*  /* 로그인 이후에 들어갈 수 있음 */}
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
        
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App; 