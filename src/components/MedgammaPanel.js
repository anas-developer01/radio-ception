import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';


const MedgammaPanel = ({ onSend, response }) => (
  <div className="card p-4 mb-4">
    <h4 className="mb-3">Radioception API Panel</h4>
    <form onSubmit={onSend}>
      <div className="mb-3">
        <label className="form-label">Patient Info & X-ray</label>
        <input type="text" className="form-control mb-2" placeholder="Patient Info" name="patientInfo" required />
        <input type="file" className="form-control" accept="image/*" name="xrayImage" required />
      </div>
      <button type="submit" className="btn btn-med">Send to Radioception</button>
    </form>
    {response && (
      <div className="mt-4">
        <h5>API Response:</h5>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    )}
  </div>
);

export default MedgammaPanel;
