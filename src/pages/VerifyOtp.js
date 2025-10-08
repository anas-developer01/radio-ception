import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [mode, setMode] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    const modeParam = params.get('mode');
    if (emailParam) setEmail(emailParam);
    if (modeParam) setMode(modeParam);
  }, [location]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const handleResendOtp = async () => {
    setResendLoading(true);
    setResendMsg('');
    try {
      await axios.post(`${API_BASE_URL}/api/Auth/resend-otp`, email, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResendMsg('OTP resent! Please check your email.');
    } catch (error) {
      setResendMsg(error.response?.data?.message || 'Failed to resend OTP.');
    }
    setResendLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${API_BASE_URL}/api/Auth/verify-otp`, {
        email,
        otp
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (mode === 'register') {
        setMessage('OTP verified! Redirecting to subscription...');
        setTimeout(() => {
          navigate('/admin/subscription');
        }, 1500);
      } else {
        setMessage('OTP verified! Redirecting to reset password...');
        setTimeout(() => {
          navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 1500);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'OTP verification failed.');
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
          <h3 className="mb-4 text-center">Verify OTP</h3>
          <form onSubmit={handleVerify}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">OTP</label>
              <input type="text" className="form-control" value={otp} onChange={e => setOtp(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-med w-100" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          <button type="button" className="btn btn-link w-100 mt-2" onClick={handleResendOtp} disabled={resendLoading || !email}>
            {resendLoading ? 'Resending...' : 'Resend OTP'}
          </button>
          {resendMsg && <div className="alert alert-success mt-2">{resendMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
