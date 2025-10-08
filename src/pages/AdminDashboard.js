import React from 'react';
import Sidebar from '../components/Sidebar';
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

  return (
  <div className="dashboard">
      <Sidebar role="admin" />
      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center p-3" style={{background:'linear-gradient(135deg, #36d1c4 0%, #1e90ff 100%)', borderBottom:'1px solid #e0e0e0', color: 'white'}}>
          <div>
            <h5 className="mb-0 text-white">Radioception Admin Panel</h5>
            <small style={{color: '#e0f7fa'}}>Medical Imaging & Analysis Platform</small>
          </div>
          <div className="d-flex align-items-center">
            <div className="user-info text-end me-3">
              <div className="fw-bold" style={{fontSize: '1.2rem'}}>{userDisplayName}</div>
              <small style={{color: '#e0f7fa'}}>Admin Account</small>
            </div>
            <button className="btn btn-outline-light" onClick={handleLogoutClick} style={{fontWeight:600}}>
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          </div>
        </div>
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
