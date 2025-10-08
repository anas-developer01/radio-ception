import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const AdminList = ({ admins = [], onDeactivate }) => (
  <div className="card p-4 mb-4">
    <h4 className="mb-3">Admins</h4>
    <div className="table-responsive-custom">
      <table className="table table-med">
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
          {admins.map((admin, idx) => (
            <tr key={idx}>
              <td>{admin.fullName}</td>
              <td>{admin.email}</td>
              <td>{admin.subscription}</td>
              <td>{admin.isActive ? 'Active' : 'Inactive'}</td>
              <td>{admin.reports}</td>
              <td>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : ''}</td>
              <td>
                {admin.isActive && (
                  <button className="btn btn-danger btn-sm" onClick={() => onDeactivate(admin.id)}>
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminList;
