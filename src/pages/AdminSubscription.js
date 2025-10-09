import React, { useEffect, useState } from 'react';
import { FaLightbulb, FaBriefcase, FaStar } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const AdminSubscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payLoading, setPayLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Subscription/all`);
        setPlans(res.data);
      } catch (err) {
        setError('Failed to load plans.');
      }
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const handleChoose = async (plan) => {
    setSelectedPlan(plan);
    setPayLoading(true);
    setMessage('');
    try {
      // Get admin userId from localStorage
      const auth = JSON.parse(localStorage.getItem('auth'));
      const adminUserId = auth?.userId || auth?.id;
      if (!adminUserId) {
        setMessage('User not found. Please login again.');
        setPayLoading(false);
        return;
      }
      // 1. Create payment (do NOT call subscribe API here)
      const paymentRes = await axios.post(`${API_BASE_URL}/api/Payments/create`, {
        amount: plan.price,
        itemName: plan.name,
        userEmail: auth.email,
        userId: adminUserId,
        subscriptionId: plan.id
      });
      // 2. Redirect to payment URL
      if (paymentRes.data && paymentRes.data.paymentUrl) {
        window.location.href = paymentRes.data.paymentUrl;
      } else {
        setMessage('Payment initiation failed.');
      }
    } catch (err) {
      setMessage('Payment error.');
    }
    setPayLoading(false);
  };

  if (loading) return <div className="text-center py-5">Loading plans...</div>;
  if (error) return <div className="alert alert-danger mt-4 text-center">{error}</div>;

  return (
    <div className="container py-4">
      {/* Modern Hero Card Header */}
      <div className="subscription-hero-card mb-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between shadow-lg rounded-4" style={{background: 'linear-gradient(90deg, #f7fafd 60%, #e3e9f6 100%)'}}>
        <div className="d-flex flex-column align-items-center align-items-md-start flex-grow-1">
          <div className="d-flex align-items-center mb-3">
            <img src={require('../assets/Images/new-logo.jpg')} alt="Radioception Logo" style={{ width: 70, height: 70, borderRadius: '50%', boxShadow: '0 2px 12px #1976d220', background: '#fff', marginRight: 18 }} />
            <h1  className="fw-bold  mb-0" style={{fontSize: '2.1rem', letterSpacing: '0.02em',color:'#073654'}}>Radioception Subscription</h1>
          </div>
          <p className="lead mb-2" style={{maxWidth: 600}}>
            Unlock the full power of Radioception! Choose a plan that fits your clinic or hospital's needs.<br className="d-none d-md-block" />
            <span className="text-secondary">Enjoy secure patient management, fast X-ray uploads, instant reporting, and premium support. Upgrade anytime as your practice grows.</span>
          </p>
        </div>
        <div className="d-none d-md-block ms-4 flex-shrink-0" style={{minWidth: 260}}>
          <div className="bg-white rounded-4 shadow-sm p-3 px-4 text-center" style={{fontSize: '1.08rem'}}>
            <b className="text-primary">Why subscribe?</b>
            <ul className="text-start mt-2 mb-0 ps-3" style={{fontSize: '1rem', lineHeight: 1.7}}>
              <li>✔️ Unlimited patient records & reports</li>
              <li>✔️ Priority support & onboarding</li>
              <li>✔️ Secure cloud storage</li>
              <li>✔️ Access to all Radioception features</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Mobile Why Subscribe */}
      <div className="d-block d-md-none mb-3">
        <div className="bg-white rounded-4 shadow-sm p-3 px-4 text-center" style={{fontSize: '1.08rem'}}>
          <b className="text-primary">Why subscribe?</b>
          <ul className="text-start mt-2 mb-0 ps-3" style={{fontSize: '1rem', lineHeight: 1.7}}>
            <li>✔️ Unlimited patient records & reports</li>
            <li>✔️ Priority support & onboarding</li>
            <li>✔️ Secure cloud storage</li>
            <li>✔️ Access to all Radioception features</li>
          </ul>
        </div>
      </div>
      {message && <div className="alert alert-info text-center w-100" style={{maxWidth: 500}}>{message}</div>}
      <div className="row justify-content-center w-100">
        {plans.map((plan, idx) => {
          // Example features for demo; in real app, use plan.features or similar
          const features = [
            'Unlimited patient records',
            'AI-powered X-ray analysis',
            'Instant PDF reports',
            'Secure cloud storage',
            'Priority support',
          ];
          // Highlight best value or free
          const highlight = plan.price === 0 ? 'Free Forever' : (plan.name.toLowerCase().includes('premium') ? 'Best Value' : null);
          // Professional icon for each plan
          let Icon = FaLightbulb;
          if (plan.name.toLowerCase().includes('premium')) Icon = FaStar;
          else if (plan.name.toLowerCase().includes('standard')) Icon = FaBriefcase;
          return (
            <div className="col-md-4 col-12 mb-4" key={plan.id}>
              <div className={`card h-100 shadow-lg border-0 plan-card position-relative ${selectedPlan && selectedPlan.id === plan.id ? 'border-primary border-2' : ''}`}
                   style={{ borderRadius: 22, overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                {/* Highlight badge */}
                {highlight && (
                  <div className="position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill bg-primary text-white fw-bold shadow-sm" style={{fontSize:'0.98rem', zIndex:2}}>
                    {highlight}
                  </div>
                )}
                <div className="card-body d-flex flex-column align-items-center px-4 py-4">
                  <div className="plan-icon mb-2" style={{fontSize:'2.6rem', color:'#073654'}}>
                    <Icon />
                  </div>
                  <h4 className="card-title mb-2 fw-bold text-dark" >{plan.name}</h4>
                  <h2 className="mb-3 fw-bold" style={{color:'#073654', fontSize:'2rem'}}>
                    {plan.price === 0 ? 'Free' : `Rs ${plan.price}`}
                    <span className="fs-6 ms-1 fw-normal">/ {plan.durationDays} days</span>
                  </h2>
                  <ul className="list-unstyled mb-4 w-100" style={{fontSize:'1.08rem'}}>
                    {features.map((f, i) => (
                      <li key={i} className="d-flex align-items-center mb-2">
                        <span style={{color:'#073654', fontSize:'1.2em', marginRight:8}}>✔️</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary w-100 mt-auto py-2 rounded-pill fw-bold" style={{fontSize:'1.13rem', letterSpacing:'0.01em'}} disabled={payLoading} onClick={() => handleChoose(plan)}>
                    {payLoading && selectedPlan && selectedPlan.id === plan.id ? 'Processing...' : `Choose ${plan.name}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSubscription;
