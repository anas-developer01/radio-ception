
import React, { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiGlobe, FiSend } from 'react-icons/fi';
import '../styles/main.css';

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const [error, setError] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);
    try {
      const response = await fetch('/api/Contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Failed to send message.');
      }
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <div className="footer-blue-bar"></div>
      <footer className="main-footer mt-3">
        <div className="footer-content mt-5"> 
          <div className="footer-col footer-links mb-5">
           <h4 style={{ marginRight: 22 }}>Quick Links</h4>
            <ul>
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/certifications" className="footer-link">Certifications</a></li>
              <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="footer-link">Disclaimer</a></li>
            </ul>
             <h3 style={{ color: '#073654', fontWeight: 900,  }}>Radioception</h3>
            <p style={{ color: '#073654', fontSize: '1.05rem',  }}>Smarter Radiology with MedGemma.<br />AI-powered radiographic image analysis.</p>
            
            
          </div>
          <div className="footer-col footer-contact">
            <h4>Contact Us</h4>
            <form className="footer-contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={3} />
              <button type="submit" className="footer-send-btn"><FiSend /> Send</button>
              {submitted && <div className="footer-success-msg">Thank you! Your message has been sent.</div>}
              {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            </form>
          </div>
        </div>
        <div className="footer-bottom improved-footer-bottom">
          &copy; {new Date().getFullYear()} Radioception. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
