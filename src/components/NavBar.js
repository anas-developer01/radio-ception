import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn, FiClock } from 'react-icons/fi';
import './NavBar.css';


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-blur px-4">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img src={require('../assets/Images/new-logo.png')} alt="Logo" className="navbar-logo" />
          <span className="navbar-brand-text">HealthHub</span>
        </Link>
        <button
          className={`navbar-toggler d-lg-none modern-toggler${menuOpen ? ' open' : ''}`}
          type="button"
          onClick={handleToggle}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''} d-lg-flex`}>
          <ul className={`navbar-nav ms-auto mb-2 mb-lg-0${menuOpen ? ' mobile-menu improved-mobile-menu' : ''}`}>
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/' ? ' active' : ''}`} to="/" onClick={handleClose}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/about' ? ' active' : ''}`} to="/about" onClick={handleClose}>About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/certifications' ? ' active' : ''}`} to="/certifications" onClick={handleClose}>Certifications</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/privacy-policy' ? ' active' : ''}`} to="/privacy-policy" onClick={handleClose}>Privacy Policy</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/disclaimer' ? ' active' : ''}`} to="/disclaimer" onClick={handleClose}>Disclaimer</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link login-btn ms-2 improved-login-btn"
                to="/login"
                onClick={handleClose}
                style={{ display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(25,118,210,0.13)' }}
              >
                <FiLogIn className="login-btn-icon" style={{ fontSize: '1.35em', marginRight: 4, transition: 'transform 0.18s' }} />
                <span>Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
