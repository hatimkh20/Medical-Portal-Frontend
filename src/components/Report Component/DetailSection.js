// DetailsSection.js
import React from 'react';
import './detailSection.css';

const DetailsSection = ({ title, details, layout }) => {
  return (
    <section className="report-section">
      {title && <h2 className="report-subtitle">{title}</h2>}
      <div className={`details-container ${layout}`}>
        {details.map((detail, index) => (
          <p 
            key={index} 
            className={`report-text ${detail.inline ? 'inline' : 'block'}`}
          >
            <strong>{detail.label}:</strong> <span>{detail.value}</span> 
          </p>
        ))}
      </div>
    </section>
  );
};

export default DetailsSection;
