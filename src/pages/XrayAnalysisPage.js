import React, { useState } from 'react';
import MedicalQuestionnaireForm from '../components/MedicalQuestionnaireForm';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const XrayAnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setDownloadUrl(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append the image file
      if (formData.xrayFile) {
        submitData.append('xrayImage', formData.xrayFile);
      }

      // Append all other form data as JSON
      const questionnaireData = {
        patientInfo: formData.patientInfo,
        clinicalIndication: formData.clinicalIndication,
        medicalHistory: formData.medicalHistory,
        riskFactors: formData.riskFactors,
        contrastStudies: formData.contrastStudies,
        modalitySpecific: formData.modalitySpecific,
        clinicalQuestion: formData.clinicalQuestion
      };

      submitData.append('questionnaireData', JSON.stringify(questionnaireData));

      // Submit to MedGamma API
      const response = await axios.post(`${API_BASE_URL}/api/MedGamma/analyze-xray`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout
      });

      if (response.data) {
        setAnalysisResult(response.data);
        
        // If the API returns a PDF or download link, set it
        if (response.data.reportUrl || response.data.pdfData) {
          setDownloadUrl(response.data.reportUrl || response.data.pdfData);
        }
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'An error occurred while processing your request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!analysisResult) return;

    try {
      // If we have a direct download URL
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
        return;
      }

      // Otherwise, generate PDF from analysis result
      const pdfResponse = await axios.post(`${API_BASE_URL}/api/MedGamma/generate-pdf`, {
        analysisData: analysisResult
      }, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Create blob and download
      const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `xray-analysis-report-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error downloading report:', err);
      setError('Failed to download report. Please try again.');
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="mb-4">
            <h2 className="text-primary">X-ray Analysis with Medical Questionnaire</h2>
            <div className="mt-2">
              <span style={{fontWeight:600, color:'#555', fontSize:'1.15rem'}}>If you want better results, please fill out this form completely.</span><br />
              <span style={{color:'red', fontSize:'1.08rem'}}>This form is required for best AI analysis.</span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Error:</strong> {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Success Alert with Results */}
          {analysisResult && (
            <div className="alert alert-success mb-4" role="alert">
              <h5 className="alert-heading">
                <i className="bi bi-check-circle-fill me-2"></i>
                Analysis Complete!
              </h5>
              <p className="mb-3">Your X-ray has been successfully analyzed. The AI has processed the medical questionnaire and image.</p>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Analysis ID: {analysisResult.analysisId || 'N/A'} | 
                  Processed at: {new Date().toLocaleString()}
                </small>
                <button 
                  className="btn btn-success btn-sm" 
                  onClick={handleDownloadReport}
                >
                  <i className="bi bi-download me-1"></i>
                  Download Report (PDF)
                </button>
              </div>
            </div>
          )}



          {/* Questionnaire Form */}
          <div id="questionnaire-form-section">
            <MedicalQuestionnaireForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading}
            />
          </div>



          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-clipboard-data me-2"></i>
                  Analysis Results
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {analysisResult.findings && (
                    <div className="col-md-6 mb-3">
                      <h6 className="text-primary">Key Findings:</h6>
                      <p className="mb-0">{analysisResult.findings}</p>
                    </div>
                  )}
                  {analysisResult.impression && (
                    <div className="col-md-6 mb-3">
                      <h6 className="text-primary">Clinical Impression:</h6>
                      <p className="mb-0">{analysisResult.impression}</p>
                    </div>
                  )}
                  {analysisResult.recommendations && (
                    <div className="col-12 mb-3">
                      <h6 className="text-primary">Recommendations:</h6>
                      <p className="mb-0">{analysisResult.recommendations}</p>
                    </div>
                  )}
                  {analysisResult.confidence && (
                    <div className="col-12">
                      <h6 className="text-primary">Confidence Level:</h6>
                      <div className="progress" style={{ height: '25px' }}>
                        <div 
                          className="progress-bar bg-info" 
                          role="progressbar" 
                          style={{ width: `${analysisResult.confidence}%` }}
                          aria-valuenow={analysisResult.confidence} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          {analysisResult.confidence}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="card mt-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Instructions
              </h6>
            </div>
            <div className="card-body">
              <ol className="mb-0">
                <li>Complete all required fields in the medical questionnaire above</li>
                <li>Upload a clear X-ray image (JPEG, PNG, or DICOM format)</li>
                <li>Review your entries before submitting</li>
                <li>Click "Submit for Analysis" to process your request</li>
                <li>Once analysis is complete, download the detailed PDF report</li>
              </ol>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default XrayAnalysisPage;