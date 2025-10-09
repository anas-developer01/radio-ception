import React from 'react';
import { FiMail, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import '../styles/main.css';

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-links">
        <a href="/" className="footer-link">Home</a>
        <a href="/about" className="footer-link">About</a>
        <a href="/certifications" className="footer-link">Certifications</a>
  <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        <a href="/disclaimer" className="footer-link">Disclaimer</a>
      </div>
      <div className="footer-social">
        <a href="mailto:info@medgemma.com" className="footer-icon" aria-label="Email"><FiMail /></a>
        <a href="https://github.com/medgemma" className="footer-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
        <a href="https://linkedin.com/company/medgemma" className="footer-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
        <a href="https://medgemma.com" className="footer-icon" aria-label="Website" target="_blank" rel="noopener noreferrer"><FiGlobe /></a>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} Radioception. All rights reserved.
    </div>
  </footer>
);

export default Footer;
