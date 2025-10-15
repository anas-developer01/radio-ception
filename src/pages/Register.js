import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
  const response = await axios.post(`${API_BASE_URL}/api/Auth/register`, {
        fullName,
        email,
        password,
        roleId: 2
      });
      setMessage(response.data.message || 'Registration successful! Please check your email for OTP.');
      // Save userId and email to localStorage for subscription
      localStorage.setItem('auth', JSON.stringify({
        userId: response.data.userId,
        email: response.data.email
      }));
      setFullName('');
      setPassword('');
      setTimeout(() => {
        navigate(`/verify-otp?email=${encodeURIComponent(response.data.email)}&mode=register`);
      }, 1200);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Registration failed.');
      }
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
          <h3 className="mb-4 pt-2 text-light text-center">REGISTERATION</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label text-light">Full Name</label>
              <input type="text" placeholder='Enter your full name' className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Email</label>
              <input type="email" placeholder='Enter your email' className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Password</label>
              <input type="password" placeholder='Enter your password' className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-med w-100" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          {/* Automatic redirect to OTP page after registration. */}
        </div>
      </div>
    </div>
  );
};

export default Register;
