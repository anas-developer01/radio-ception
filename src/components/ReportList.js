import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const ReportList = ({ reports = [], onView, onDownload }) => (
  <div className="card p-4 mb-4">
    <h4 className="mb-3">Reports</h4>
    <table className="table table-med">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, idx) => (
          <tr key={idx}>
            <td>{report.patientName}</td>
            <td>{report.date}</td>
            <td>{report.status}</td>
            <td>
              <button className="btn btn-primary btn-sm me-2" onClick={() => onView(report.id)}>View</button>
              <button className="btn btn-success btn-sm" onClick={() => onDownload(report.id)}>Download PDF</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReportList;
