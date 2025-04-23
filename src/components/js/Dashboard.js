import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import '../css/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TopHeader />
      <div className="dashboard-content">
        <Sidebar />
        
        <div className="main-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-title">총 회원 수</div>
                <div className="stat-value">2,000명</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-title">일일 접속자 수</div>
                <div className="stat-value">240명</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎵</div>
              <div className="stat-info">
                <div className="stat-title">총 곡 업로드 수</div>
                <div className="stat-value">2,300곡</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <div className="stat-title">일일 곡 업로드 수</div>
                <div className="stat-value">130곡</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❓</div>
              <div className="stat-info">
                <div className="stat-title">일일 문의글 수</div>
                <div className="stat-value">30개</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🤖</div>
              <div className="stat-info">
                <div className="stat-title">AI 평균 처리 소요 시간</div>
                <div className="stat-value">25초</div>
              </div>
            </div>
          </div>
          
          <div className="log-container">
            <div className="log-header">
              <div className="log-icon">📝</div>
              <div className="log-title">로그</div>
            </div>
            <div className="log-content">
              <div className="log-header-row">
                <span className="log-time">TIME</span>
                <span className="log-userid">userid</span>
                <span className="log-level">로그 레벨</span>
                <span className="log-message">Message</span>
              </div>
              <div className="log-entries">
                <div className="log-entry">
                  <span className="log-time">2025-03-18 22:20:14.903</span>
                  <span className="log-userid">kim1234</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">사용자가 리듬게임을 시작했습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 22:08:14.903</span>
                  <span className="log-userid">park1234</span>
                  <span className="log-level">ERROR</span>
                  <span className="log-message">곡 업로드에 실패하였습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 19:20:14.903</span>
                  <span className="log-userid">park1234</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">새로운 문의글이 추가되었습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 13:23:14.903</span>
                  <span className="log-userid">yoons</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">사용자가 리듬게임을 완료했습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 12:01:14.903</span>
                  <span className="log-userid">kim5222</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">사용자가 리듬게임을 시작했습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 09:17:14.903</span>
                  <span className="log-userid">park 7</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">새로운 곡을 업로드하였습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 08:13:14.90</span>
                  <span className="log-userid">ho23</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">새로운 사용자가 가입하였습니다.</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">2025-03-18 06:29:14.903</span>
                  <span className="log-userid">jishon11</span>
                  <span className="log-level">ERROR</span>
                  <span className="log-message">초대 코드 생성에 실패하였습니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 