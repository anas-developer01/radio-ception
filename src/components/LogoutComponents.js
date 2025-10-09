import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel, userEmail, userName, userType = 'Admin' }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={onCancel}
      ></div>
      
      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1050 }}
        aria-labelledby="logoutModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg">
            <div className="modal-header border-0 pb-0">
              <div className="d-flex align-items-center">
                <div className="modal-icon me-3">
                  <i className="fas fa-sign-out-alt fa-2x text-warning"></i>
                </div>
                <div>
                  <h5 className="modal-title mb-0" id="logoutModalLabel">
                    Confirm Logout
                  </h5>
                  <small className="text-muted">Are you sure you want to sign out?</small>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>
            
            <div className="modal-body pt-2">
              <div className="alert alert-light border d-flex align-items-center">
                <div className="user-avatar me-3">
                  <i className={`fas ${userType === 'Super Admin' ? 'fa-user-shield' : 'fa-user-circle'} fa-2x `}></i>
                </div>
                <div>
                  <div className="fw-bold">{userName || 'User'}</div>
                  <small className="text-muted">{userEmail}</small>
                  <div>
                    <span  className={`badge ${userType === 'Super Admin' ? '' : 'bg-primary'} mt-1`}>
                      {userType}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted mb-0">
                You will be signed out of your {userType.toLowerCase()} account and redirected to the home page. 
                Any unsaved work may be lost.
              </p>
            </div>
            
            <div className="modal-footer border-0 pt-0">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onCancel}
              >
                <i className="fas fa-times me-2"></i>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn "
                style={{ backgroundColor: '#073654', color: '#fff' }} 
                onClick={onConfirm}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const useLogout = (navigate) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('auth');
    setShowLogoutModal(false);
    navigate('/');
    
    // Optional: Show a toast notification
    if (window.bootstrap && window.bootstrap.Toast) {
      const toastElement = document.createElement('div');
      toastElement.className = 'toast align-items-center text-white bg-success border-0';
      toastElement.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="fas fa-check-circle me-2"></i>
            Successfully logged out!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `;
      document.body.appendChild(toastElement);
      const toast = new window.bootstrap.Toast(toastElement);
      toast.show();
      
      // Remove element after toast is hidden
      toastElement.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toastElement);
      });
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return {
    showLogoutModal,
    handleLogoutClick,
    handleLogoutConfirm,
    handleLogoutCancel
  };
};

export { LogoutConfirmationModal, useLogout };