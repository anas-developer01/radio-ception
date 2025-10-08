import React, { useState, useEffect } from 'react';
import { StatCard, ProgressCard, RecentActivityCard, QuickActionsCard, AlertsCard } from '../components/DashboardComponents';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const SuperAdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalAdmins: 0,
    newAdminsThisMonth: 0,
    activeAdmins: 0,
    todaysReports: 0,
    todaysReportsPercentChange: 0,
    totalReports: 0,
    systemHealth: 98
  });
  
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/SuperAdminDashboard/dashboard`);
      const data = response.data || {};
      setStats(prev => ({
        ...prev,
        totalAdmins: data.totalAdmins || 0,
        newAdminsThisMonth: data.newAdminsThisMonth || 0,
        activeAdmins: data.activeAdmins || 0,
        todaysReports: data.todaysReports || 0,
        todaysReportsPercentChange: data.todaysReportsPercentChange || 0,
        totalReports: data.totalReports || 0
      }));
      // Optionally fetch recent activity and alerts if needed
      checkSystemAlerts();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({
        totalAdmins: 0,
        newAdminsThisMonth: 0,
        activeAdmins: 0,
        todaysReports: 0,
        todaysReportsPercentChange: 0,
        totalReports: 0,
        systemHealth: 98
      });
    } finally {
      setLoading(false);
    }
  };

  const checkSystemAlerts = () => {
    const alerts = [];
    
    // Check system health
    if (stats.systemHealth < 95) {
      alerts.push({
        type: 'warning',
        icon: 'fas fa-exclamation-triangle',
        title: 'System Performance',
        message: 'System performance is below optimal levels'
      });
    }

    // Check inactive admins
    const inactiveAdmins = stats.totalAdmins - stats.activeAdmins;
    if (inactiveAdmins > 5) {
      alerts.push({
        type: 'info',
        icon: 'fas fa-info-circle',
        title: 'Inactive Admins',
        message: `${inactiveAdmins} admins haven't logged in recently`
      });
    }

    setSystemAlerts(alerts);
  };

  const quickActions = [
    {
      title: 'Add New Admin',
      icon: 'fas fa-user-plus',
      color: 'primary',
      onClick: () => {
        // Navigate to add admin page
        console.log('Navigate to add admin');
      }
    },
    {
      title: 'View All Reports',
      icon: 'fas fa-chart-bar',
      color: 'info',
      onClick: () => {
        // Navigate to reports page
        console.log('Navigate to reports');
      }
    },
    {
      title: 'System Settings',
      icon: 'fas fa-cogs',
      color: 'secondary',
      onClick: () => {
        // Navigate to settings
        console.log('Navigate to settings');
      }
    },
    {
      title: 'Backup System',
      icon: 'fas fa-download',
      color: 'success',
      onClick: () => {
        // Trigger system backup
        console.log('Trigger backup');
      }
    }
  ];

  const handleDismissAlert = (index) => {
    setSystemAlerts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid p-4">
      {/* Page Header */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">SuperAdmin Dashboard</h1>
        <div className="text-muted">
          <small>Last updated: {new Date().toLocaleString()}</small>
        </div>
      </div>

      {/* System Alerts */}
      <AlertsCard alerts={systemAlerts} onDismiss={handleDismissAlert} />

      {/* Statistics Cards Row 1 */}
      <div className="row">
        <StatCard
          title="Total Admins"
          value={stats.totalAdmins}
          icon="fas fa-users"
          color="primary"
          loading={loading}
          trend="up"
          trendValue={stats.newAdminsThisMonth ? `+${stats.newAdminsThisMonth} this month` : undefined}
        />
        <StatCard
          title="Active Admins"
          value={stats.activeAdmins}
          icon="fas fa-user-check"
          color="success"
          loading={loading}
        />
        <StatCard
          title="Today's Reports"
          value={stats.todaysReports}
          icon="fas fa-file-medical"
          color="info"
          loading={loading}
          trend={stats.todaysReportsPercentChange >= 0 ? 'up' : 'down'}
          trendValue={stats.todaysReportsPercentChange !== 0 ? `${stats.todaysReportsPercentChange > 0 ? '+' : ''}${stats.todaysReportsPercentChange}%` : undefined}
        />
        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          icon="fas fa-chart-line"
          color="warning"
          loading={loading}
        />
      </div>

       

       
 
    </div>
  );
};

export default SuperAdminDashboardHome;