
import React from 'react';
import { FaUserPlus, FaUpload, FaListOl, FaRobot, FaFilePdf, FaCheckCircle } from 'react-icons/fa';




const Home = () => (
  <div className="home-root">
    {/* Hero Section */}
    <section className="home-hero improved-hero modern-home-hero">
      <div className="improved-hero-inner">
        {/* Removed hero SVG card */}
        <div className="improved-hero-text">
          <h1 className="improved-hero-title">Smarter Radiology with <span>MedGemma</span></h1>
          <p className="improved-hero-lead">
            Empowering radiologists and healthcare providers with <b>advanced, AI-powered radiographic image analysis</b>.<br />
            Instantly generate accurate reports, improve diagnostic confidence, and streamline your workflow.
          </p>
          <div className="improved-hero-btn-row">
            <a href="/register" className="improved-hero-btn modern-hero-btn">Start Free Trial</a>
          </div>
        </div>
      </div>
    </section>

    <section className="home-section home-how">
      <h3 className="how-title">How It Works</h3>
      <div className="home-cards improved-how-cards">
        <div className="home-card improved-how-card">
          <span className="home-card-icon"><FaUserPlus /></span>
          <span className="home-card-num">1</span>
          <b>Register & Subscribe</b>
          <p>Sign up and choose a subscription plan to access the platform.</p>
        </div>
        <div className="home-card improved-how-card">
          <span className="home-card-icon"><FaUpload /></span>
          <span className="home-card-num">2</span>
          <b>Upload Medical Images</b>
          <p>Upload X-ray, CT, MRI, or Ultrasound images securely.</p>
        </div>
        <div className="home-card improved-how-card">
          <span className="home-card-icon"><FaListOl /></span>
          <span className="home-card-num">3</span>
          <b>Select Scan Type</b>
          <p>Choose the scan type for accurate AI analysis.</p>
        </div>
        <div className="home-card improved-how-card">
          <span className="home-card-icon"><FaRobot /></span>
          <span className="home-card-num">4</span>
          <b>AI-Powered Report</b>
          <p>MedGemma analyzes your image and generates a detailed report in seconds.</p>
        </div>
        <div className="home-card improved-how-card">
          <span className="home-card-icon"><FaFilePdf /></span>
          <span className="home-card-num">5</span>
          <b>Download as PDF</b>
          <p>Instantly download your report in PDF format.</p>
        </div>
      </div>
    </section>

    <section className="home-section home-benefits improved-benefits-section">
      <h3 className="improved-benefits-title">Why Choose Radioception?</h3>
      <ul className="home-benefits-list improved-benefits-list">
        <li><FaCheckCircle className="benefit-icon" />Fast, accurate, and secure AI-assisted radiology reporting</li>
        <li><FaCheckCircle className="benefit-icon" />Supports X-ray, CT, MRI, and Ultrasound</li>
        <li><FaCheckCircle className="benefit-icon" />Easy PDF download for every report</li>
        <li><FaCheckCircle className="benefit-icon" />Subscription-based access for clinics, hospitals, and professionals</li>
        <li><FaCheckCircle className="benefit-icon" />Compliant with healthcare privacy and security standards</li>
      </ul>
    </section>

    <section className="home-section home-cta-section improved-cta-section">
      <div className="home-cta-card improved-cta-card">
        <b>Start your free trial today and experience the future of radiology with <span>MedGemma!</span></b>
      </div>
    </section>
  </div>
);

export default Home;
