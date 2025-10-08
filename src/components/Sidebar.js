
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const adminLinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/subscription', label: 'Subscription' },
  { to: '/admin/upload', label: 'Upload Radio' },
  // { to: '/admin/reports', label: 'Reports' },
  // { to: '/admin/medgamma-api', label: 'HealthHub Services' },
  // { to: '/admin/report-download', label: 'Report Download' },
];

const superadminLinks = [
  { to: '/superadmin', label: 'Dashboard' },
  { to: '/superadmin/admins', label: 'Manage Admins' },
  { to: '/superadmin/subscription', label: 'Subscription' },
  { to: '/superadmin/upload', label: 'Upload Radio' },
  // { to: '/superadmin/analytics', label: 'Analytics' },
  // { to: '/superadmin/settings', label: 'Settings' },
];

const Sidebar = ({ role }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Show hamburger on mobile
  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  // Links to render
  const links = role === 'superadmin' ? superadminLinks : adminLinks;

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="sidebar-hamburger d-md-none"
        aria-label="Open sidebar menu"
        onClick={handleToggle}
        style={{ position: 'fixed', top: 18, left: 16, zIndex: 1001, background: 'none', border: 'none', padding: 0 }}
      >
        <span style={{ display: 'inline-block', width: 32, height: 32 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect y="7" width="32" height="3.5" rx="1.5" fill="#0d6efd" />
            <rect y="14" width="32" height="3.5" rx="1.5" fill="#0d6efd" />
            <rect y="21" width="32" height="3.5" rx="1.5" fill="#0d6efd" />
          </svg>
        </span>
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`sidebar-overlay d-md-none${open ? ' show' : ''}`}
        onClick={handleClose}
        style={{ display: open ? 'block' : 'none' }}
      />

      {/* Sidebar itself */}
      <nav
        className={`sidebar${open ? ' open' : ''}`}
        tabIndex="-1"
        aria-label="Sidebar navigation"
        style={open ? { left: 0 } : {}}
      >
        <div className="sidebar-header">
          <img src={require('../assets/Images/new-logo.png')} alt="HealthHub" className="sidebar-logo mb-3 mt-3" style={{ width: 84, height: 84, border: 'none' }} />
          <h5>HealthHub</h5>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
                onClick={handleClose}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
