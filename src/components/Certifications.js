import React from 'react';
import { FiShield, FiCheckCircle, FiUser, FiFileText, FiGlobe, FiRefreshCw } from 'react-icons/fi';

const Certifications = () => (
  <div className="cert-root">
    <section className="cert-section cert-hero">
      <div className="cert-hero-icon">
        <FiShield size={54} color="#1976d2" />
      </div>
      <h1 className="cert-hero-title">Certifications & <span>Compliance</span></h1>
      <p className="cert-hero-lead">
        Radioception and the MedGemma platform are committed to the highest standards of data privacy, security, and regulatory compliance in healthcare technology.
      </p>
    </section>

    <section className="cert-section cert-compliance">
      <h2 className="section-title"><FiShield className="main-icon" aria-label="Compliance" /> Compliance Standards</h2>
      <div className="cert-cards">
        <div className="cert-card" style={{"--cert-index": 0}}>
          <span className="cert-card-icon cert-card-bg1"><FiShield /></span>
          <b>HIPAA (US)</b>
          <p>Protects patient health information and privacy.</p>
        </div>
        <div className="cert-card" style={{"--cert-index": 1}}>
          <span className="cert-card-icon cert-card-bg2"><FiGlobe /></span>
          <b>GDPR (EU)</b>
          <p>Ensures data privacy and user rights for EU citizens.</p>
        </div>
        <div className="cert-card" style={{"--cert-index": 2}}>
          <span className="cert-card-icon cert-card-bg3"><FiGlobe /></span>
          <b>PIPEDA (Canada)</b>
          <p>Meets Canadian data protection and privacy requirements.</p>
        </div>
        <div className="cert-card" style={{"--cert-index": 3}}>
          <span className="cert-card-icon cert-card-bg4"><FiCheckCircle /></span>
          <b>SOC 2 Type II</b>
          <p>Rigorous controls for security, availability, and confidentiality.</p>
        </div>
        <div className="cert-card" style={{"--cert-index": 4}}>
          <span className="cert-card-icon cert-card-bg5"><FiFileText /></span>
          <b>ISO 27001</b>
          <p>International standard for information security management.</p>
        </div>
      </div>
    </section>

    <section className="cert-section cert-audits">
      <h2 className="section-title"><FiRefreshCw className="main-icon" aria-label="Audit" /> Regular Audits</h2>
      <ul className="cert-list">
        <li style={{"--cert-list-index": 0}}><span className="cert-step-icon"><FiCheckCircle /></span> Undergoes regular compliance audits and security assessments</li>
        <li style={{"--cert-list-index": 1}}><span className="cert-step-icon"><FiRefreshCw /></span> Continuous monitoring and improvement of security controls</li>
      </ul>
    </section>

    {/* <section className="cert-section cert-staff">
      <h2 className="section-title"><FiUser className="main-icon" aria-label="Staff" /> Staff Training</h2>
      <ul className="cert-list">
        <li style={{"--cert-list-index": 0}}><span className="cert-step-icon"><FiCheckCircle /></span> All staff complete privacy and security training</li>
        <li style={{"--cert-list-index": 1}}><span className="cert-step-icon"><FiUser /></span> Comprehensive background checks for all team members</li>
      </ul>
    </section> */}

    <section className="cert-section cert-cta">
      <div className="cert-cta-card">
        <b>We are dedicated to protecting your data and maintaining trust at every step.</b>
      </div>
    </section>
  </div>
);

export default Certifications;
