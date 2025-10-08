
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../utils/apiConfig';

const AdminDashboardHome = () => {
  // Removed unused state variables

  const [dashboard, setDashboard] = useState({
    subscriptionPlan: '',
    todaysTotalReports: 0,
    totalReports: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debug: log all localStorage keys/values
    console.log('localStorage contents:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(key, localStorage.getItem(key));
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Get admin email from localStorage (from login data)
      const authData = localStorage.getItem('auth');
      let email = '';
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          email = parsed.email;
        } catch (e) {
          // fallback: do nothing
        }
      }
      if (!email) {
        throw new Error('Admin email not found. Please login again.');
      }
      // Use imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/api/AdminDashboard/dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      setDashboard({
        subscriptionPlan: data.subscriptionPlan || 'None',
        todaysTotalReports: data.todaysTotalReports || 0,
        totalReports: data.totalReports || 0
      });
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      setDashboard({
        subscriptionPlan: 'N/A',
        todaysTotalReports: 0,
        totalReports: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Admin Dashboard</h1>
        <div className="text-muted">
          <small>Last updated: {new Date().toLocaleString()}</small>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Subscription Plan
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? 'Loading...' : dashboard.subscriptionPlan || 'N/A'}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                Today's Total Reports
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? 'Loading...' : dashboard.todaysTotalReports}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Total Reports
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? 'Loading...' : dashboard.totalReports}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHome;
