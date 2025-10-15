import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import logo from '../assets/Images/new-logo.jpg'; // Correct path for logo
import ReactMarkdown from 'react-markdown';
import MedicalQuestionnaireForm from '../components/MedicalQuestionnaireForm';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const AdminUpload = () => {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef();
  // Download the visible result as PDF
  const handleDownloadPdf = () => {
    if (!analysisResult) return;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    // Draw a colored header bar
    doc.setFillColor(7, 54, 84); // #073654
    doc.rect(0, 0, 595.28, 70, 'F');

    // Add logo (medium size, on header)
    const img = new window.Image();
    img.src = logo;
    img.onload = function () {
      doc.addImage(img, 'PNG', 40, 11, 48, 48); // medium size
      // White text for title
      doc.setTextColor(255,255,255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Radioception - Medical Imaging & Analysis Platform', 120, 45);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Generated: ' + new Date().toLocaleString(), 400, 60);

      // Reset text color for content
      doc.setTextColor(33,33,33);

      // Draw a white rounded rectangle for the report content
      doc.setFillColor(255,255,255);
      doc.roundedRect(30, 90, 535, 700, 12, 12, 'F');

      // Extract and clean the model text
      let modelText = '';
      try {
        if (analysisResult.rawResponse) {
          const raw = JSON.parse(analysisResult.rawResponse);
          modelText = raw?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch (e) {}
      if (!modelText && analysisResult.result) modelText = analysisResult.result;
      if (!modelText) modelText = JSON.stringify(analysisResult, null, 2);

      // Replace all emoji/icons and markdown bullets with a simple bullet (•)
      modelText = modelText
        .replace(/[🔹◆◇♦▪◦❖❑❒❏❐❯❱❲❳]/g, '•') // emoji/icons
        .replace(/^\s*([-*+])\s+/gm, '• ') // markdown bullets
        .replace(/\u2022/g, '•') // unicode bullet
        // Remove duplicate bullets before headings
        .replace(/(^|\n)•+\s*\*\*([^\n]+?)\*\*/g, '$1**$2**')
        // Remove duplicate bullets before headings (for #, ##, etc)
        .replace(/(^|\n)•+\s*#+\s*([^\n]+)/g, '$1$2')
        // Remove any remaining non-ASCII characters (to avoid PDF corruption)
        .replace(/[^\x20-\x7E\r\n•*]/g, '');

      // Split into lines and print inside the content box
      const lines = modelText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      let y = 120;
      const maxWidth = 495; // width of content box
      for (let line of lines) {
        // Detect markdown headings (bold or ##, #)
        let isHeading = false;
        let cleanLine = line;
        // Bold headings: **Heading**
        if (/^\*\*[^*]+\*\*$/.test(line)) {
          isHeading = true;
          cleanLine = line.replace(/^\*\*([^*]+)\*\*$/, '$1');
        }
        // Markdown # or ## heading
        if (/^#+\s+/.test(line)) {
          isHeading = true;
          cleanLine = line.replace(/^#+\s+/, '');
        }
        const wrapped = doc.splitTextToSize(cleanLine, maxWidth);
        for (let wline of wrapped) {
          if (y > 770) {
            doc.addPage();
            y = 60;
          }
          if (isHeading) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.text(wline, 60, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
          } else {
            doc.text(wline, 60, y);
          }
          y += 18;
        }
      }
      doc.save('AI-Analysis-Report.pdf');
    };
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // 1. Prepare summary text from all form fields
      const summaryLines = [];
      if (formData.patientInfo) {
        Object.entries(formData.patientInfo).forEach(([k, v]) => summaryLines.push(`${k}: ${v}`));
      }
      if (formData.clinicalIndication) {
        Object.entries(formData.clinicalIndication).forEach(([k, v]) => summaryLines.push(`${k}: ${v}`));
      }
      if (formData.medicalHistory) {
        Object.entries(formData.medicalHistory).forEach(([k, v]) => summaryLines.push(`${k}: ${v}`));
      }
      if (formData.riskFactors) {
        Object.entries(formData.riskFactors).forEach(([k, v]) => summaryLines.push(`${k}: ${v}`));
      }
      if (formData.contrastStudies) {
        Object.entries(formData.contrastStudies).forEach(([k, v]) => summaryLines.push(`${k}: ${v}`));
      }
      if (formData.modalitySpecific) {
        Object.entries(formData.modalitySpecific).forEach(([k, v]) => summaryLines.push(`${k}: ${v}`));
      }
      if (formData.clinicalQuestion) {
        summaryLines.push(`Clinical Question: ${formData.clinicalQuestion}`);
      }
      const summaryText = summaryLines.join('\n');

      // 2. Append fields for API
      submitData.append('Text', summaryText);
      if (formData.xrayFile) {
        submitData.append('Image', formData.xrayFile);
      }

      // 3. Submit to VertexAiMedical API with userId as query param
      const auth = JSON.parse(localStorage.getItem('auth'));
      const userId = auth?.userId || auth?.id;
      const url = userId
        ? `${API_BASE_URL}/api/VertexAiMedical/generate?userId=${userId}`
        : `${API_BASE_URL}/api/VertexAiMedical/generate`;
      const response = await axios.post(url, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout
      });

      if (response.data) {
        setAnalysisResult(response.data);
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      if (err.response?.status === 400) {
        setError('Your free limit is over! Upgrade now and enjoy unlimited access to this feature.');
        setShowLimitModal(true);
      } else {
        setError(
          err.response?.data?.message || 
          err.message || 
          'An error occurred while processing your request. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };


  // Main render
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className=" ">If you want better results, fill out this form completely</h2>
            <div className="text-muted">
              <small>This form is required for best AI analysis</small>
            </div>
          </div>

          {/* Error Alert: only show for non-limit errors */}
          {error && error !== 'Your free limit is over! Upgrade now and enjoy unlimited access to this feature.' && (
            <div className="alert alert-danger">{error}</div>
          )}

          {/* Free limit modal */}
          <Modal show={showLimitModal} onHide={() => setShowLimitModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Upgrade Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <h5 className="mb-3 ">Your free limit is over!</h5>
                <p>Upgrade now and enjoy unlimited access to this feature.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowLimitModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> 
          {/* Questionnaire Form */}
          <MedicalQuestionnaireForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading}
          />


          {/* Analysis Result (below the form and loader) */}
          {analysisResult && (
            <div className="card mb-4 mt-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">AI Analysis Result</h5>
                <button className="btn btn-outline-primary btn-sm" onClick={handleDownloadPdf}>
                  <i className="bi bi-download me-1"></i>Download as PDF
                </button>
              </div>
              <div className="card-body" ref={resultRef} style={{background:'#fff'}}>
                {/* Parse and show model result if available */}
                {(() => {
                  let modelText = '';
                  try {
                    if (analysisResult.rawResponse) {
                      const raw = JSON.parse(analysisResult.rawResponse);
                      modelText = raw?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    }
                  } catch (e) {}
                  if (!modelText && analysisResult.result) modelText = analysisResult.result;
                  if (!modelText) modelText = JSON.stringify(analysisResult, null, 2);
                  return <ReactMarkdown>{modelText}</ReactMarkdown>;
                })()}
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
                <li>Upload a clear radiographic image (JPEG, PNG, or DICOM format)</li>
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
}

export default AdminUpload;
