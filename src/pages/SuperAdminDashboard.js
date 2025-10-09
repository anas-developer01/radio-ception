
import React from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate, Outlet } from 'react-router-dom';
import { LogoutConfirmationModal, useLogout } from '../components/LogoutComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userEmail = auth?.email || '';
  const getUserDisplayName = () => {
    if (auth?.name) return auth.name;
    if (auth?.userName) return auth.userName;
    if (auth?.fullName) return auth.fullName;
    if (userEmail) {
      const emailPart = userEmail.split('@')[0];
      return emailPart
        .replace(/[0-9]/g, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(/[\s_-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim() || 'Super Admin';
    }
    return 'Super Admin';
  };
  const userDisplayName = getUserDisplayName();
  const { showLogoutModal, handleLogoutClick, handleLogoutConfirm, handleLogoutCancel } = useLogout(navigate);
  return (
    <div className="dashboard">
      <Sidebar role="superadmin" />
      <div className="dashboard-content">
  <div className="admin-panel-header d-flex justify-content-between align-items-center" style={{borderBottom:'1px solid #e0e0e0', color: 'white'}}>
          <div>
            <h5 className="mb-0 text-white">Radioception Super Admin Panel</h5>
            <small style={{color: '#e0f7fa'}}>System Management & Administration</small>
          </div>
          <div className="d-flex align-items-center">
            <div className="user-info text-end me-3">
              <div className="fw-bold" style={{fontSize: '1.2rem'}}>{userDisplayName}</div>
              <small style={{color: '#e0f7fa'}}>Super Administrator</small>
            </div>
            <button className="btn btn-outline-light" onClick={handleLogoutClick} style={{fontWeight:600}}>
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          </div>
        </div>
        {/* Nested routes will render here */}
        <Outlet />
      </div>
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        userEmail={userEmail}
        userName={userDisplayName}
        userType="Super Admin"
      />
    </div>
  );
};

export default SuperAdminDashboard;
