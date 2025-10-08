import React from 'react';
import { FiCpu, FiLayers, FiRefreshCw, FiShield, FiUserCheck, FiZap, FiUploadCloud, FiFileText, FiCheckCircle } from 'react-icons/fi';




const About = () => (
  <div className="about-root">
    {/* Hero/Intro Section */}
    <section className="about-section about-hero">
      <div className="about-hero-icon">
        <FiCpu size={54} color="#1976d2" />
      </div>
      <h1 className="about-hero-title">About <span>HealthHub</span> & <span>MedGemma</span></h1>
      <p className="about-hero-lead">
        HealthHub is a next-generation SaaS platform for radiologists and healthcare professionals. Powered by <b>MedGemma</b>, our platform uses advanced AI to analyze medical images and generate comprehensive, clinically relevant reports in seconds.
      </p>
    </section>

    {/* Technology Section */}
    <section className="about-section about-tech">
      <h2><FiCpu className="main-icon" aria-label="Tech" /> Our Technology</h2>
      <div className="about-cards">
        <div className="about-card">
          <span className="about-card-icon about-card-bg1"><FiLayers /></span>
          <b>Deep Learning Models</b>
          <p>Trained on diverse, high-quality radiology datasets for robust performance.</p>
        </div>
        <div className="about-card">
          <span className="about-card-icon about-card-bg2"><FiZap /></span>
          <b>Multi-Scan Support</b>
          <p>Analyze X-ray, CT, MRI, and Ultrasound images with a single platform.</p>
        </div>
        <div className="about-card">
          <span className="about-card-icon about-card-bg3"><FiRefreshCw /></span>
          <b>Continuous Improvement</b>
          <p>Regular updates for accuracy, reliability, and new features.</p>
        </div>
        <div className="about-card">
          <span className="about-card-icon about-card-bg4"><FiShield /></span>
          <b>Privacy-First Infrastructure</b>
          <p>All user data is protected with advanced security and compliance.</p>
        </div>
      </div>
    </section>

    {/* Workflow Section */}
    <section className="about-section about-workflow">
      <h2><FiUserCheck className="main-icon" aria-label="Workflow" /> How HealthHub Works</h2>
      <ol className="about-steps">
        <li><span className="about-step-icon"><FiCheckCircle /></span> <b>Sign up & Subscribe:</b> Unlock all features with a subscription.</li>
        <li><span className="about-step-icon"><FiUploadCloud /></span> <b>Upload Images:</b> Add your medical images and select scan type.</li>
        <li><span className="about-step-icon"><FiZap /></span> <b>AI Analysis:</b> MedGemma generates a detailed report in seconds.</li>
        <li><span className="about-step-icon"><FiFileText /></span> <b>Download PDF:</b> Share or archive your report instantly.</li>
      </ol>
    </section>

    {/* Benefits Section */}
    <section className="about-section about-benefits">
      <h2>Benefits</h2>
      <ul className="about-benefits-list">
        <li>Faster, more confident diagnoses</li>
        <li>Reduced reporting time and administrative burden</li>
        <li>Decision support for critical findings</li>
        <li>Easy integration into clinical workflows</li>
      </ul>
    </section>

    {/* CTA Section */}
    <section className="about-section about-cta">
      <div className="about-cta-card">
        <b>HealthHub is committed to advancing medical imaging with safe, effective, and accessible AI tools for all.</b>
      </div>
    </section>
  </div>
);

export default About;
