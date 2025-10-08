import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const SubscriptionCard = ({ subscription }) => (
  <div className="card p-4 mb-4">
    <h4 className="mb-3">Subscription Status</h4>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <strong>Plan:</strong> {subscription.plan}<br />
        <strong>Expires:</strong> {subscription.expires}
      </div>
      <span className={`badge ${subscription.active ? 'bg-success' : 'bg-danger'}`}>{subscription.active ? 'Active' : 'Inactive'}</span>
    </div>
  </div>
);

export default SubscriptionCard;
