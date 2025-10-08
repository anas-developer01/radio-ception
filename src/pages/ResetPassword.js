import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) setEmail(emailParam);
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${API_BASE_URL}/api/Auth/reset-password`, {
        email,
        newPassword
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Password reset failed.');
    }
    setLoading(false);
  };

  return (
    <div className="main-bg login-bg-blur" style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4" style={{ maxWidth: 400, width: '100%' }}>
          <div className="text-center mb-1 mt-1">
            <h2 className="mb-2 fw-bold text-primary">HealthHub</h2>
            <img src={require('../assets/Images/new-logo.png')} alt="HealthHub Logo" style={{ width: 168, height: 168 }} />
          </div>
          <h3 className="mb-4 text-center">Reset Password</h3>
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-med w-100" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
