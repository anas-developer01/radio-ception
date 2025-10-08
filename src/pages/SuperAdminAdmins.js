import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/main.css';

const SuperAdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    premium: 0
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Fetch admins from /api/Users
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/Users`);
      // Map API data to local admin structure (exact API response)
      const adminsData = (response.data || []).map(user => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        subscription: user.subscription,
        isActive: user.isActive,
        reports: user.reports,
        createdAt: user.createdAt
      }));
      setAdmins(adminsData);
      calculateStats(adminsData);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setAdmins([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (adminsList) => {
    const total = adminsList.length;
    const active = adminsList.filter(admin => admin.isActive).length;
    const inactive = total - active;
    // Count all users whose subscription is NOT 'Free' as premium
    const premium = adminsList.filter(admin => admin.subscription && admin.subscription.toLowerCase() !== 'free').length;
    setStats({ total, active, inactive, premium });
  };

  // Toggle admin status using /api/Users/{id}/deactivate or PUT /api/Users/{id}
  const handleToggleStatus = async (adminId) => {
    try {
      // Find the admin
      const admin = admins.find(a => a.id === adminId);
      if (!admin) return;
      // If active, deactivate using PATCH /api/Users/{id}/deactivate
      if (admin.isActive) {
        await axios.patch(`${API_BASE_URL}/api/Users/${adminId}/deactivate`);
      } else {
        // If inactive, activate using PUT /api/Users/{id} with isActive: true
        await axios.put(`${API_BASE_URL}/api/Users/${adminId}`, {
          fullName: admin.fullName,
          email: admin.email,
          isActive: true
        });
      }
      // Refresh list
      fetchAdmins();
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  // Optionally, implement delete using DELETE /api/Users/{id} if available
  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/Users/${adminId}`);
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    } catch (error) {
      console.error('Error deleting admin:', error);
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    }
  };

  const filteredAdmins = admins.filter(admin => {
    const name = (admin.fullName || admin.name || '').toLowerCase();
    const email = (admin.email || '').toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
                         email.includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && admin.isActive) ||
                         (filterStatus === 'inactive' && !admin.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Admin Management</h1>
        {/* <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus me-2"></i>
          Add New Admin
        </button> */}
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Admins
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.total}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Active Admins
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.active}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-check fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Inactive Admins
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.inactive}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-times fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Premium Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.premium}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-crown fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Search Admins</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Filter by Status</label>
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Admins</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            <div className="col-md-3 mb-3 d-flex align-items-end">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
              >
                <i className="fas fa-refresh me-2"></i>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Admins List ({filteredAdmins.length} of {admins.length})
          </h6>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subscription</th>
                    <th>Status</th>
                    <th>Reports</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map(admin => (
                    <tr key={admin.id}>
                      <td>{admin.fullName || 'N/A'}</td>
                      <td>{admin.email || 'N/A'}</td>
                      <td>{admin.subscription || 'N/A'}</td>
                      <td>{admin.isActive ? 'Active' : 'Inactive'}</td>
                      <td>{typeof admin.reports === 'number' ? admin.reports : 'N/A'}</td>
                      <td>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        {admin.isActive ? (
                          <button className="btn btn-danger btn-sm" onClick={() => handleToggleStatus(admin.id)}>
                            Deactivate
                          </button>
                        ) : (
                          <button className="btn btn-success btn-sm" onClick={() => handleToggleStatus(admin.id)}>
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAdmins.length === 0 && (
                <div className="text-center py-4">
                  <i className="fas fa-search fa-3x text-gray-300 mb-3"></i>
                  <p className="text-muted">No admins found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAdmins;