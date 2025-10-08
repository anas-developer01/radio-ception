import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const XrayUploadForm = ({ onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [xrayFile, setXrayFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ patientName, patientAge, patientGender, xrayFile });
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-3">Upload X-ray</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input type="text" className="form-control" value={patientName} onChange={e => setPatientName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={patientAge} onChange={e => setPatientAge(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" value={patientGender} onChange={e => setPatientGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">X-ray Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={e => setXrayFile(e.target.files[0])} required />
        </div>
        <button type="submit" className="btn btn-med">Upload & Analyze</button>
      </form>
    </div>
  );
};

export default XrayUploadForm;
