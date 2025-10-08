import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const MedicalQuestionnaireForm = ({ onSubmit, isLoading }) => {
  // Patient Information
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [occupation, setOccupation] = useState('');
  const [exposureDetails, setExposureDetails] = useState('');

  // Clinical Indication
  const [primaryComplaint, setPrimaryComplaint] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('');

  // Relevant Medical History
  const [previousImaging, setPreviousImaging] = useState('');
  const [majorDiagnoses, setMajorDiagnoses] = useState('');
  const [pastSurgeries, setPastSurgeries] = useState('');
  const [traumaHistory, setTraumaHistory] = useState('');

  // Risk Factors / Lifestyle
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholUse, setAlcoholUse] = useState('');
  const [drugUse, setDrugUse] = useState('');
  const [hypertension, setHypertension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [cardiacDisease, setCardiacDisease] = useState(false);
  const [renalImpairment, setRenalImpairment] = useState(false);

  // For Contrast Studies
  const [contrastAllergy, setContrastAllergy] = useState('');
  const [renalFunction, setRenalFunction] = useState('');
  const [metforminUse, setMetforminUse] = useState(false);

  // Modality-Specific Flags
  const [studyType, setStudyType] = useState('');
  const [traumaIndicator, setTraumaIndicator] = useState(false);
  const [suspectedCondition, setSuspectedCondition] = useState('');
  const [implants, setImplants] = useState('');
  const [pregnancyStatus, setPregnancyStatus] = useState('');

  // Focused Clinical Question
  const [clinicalQuestion, setClinicalQuestion] = useState('');

  // X-ray Image
  const [xrayFile, setXrayFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Helper function to only include non-empty fields
    const getFilledFields = (obj) => {
      const result = {};
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value !== '' && value !== null && value !== undefined && value !== false) {
          // Convert everything to string except booleans (convert them to string too)
          if (typeof value === 'boolean') {
            result[key] = value ? 'Yes' : 'No';
          } else {
            result[key] = String(value);
          }
        }
      });
      return Object.keys(result).length > 0 ? result : undefined;
    };

    // Build form data with only filled fields
    const formData = {};

    // Patient Information - only include filled fields
    const patientInfo = getFilledFields({
  name,
  age,
  sex,
  occupation,
  exposureDetails
    });
    if (patientInfo) formData.patientInfo = patientInfo;

    // Clinical Indication - only include filled fields
    const clinicalIndication = getFilledFields({
      primaryComplaint,
      symptomDuration,
      provisionalDiagnosis
    });
    if (clinicalIndication) formData.clinicalIndication = clinicalIndication;

    // Medical History - only include filled fields
    const medicalHistory = getFilledFields({
      previousImaging,
      majorDiagnoses,
      pastSurgeries,
      traumaHistory
    });
    if (medicalHistory) formData.medicalHistory = medicalHistory;

    // Risk Factors - only include filled fields
    const riskFactors = getFilledFields({
      smokingStatus,
      alcoholUse,
      drugUse,
      hypertension,
      diabetes,
      cardiacDisease,
      renalImpairment
    });
    if (riskFactors) formData.riskFactors = riskFactors;

    // Contrast Studies - only include filled fields
    const contrastStudies = getFilledFields({
      contrastAllergy,
      renalFunction,
      metforminUse
    });
    if (contrastStudies) formData.contrastStudies = contrastStudies;

    // Modality Specific - only include filled fields
    const modalitySpecific = getFilledFields({
      studyType,
      traumaIndicator,
      suspectedCondition,
      implants,
      pregnancyStatus
    });
    if (modalitySpecific) formData.modalitySpecific = modalitySpecific;

    // Clinical Question - always include if filled
    if (clinicalQuestion.trim() !== '') {
      formData.clinicalQuestion = clinicalQuestion.trim();
    }

    // X-ray File - always include
    if (xrayFile) {
      formData.xrayFile = xrayFile;
    }

    console.log('Form Data to be sent:', formData); // For debugging

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-4 text-primary">Medical Questionnaire & X-ray Upload</h4>
      <form onSubmit={handleSubmit}>
        
        {/* Patient Information */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">1. Patient Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Enter patient name"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Age</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={age} 
                  onChange={e => setAge(e.target.value)} 
                  min="0"
                  max="150"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Sex</label>
                <select 
                  className="form-select" 
                  value={sex} 
                  onChange={e => setSex(e.target.value)} 
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Occupation</label>
              <input 
                type="text" 
                className="form-control" 
                value={occupation} 
                onChange={e => setOccupation(e.target.value)} 
                placeholder="e.g., Healthcare worker, Miner"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Relevant Exposure (Smoker, Mining, etc.)</label>
              <textarea 
                className="form-control" 
                value={exposureDetails} 
                onChange={e => setExposureDetails(e.target.value)} 
                rows="2"
                placeholder="Detail any relevant occupational or environmental exposures"
              />
            </div>
          </div>
        </div>

        {/* Clinical Indication */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">2. Clinical Indication</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Primary Complaint</label>
              <input 
                type="text" 
                className="form-control" 
                value={primaryComplaint} 
                onChange={e => setPrimaryComplaint(e.target.value)} 
                placeholder="e.g., Chest pain, Headache, Trauma, Abdominal pain"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration of Symptoms</label>
              <input 
                type="text" 
                className="form-control" 
                value={symptomDuration} 
                onChange={e => setSymptomDuration(e.target.value)} 
                placeholder="e.g., 3 days, 2 weeks, 1 month"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Referring Physician's Provisional Diagnosis</label>
              <textarea 
                className="form-control" 
                value={provisionalDiagnosis} 
                onChange={e => setProvisionalDiagnosis(e.target.value)} 
                rows="2"
                placeholder="Clinical query or suspected diagnosis"
              />
            </div>
          </div>
        </div>

        {/* Relevant Medical History */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">3. Relevant Medical History</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Previous Imaging Findings</label>
              <textarea 
                className="form-control" 
                value={previousImaging} 
                onChange={e => setPreviousImaging(e.target.value)} 
                rows="2"
                placeholder="Previous X-rays, CT, MRI findings if available"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Major Diagnoses</label>
              <textarea 
                className="form-control" 
                value={majorDiagnoses} 
                onChange={e => setMajorDiagnoses(e.target.value)} 
                rows="2"
                placeholder="Cancer, TB, chronic lung disease, neurological disorder, metabolic disease"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Past Surgeries in Relevant Region</label>
              <textarea 
                className="form-control" 
                value={pastSurgeries} 
                onChange={e => setPastSurgeries(e.target.value)} 
                rows="2"
                placeholder="Any previous surgeries in the area being imaged"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Trauma History</label>
              <textarea 
                className="form-control" 
                value={traumaHistory} 
                onChange={e => setTraumaHistory(e.target.value)} 
                rows="2"
                placeholder="Recent or past trauma relevant to current symptoms"
              />
            </div>
          </div>
        </div>

        {/* Risk Factors / Lifestyle */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">4. Risk Factors / Lifestyle</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Smoking Status</label>
                <select 
                  className="form-select" 
                  value={smokingStatus} 
                  onChange={e => setSmokingStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Former">Former smoker</option>
                  <option value="Current">Current smoker</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Alcohol Use</label>
                <select 
                  className="form-select" 
                  value={alcoholUse} 
                  onChange={e => setAlcoholUse(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="None">None</option>
                  <option value="Occasional">Occasional</option>
                  <option value="Regular">Regular</option>
                  <option value="Heavy">Heavy</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Drug Use</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={drugUse} 
                  onChange={e => setDrugUse(e.target.value)} 
                  placeholder="Current medications or illicit drug use"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={hypertension} 
                    onChange={e => setHypertension(e.target.checked)} 
                    id="hypertension"
                  />
                  <label className="form-check-label" htmlFor="hypertension">
                    Hypertension
                  </label>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={diabetes} 
                    onChange={e => setDiabetes(e.target.checked)} 
                    id="diabetes"
                  />
                  <label className="form-check-label" htmlFor="diabetes">
                    Diabetes
                  </label>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={cardiacDisease} 
                    onChange={e => setCardiacDisease(e.target.checked)} 
                    id="cardiacDisease"
                  />
                  <label className="form-check-label" htmlFor="cardiacDisease">
                    Cardiac Disease
                  </label>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={renalImpairment} 
                    onChange={e => setRenalImpairment(e.target.checked)} 
                    id="renalImpairment"
                  />
                  <label className="form-check-label" htmlFor="renalImpairment">
                    Renal Impairment
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Contrast Studies */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">5. For Contrast Studies</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">History of Contrast Allergy</label>
                <select 
                  className="form-select" 
                  value={contrastAllergy} 
                  onChange={e => setContrastAllergy(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="None">No known allergies</option>
                  <option value="Mild">Mild reaction history</option>
                  <option value="Severe">Severe reaction history</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Renal Function (Creatinine/eGFR)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={renalFunction} 
                  onChange={e => setRenalFunction(e.target.value)} 
                  placeholder="Recent creatinine/eGFR value if available"
                />
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-check mt-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={metforminUse} 
                    onChange={e => setMetforminUse(e.target.checked)} 
                    id="metforminUse"
                  />
                  <label className="form-check-label" htmlFor="metforminUse">
                    Currently taking Metformin
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modality-Specific Flags */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">6. Modality-Specific Flags</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Study Type</label>
                <select 
                  className="form-select" 
                  value={studyType} 
                  onChange={e => setStudyType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="X-ray">X-ray</option>
                  <option value="CT">CT Scan</option>
                  <option value="MRI">MRI</option>
                  <option value="Ultrasound">Ultrasound</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-check mt-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={traumaIndicator} 
                    onChange={e => setTraumaIndicator(e.target.checked)} 
                    id="traumaIndicator"
                  />
                  <label className="form-check-label" htmlFor="traumaIndicator">
                    Trauma case (suspected fracture, infection, or tumor)
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Suspected Condition</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={suspectedCondition} 
                  onChange={e => setSuspectedCondition(e.target.value)} 
                  placeholder="e.g., Fracture, infection, tumor"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Implants/Devices (for MRI)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={implants} 
                  onChange={e => setImplants(e.target.value)} 
                  placeholder="Pacemaker, clips, prostheses, etc."
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Pregnancy Status (if relevant)</label>
              <select 
                className="form-select" 
                value={pregnancyStatus} 
                onChange={e => setPregnancyStatus(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Not pregnant">Not pregnant</option>
                <option value="Pregnant">Pregnant</option>
                <option value="Unknown">Unknown</option>
                <option value="Not applicable">Not applicable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Focused Clinical Question */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">7. Focused Clinical Question</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Clinical Request</label>
              <textarea 
                className="form-control" 
                value={clinicalQuestion} 
                onChange={e => setClinicalQuestion(e.target.value)} 
                rows="3"
                placeholder="e.g., 'Rule out pulmonary embolism', 'Assess for liver metastasis', 'Evaluate cause of persistent headache'"
              />
            </div>
            <div className="alert alert-info">
              <strong>Examples:</strong>
              <ul className="mb-0 mt-2">
                <li>"Rule out pulmonary embolism"</li>
                <li>"Assess for liver metastasis"</li>
                <li>"Evaluate cause of persistent headache"</li>
                <li>"Check for pneumonia or pleural effusion"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* X-ray Image Upload */}
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">8. X-ray Image Upload</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">X-ray Image</label>
              <input 
                type="file" 
                className="form-control" 
                accept="image/*,.dcm" 
                onChange={e => setXrayFile(e.target.files[0])} 
                required
              />
              <div className="form-text">
                Accepted formats: JPEG, PNG, DICOM (.dcm). Maximum file size: 10MB
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid">
          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              'Submit for Analysis'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalQuestionnaireForm;