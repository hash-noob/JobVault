import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login-CSS/landing.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1>Welcome to JobVault</h1>
        <p>Your gateway to career opportunities</p>
      </div>
      
      <div className="login-options">
        <div className="login-card student-card" onClick={() => navigate('/student-login')}>
          <div className="card-icon">
            <i className="fas fa-user-graduate"></i>
          </div>
          <h2>Student Login</h2>
          <p>Access your placement portal, apply for jobs, and track interviews</p>
          <button className="login-btn">Login as Student</button>
        </div>
        
        <div className="login-card admin-card" onClick={() => navigate('/admin-login')}>
          <div className="card-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <h2>Admin Login</h2>
          <p>Manage companies, view reports, and track placement statistics</p>
          <button className="login-btn">Login as Admin</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;