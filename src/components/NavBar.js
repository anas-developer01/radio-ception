import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn } from 'react-icons/fi';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="simple-navbar">
      <Link to="/" className="simple-navbar-logo" onClick={handleClose}>
        <img src={require('../assets/Images/new-logo.jpg')} alt="Logo" />
        <span className="simple-navbar-title">RADIOCEPTION</span>
      </Link>
      <button
        onClick={handleToggle}
        aria-label="Toggle navigation"
        className="simple-navbar-toggle"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <div className={`simple-navbar-links${menuOpen ? ' open' : ''}`}>
        <Link to="/" onClick={handleClose} className={`simple-navbar-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
        <Link to="/about" onClick={handleClose} className={`simple-navbar-link${location.pathname === '/about' ? ' active' : ''}`}>About</Link>
        <Link to="/certifications" onClick={handleClose} className={`simple-navbar-link${location.pathname === '/certifications' ? ' active' : ''}`}>Certifications</Link>
        <Link to="/privacy-policy" onClick={handleClose} className={`simple-navbar-link${location.pathname === '/privacy-policy' ? ' active' : ''}`}>Privacy Policy</Link>
        <Link to="/disclaimer" onClick={handleClose} className={`simple-navbar-link${location.pathname === '/disclaimer' ? ' active' : ''}`}>Disclaimer</Link>
        <Link to="/login" onClick={handleClose} className="simple-navbar-login">
          <FiLogIn /> Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
