import React from 'react';
import { FiLock, FiShield, FiUserCheck, FiTrash2, FiGlobe, FiMail, FiClock, FiCheckCircle, FiUser, FiAlertCircle, FiFileText } from 'react-icons/fi';



const PrivacyPolicy = () => (
  <div className="policy-root">
    {/* Hero/Intro Section */}
    <section className="policy-section policy-hero">
      <div className="policy-hero-icon">
        <FiLock size={54} color="#1976d2" />
      </div>
      <h1 className="policy-hero-title">Privacy <span>Policy</span></h1>
      <p className="policy-hero-lead">
        Your privacy is our top priority. HealthHub and MedGemma are committed to protecting your medical data with industry-leading security, transparency, and compliance.
      </p>
    </section>

    {/* Platform Summary Section */}
    <section className="policy-section policy-summary">
      <h2><FiUser className="main-icon" aria-label="AI" /> Smarter Radiology with MedGemma</h2>
      <p>
        We specialize in advanced radiographic image processing powered by MedGemma. Our platform helps radiologists generate accurate, AI-assisted reports in seconds, improving diagnostic confidence and reducing reporting time.
      </p>
      <p>
        By combining deep learning with medical expertise, we provide decision support that highlights critical findings, reduces oversight, and supports better patient outcomes.
      </p>
    </section>

    {/* Privacy Rights Section */}
    <section className="policy-section policy-rights">
      <h2><FiLock className="main-icon" aria-label="Lock" /> Your Medical Privacy Rights</h2>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg1"><FiShield /></span> Comprehensive Rights</h3>
        <p>Under GDPR, HIPAA, and other medical privacy regulations, you have rights including immediate data deletion, access to processing logs, data portability, and the right to restrict processing.</p>
      </div>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg2"><FiUserCheck /></span> Anonymous Processing</h3>
        <p>All medical queries are processed anonymously without personal identification.</p>
      </div>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg3"><FiMail /></span> Contact & Deletion Requests</h3>
        <p>Request immediate deletion of any submitted medical data, access processing records, or report privacy concerns through our secure contact channels.</p>
      </div>
    </section>

    {/* Compliance Section */}
    <section className="policy-section policy-compliance">
      <h2><FiFileText className="main-icon" aria-label="Certificate" /> Healthcare Compliance &amp; Standards</h2>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg4"><FiGlobe /></span> International Standards</h3>
        <ul className="policy-list">
          <li>HIPAA (US), GDPR (EU), PIPEDA (Canada), and other regional medical privacy regulations</li>
        </ul>
      </div>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg5"><FiCheckCircle /></span> Audits & Security</h3>
        <ul className="policy-list">
          <li>Regular compliance audits and security assessments</li>
          <li>SOC 2 Type II compliance and ISO 27001 security standards</li>
          <li>Google Cloud's healthcare compliance framework</li>
        </ul>
      </div>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg6"><FiUser /></span> Staff Training</h3>
        <ul className="policy-list">
          <li>All staff undergo regular privacy training and background checks</li>
        </ul>
      </div>
    </section>

    {/* Data Retention Section */}
    <section className="policy-section policy-retention">
      <h2><FiTrash2 className="main-icon" aria-label="Delete" /> Medical Data Retention &amp; Deletion</h2>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg7"><FiClock /></span> Real-Time Processing</h3>
        <p>Medical queries and responses are processed in real-time and automatically deleted within 24 hours. No personal health information is permanently stored.</p>
      </div>
      <div className="policy-subsection">
        <h3 className="policy-icon-title"><span className="policy-icon policy-bg8"><FiShield /></span> Security Measures</h3>
        <ul className="policy-list">
          <li>Multi-layered security: end-to-end encryption, secure API endpoints, audit trails, and regular security assessments</li>
          <li>Medical data is automatically purged after processing, with no long-term storage of sensitive information</li>
        </ul>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
