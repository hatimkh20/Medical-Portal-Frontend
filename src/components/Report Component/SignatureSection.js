import React from 'react';
import './signatureSection.css';

const SignatureSection = ({ signatureImage, doctorName, gmcNumber, date }) => {
  return (
    <section className="report-section">
      <h2 className="report-subtitle">Signature</h2>
      <div className="signature-container">
        <div className="signature-image-container">
          {signatureImage ? (
            <img src={`data:image/png;base64,${signatureImage}`} alt="Doctor's Signature" className="signature-image" />
          ) : (
            <div className="signature-placeholder">Dr's Signature</div>
          )}
        </div>
        <div className="doctor-details report-text">
          <strong>{doctorName}</strong>
          <strong>GMC number: {gmcNumber}</strong>
          <strong>Date: {date}</strong>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
