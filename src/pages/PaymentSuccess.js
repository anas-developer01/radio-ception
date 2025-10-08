import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import { useNavigate, useLocation } from 'react-router-dom';


const PaymentSuccess = () => {
  console.log('PaymentSuccess component loaded');
  // Removed unused state variable 'subscriptions'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [updatedSubscription, setUpdatedSubscription] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Payment gateway redirects with params: userId, subscriptionId, amount, userEmail, itemName
    const params = new URLSearchParams(location.search);
    const adminUserId = params.get('userId');
    const subscriptionId = params.get('subscriptionId');
    const amount = params.get('amount');
    const userEmail = params.get('userEmail');
    const itemName = params.get('itemName');
    const status = params.get('status');
    if (adminUserId && subscriptionId && status === 'success') {
      console.log('PaymentSuccess params:', { adminUserId, subscriptionId, amount, userEmail, itemName, status });
      // First, create payment record
      axios.post(`${API_BASE_URL}/api/Payments/create`, {
        amount: Number(amount) || 0,
        itemName: itemName || 'Subscription',
        userEmail: userEmail || '',
        userId: Number(adminUserId),
        subscriptionId: Number(subscriptionId)
      })
        .then((paymentRes) => {
          console.log('Payment API response:', paymentRes.data);
          console.log('Payment record created, calling update-subscription...');
          // On payment success, update subscription via Auth API
          return axios.post(`${API_BASE_URL}/api/Auth/update-subscription`, {
            adminUserId: Number(adminUserId),
            subscriptionId: Number(subscriptionId)
          });
        })
        .then((res) => {
          console.log('Subscription updated:', res.data);
          setMessage(res.data.message || 'Subscription updated!');
          setUpdatedSubscription({
            plan: res.data.subscription,
            expiry: res.data.expiry
          });
          setTimeout(() => {
            navigate('/admin');
          }, 3500);
        })
        .catch((err) => {
          console.error('Payment or subscription update failed:', err);
          let errorMsg = 'Payment or subscription update failed. Please contact support.';
          if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
          } else if (err.message) {
            errorMsg = err.message;
          }
          setError(errorMsg);
          setLoading(false);
        });
    } else {
      // fallback if params missing or payment not successful
      navigate('/admin');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Fetch updated subscription status from backend
    fetch(`${API_BASE_URL}/api/Subscription/all`)
      .then(res => res.json())
      .then(data => {
  // Removed setSubscriptions (no longer defined)
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch subscription status.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5 text-center">
      <h2>Payment Successful!</h2>
      {message && <div className="alert alert-success mb-3">{message}</div>}
      {updatedSubscription && (
        <div className="mb-4">
          <h4>Plan: <span className="text-primary">{updatedSubscription.plan}</span></h4>
          <p>Expiry: <b>{new Date(updatedSubscription.expiry).toLocaleString()}</b></p>
        </div>
      )}
      {loading ? <p>Loading subscription status...</p> : error ? <p>{error}</p> : null}
      <div className="mt-3 text-muted">You will be redirected to your dashboard shortly.</div>
    </div>
  );
};

export default PaymentSuccess;
