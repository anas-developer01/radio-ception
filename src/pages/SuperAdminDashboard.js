import newLogo from '../assets/Images/new-logo.jpg';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { FiMenu } from 'react-icons/fi';
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar role="superadmin" />}
      {/* Header with hamburger for mobile only */}
  <div className="admin-panel-header d-flex justify-content-between align-items-center" style={!isMobile ? { borderBottom: '1px solid #e0e0e0', color: 'white', marginLeft: 160, width: 'calc(100% - 160px)', padding: '10px 18px 10px 18px', minHeight: 60 } : { borderBottom: '1px solid #e0e0e0', color: 'white', marginLeft: 0, width: '100%', padding: '10px 10px', minHeight: 56 }}>
        <div>
          <h5 className="mb-0 text-white">Radioception Super Admin Panel</h5>
          <small style={{color: '#e0f7fa'}}>System Management & Administration</small>
        </div>
        {!isMobile ? (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{fontWeight: 700, fontSize: '1.15rem', color: '#fff'}}>{userDisplayName}</span>
              <button className="btn btn-outline-light" style={{fontWeight: 600, fontSize: '1rem', borderRadius: 8, padding: '3px 16px'}} onClick={handleLogoutClick}>Logout</button>
            </div>
            <span style={{color: '#e0f7fa', fontSize: '1rem'}}>Super Administrator</span>
          </div>
        ) : (
          <button className="btn btn-link text-white fs-2" style={{outline:'none', boxShadow:'none'}} onClick={() => setSidebarOpen(true)}>
            <FiMenu />
          </button>
        )}
      </div>
      {/* Minimal Sidebar for mobile only */}
      {isMobile && sidebarOpen && (
        <div className="custom-mini-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
       
      )}
      {isMobile && (
        <div className={`custom-mini-sidebar${sidebarOpen ? ' open' : ''}`}>
          <button className="btn btn-link text-white fs-2 custom-mini-sidebar-close" onClick={() => setSidebarOpen(false)}>&times;</button>
          <div className="mini-sidebar-content">
             <div className="text-center mb-3 ">
              <img src={newLogo} alt="Radioception" className="mini-sidebar-logo" style={{ width: 64, height: 64, border: 'none' }} />
              <h5 className="mt-2" style={{ color: '#fff' }}>RADIOCEPTION</h5>
            </div>
            {/* Navigation Links */}
            <a href="/superadmin" className="mini-sidebar-link">Dashboard</a>
            <a href="/superadmin/admins" className="mini-sidebar-link">Manage Admins</a>
            <a href="/superadmin/subscription" className="mini-sidebar-link">Subscription</a>
            <a href="/superadmin/upload" className="mini-sidebar-link">Image Analysis</a>
            <div className="mini-sidebar-email mt-2">{userEmail}</div>
            <button className="btn btn-outline-light w-100 mt-3" onClick={handleLogoutClick} style={{fontWeight:600}}>
              Logout
            </button>
          </div>
        </div>
      )}
  <div className="dashboard-content" style={!isMobile ? { marginLeft: 160, width: 'calc(100% - 160px)' } : { width: '100%' }}>
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
