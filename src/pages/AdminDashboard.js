import React from 'react';
import newLogo from '../assets/Images/new-logo.jpg';
import Sidebar from '../components/Sidebar';
import { FiMenu } from 'react-icons/fi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogoutConfirmationModal, useLogout } from '../components/LogoutComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import { Modal, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [paymentMessage, setPaymentMessage] = React.useState('');
  const [subscriptionLoading, setSubscriptionLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userEmail = auth?.email || '';
  
  // Extract user name from auth or derive from email
  const getUserDisplayName = () => {
    if (auth?.name) return auth.name;
    if (auth?.userName) return auth.userName;
    if (auth?.fullName) return auth.fullName;
    
    // If no name stored, derive from email
    if (userEmail) {
      const emailPart = userEmail.split('@')[0];
      // Convert email part to readable name (e.g., fazalkhanrind606 -> Fazal Khan Rind)
      return emailPart
        .replace(/[0-9]/g, '') // Remove numbers
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
        .split(/[\s_-]+/) // Split by space, underscore, or dash
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim() || 'Admin User';
    }
    
    return 'Admin User';
  };

  const userDisplayName = getUserDisplayName();

  const { 
    showLogoutModal, 
    handleLogoutClick, 
    handleLogoutConfirm, 
    handleLogoutCancel 
  } = useLogout(navigate);

  React.useEffect(() => {
    // Show payment modal if redirected from payment (params present)
    const params = new URLSearchParams(location.search);
    const adminUserId = params.get('userId');
    const subscriptionId = params.get('subscriptionId');
    const status = params.get('status');
    if (adminUserId && subscriptionId && status === 'success') {
      setShowPaymentModal(true);
      setPaymentMessage('Processing your subscription...');
      setSubscriptionLoading(true);
      axios.post(`${API_BASE_URL}/api/Auth/update-subscription`, {
        adminUserId: Number(adminUserId),
        subscriptionId: Number(subscriptionId)
      })
        .then((res) => {
          setPaymentMessage(res.data.message || 'Subscription updated successfully!');
        })
        .catch((err) => {
          let errorMsg = 'Subscription update failed.';
          if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
          } else if (err.message) {
            errorMsg = err.message;
          }
          setPaymentMessage(errorMsg);
        })
        .finally(() => {
          setSubscriptionLoading(false);
        });
    }
  }, [location]);

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
      {!isMobile && <Sidebar role="admin" />}
      {/* Header with hamburger for mobile only */}
  <div className="admin-panel-header d-flex justify-content-between align-items-center" style={!isMobile ? { borderBottom: '1px solid #e0e0e0', color: 'white', marginLeft: 160, width: 'calc(100% - 160px)', padding: '10px 18px 10px 18px', minHeight: 60 } : { borderBottom: '1px solid #e0e0e0', color: 'white', marginLeft: 0, width: '100%', padding: '10px 10px', minHeight: 56 }}>
        <div>
          <h5 className="mb-0 text-white">Radioception Admin Panel</h5>
          <small style={{color: '#e0f7fa'}}>Medical Imaging & Analysis Platform</small>
        </div>
        {!isMobile ? (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{fontWeight: 700, fontSize: '1.15rem', color: '#fff'}}>{userDisplayName}</span>
              <button className="btn btn-outline-light" style={{fontWeight: 600, fontSize: '1rem', borderRadius: 8, padding: '3px 16px'}} onClick={handleLogoutClick}>Logout</button>
            </div>
            <span style={{color: '#e0f7fa', fontSize: '1rem'}}>Admin</span>
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
            <h5 className="mt-2" style={{color:'#fff'}}>RADIOCEPTION</h5>
          </div>
            {/* Navigation Links */}
            <a href="/admin" className="mini-sidebar-link">Dashboard</a>
            <a href="/admin/subscription" className="mini-sidebar-link">Subscription</a>
            <a href="/admin/upload" className="mini-sidebar-link">Upload Radio</a>
            <div className="mini-sidebar-email mt-2">{userEmail}</div>
            <button className="btn btn-outline-light w-100 mt-3" onClick={handleLogoutClick} style={{fontWeight:600}}>
              Logout
            </button>
          </div>
        </div>
      )}
  <div className="dashboard-content" style={!isMobile ? { marginLeft: 160, width: 'calc(100% - 160px)' } : { width: '100%' }}>
        {/* Payment Success Modal */}
        <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Payment Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 className="mb-3">{paymentMessage}</h5>
              {subscriptionLoading && <div className="mb-2">Updating subscription...</div>}
              <div className="mt-2 text-muted">Thank you for your payment!</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => { setShowPaymentModal(false); navigate('/admin', { replace: true }); }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Minimal dashboard, all widgets/cards removed */}
        {/* Nested routes will render here */}
        <Outlet />
      </div>
      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        userEmail={userEmail}
        userName={userDisplayName}
        userType="Admin"
      />
    </div>
  );
};

export default AdminDashboard;
