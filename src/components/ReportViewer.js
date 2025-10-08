import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const ReportViewer = ({ report }) => (
  <div className="card p-4 mb-4">
    <h4 className="mb-3">Report Details</h4>
    {report ? (
      <div>
        <p><strong>Patient:</strong> {report.patientName}</p>
        <p><strong>Date:</strong> {report.date}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <p><strong>Findings:</strong> {report.findings}</p>
        <a href={report.pdfUrl} className="btn btn-success btn-med" target="_blank" rel="noopener noreferrer">Download PDF</a>
      </div>
    ) : (
      <p>No report selected.</p>
    )}
  </div>
);

export default ReportViewer;
