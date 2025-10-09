import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Removed role selection
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      await axios.post(`${API_BASE_URL}/api/Auth/forgot-password`, forgotEmail, {
        headers: { 'Content-Type': 'application/json' }
      });
      setForgotMsg('OTP sent to your email. Redirecting to OTP verification...');
      setTimeout(() => {
        setShowForgot(false);
        setForgotMsg('');
        setForgotEmail('');
        navigate(`/verify-otp?email=${encodeURIComponent(forgotEmail)}`);
      }, 1200);
    } catch (error) {
      setForgotMsg(error.response?.data?.message || 'Failed to send OTP.');
    }
    setForgotLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Auth/login`, {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      // Save all login data in localStorage
      localStorage.setItem('auth', JSON.stringify(response.data));
      const roleName = response.data.roleName;
      // Set adminUserId for dashboard if Admin
      if (roleName === 'Admin' && response.data.id) {
        localStorage.setItem('adminUserId', response.data.id);
      } else if (roleName === 'SuperAdmin' && response.data.id) {
        // Optionally clear adminUserId for SuperAdmin
        localStorage.removeItem('adminUserId');
      }
      setMessage('Login successful');
      setTimeout(async () => {
        if (roleName === 'SuperAdmin') {
          navigate('/superadmin');
        } else if (roleName === 'Admin') {
          navigate('/admin');
        } else {
          setMessage('Unknown role.');
        }
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
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
        <div className="card p-4" style={{ maxWidth: 400, width: '100%', backgroundColor: '#073654' }}>
          <div className="text-center mb-1 mt-1">
            <img className='rounded-3' src={require('../assets/Images/new-logo.jpg')} alt="Radioception Logo" style={{ width: 150, height: 150 }} />
          </div>
          <h3 className="mb-4 pt-2 text-light text-center">Radioception Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-light">Email</label>
              <input type="email" placeholder='Enter your email' className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Password</label>
              <input type="password" placeholder='Enter your password' className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-med w-100" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          <div className="text-center mt-3">
            <div className="login-row-align">
              <span className="text-light">Don't have an account?</span>
              <a href="/register" className="btn btn-link login-link-yellow mb-1">Register</a>
            </div>
          </div>
          <div className="text-center mt-2">
            <button type="button" className="btn btn-link p-0 login-link-yellow" onClick={() => setShowForgot(true)}>Forgot Password?</button>
          </div>
          {showForgot && (
            <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" style={{ color: '#073654' }}>Forgot Password</h5>
                    <button type="button" className="btn-close" onClick={() => { setShowForgot(false); setForgotMsg(''); setForgotEmail(''); }}></button>
                  </div>
                  <form onSubmit={handleForgotPassword}>
                    <div className="modal-body">
                      <label className="form-label">Enter your email</label>
                      <input type="email" className="form-control" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                      {forgotMsg && <div className="alert alert-info mt-2">{forgotMsg}</div>}
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-med" disabled={forgotLoading}>{forgotLoading ? 'Sending...' : 'Send OTP'}</button>
                      <button type="button" className="btn btn-secondary" onClick={() => { setShowForgot(false); setForgotMsg(''); setForgotEmail(''); }}>Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
