import React from 'react';
import { FiInfo, FiAlertCircle, FiUser, FiCheckCircle, FiActivity } from 'react-icons/fi';



const Disclaimer = () => (
  <div className="disclaimer-root">
    {/* Hero/Intro Section */}
    <section className="disclaimer-section disclaimer-hero">
      <div className="disclaimer-hero-icon">
        <FiAlertCircle size={54} color="#e53935" />
      </div>
      <h1 className="disclaimer-hero-title">Medical <span>Disclaimer</span></h1>
      <p className="disclaimer-hero-lead">
        The information provided by MedGemma and Radioception is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </section>

    {/* Disclaimer Points */}
    <section className="disclaimer-section disclaimer-point">
      <h2 className="disclaimer-icon-title"><span className="disclaimer-icon disclaimer-bg1"><FiInfo /></span> Not Medical Advice</h2>
      <p>The information provided on this website about MedGemma is for educational and informational purposes only. It is not intended as medical advice, diagnosis, or treatment.</p>
    </section>
    <section className="disclaimer-section disclaimer-point">
      <h2 className="disclaimer-icon-title"><span className="disclaimer-icon disclaimer-bg2"><FiActivity /></span> Research Purpose Only</h2>
      <p>MedGemma models are designed for research and development purposes. They are not clinical-grade tools and should not be used for actual patient care without proper validation and regulatory approval.</p>
    </section>
    <section className="disclaimer-section disclaimer-point">
      <h2 className="disclaimer-icon-title"><span className="disclaimer-icon disclaimer-bg3"><FiUser /></span> Consult Healthcare Professionals</h2>
      <p>Always consult with qualified healthcare professionals for medical decisions. Do not rely solely on AI models for health-related conclusions.</p>
    </section>
    <section className="disclaimer-section disclaimer-point">
      <h2 className="disclaimer-icon-title"><span className="disclaimer-icon disclaimer-bg4"><FiAlertCircle /></span> Use at Your Own Risk</h2>
      <p>Users assume full responsibility for any application of MedGemma models. The developers and this website disclaim any liability for medical decisions made based on AI model outputs.</p>
    </section>
    <section className="disclaimer-section disclaimer-point">
      <h2 className="disclaimer-icon-title"><span className="disclaimer-icon disclaimer-bg5"><FiCheckCircle /></span> Validation Required</h2>
      <p>Any clinical application requires thorough validation, regulatory compliance, and expert medical oversight before deployment in healthcare settings.</p>
    </section>
  </div>
);

export default Disclaimer;
