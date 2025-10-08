import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatCard = ({ title, value, icon, color = 'primary', trend, trendValue, loading = false }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  value
                )}
              </div>
              {trend && trendValue && (
                <div className={`text-xs mt-1 ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  <i className={`fas fa-arrow-${trend} me-1`}></i>
                  {trendValue}
                </div>
              )}
            </div>
            <div className="col-auto">
              <i className={`${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressCard = ({ title, value, maxValue, color = 'primary', loading = false }) => {
  const percentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
  
  return (
    <div className="col-xl-4 col-md-6 mb-4">
      <div className="card shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                    {loading ? '...' : `${value}/${maxValue}`}
                  </div>
                </div>
                <div className="col">
                  <div className="progress progress-sm mr-2">
                    <div 
                      className={`progress-bar bg-${color}`} 
                      role="progressbar"
                      style={{ width: `${percentage}%` }}
                      aria-valuenow={percentage} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted">{percentage}% of limit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentActivityCard = ({ activities, loading = false }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Recent Activity</h6>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : activities && activities.length > 0 ? (
          <div className="list-group list-group-flush">
            {activities.map((activity, index) => (
              <div key={index} className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold text-dark">{activity.title}</div>
                    <small className="text-muted">{activity.description}</small>
                  </div>
                  <small className="text-muted">{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted">
            <i className="fas fa-inbox fa-3x mb-3"></i>
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

const QuickActionsCard = ({ actions }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
      </div>
      <div className="card-body">
        <div className="row">
          {actions.map((action, index) => (
            <div key={index} className="col-md-6 mb-3">
              <button 
                className={`btn btn-${action.color} btn-block w-100`}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                <i className={`${action.icon} me-2`}></i>
                {action.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AlertsCard = ({ alerts, onDismiss }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-warning">System Alerts</h6>
      </div>
      <div className="card-body">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <i className={`${alert.icon} me-2`}></i>
            <strong>{alert.title}:</strong> {alert.message}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => onDismiss && onDismiss(index)}
              aria-label="Close"
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { StatCard, ProgressCard, RecentActivityCard, QuickActionsCard, AlertsCard };