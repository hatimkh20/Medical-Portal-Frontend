// MedicalReport.js
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './medicalReport.css';

const MedicalReport = ({ data }) => {
  const generatePdf = () => {
    const input = document.getElementById('report-container');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calculate the required height for the PDF
      const pdfHeight = imgHeight > 297 ? imgHeight : 297; // Ensure a minimum height of 297mm (A4 size)

      // Create a new PDF with the calculated height
      const pdfCanvas = new jsPDF('p', 'mm', [pdfHeight, imgWidth]);

      pdfCanvas.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdfCanvas.save('report.pdf');
    });
  };

  return (
    <div className="report-wrapper">
      <div id="report-container" className="report-container">
        <header className="report-header">
          <h1 className="report-title">Medical Report</h1>
        </header>
        <section className="report-section">
          <div className="report-claimant-details">
            <div className="report-claimant-details-title">Claimant's Details</div>
            <p className="report-text"><strong>Full Name:</strong> {data.name}</p>
            <p className="report-text"><strong>Date of Birth:</strong> {data.dob}</p>
            <p className="report-text"><strong>Address:</strong> {data.address}</p>
            <p className="report-text"><strong>Occupation:</strong> {data.occupation}</p>
            <p className="report-text"><strong>Medical Records:</strong> {data.medicalRecords}</p>
            <p className="report-text"><strong>Date of Accident:</strong> {data.dateOfAccident}</p>
            <p className="report-text"><strong>Date of Examination:</strong> {data.dateOfExamination}</p>
            <p className="report-text"><strong>Duration of Examination:</strong> {data.durationOfExamination}</p>
            <p className="report-text"><strong>Instructing Party:</strong> {data.instructingParty}</p>
            <p className="report-text"><strong>Agency:</strong> {data.agency}</p>
          </div>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Accident Details</h2>
          <p className="report-text"><strong>Claimant Reported:</strong> {data.accidentResponse}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Symptoms Details</h2>
          {data.symptoms.map((symptom, index) => (
            <p key={index} className="report-text">
              <strong>Area:</strong> {symptom.area}, 
              <strong> Symptoms:</strong> {symptom.symptoms}, 
              <strong> Severity:</strong> {symptom.severity}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Treatment Details</h2>
          {data.treatment.map((treat, index) => (
            <p key={index} className="report-text">
              <strong>Treatment:</strong> {treat.treatment}, 
              <strong> Details:</strong> {treat.details}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Employment/Education Details</h2>
          <p className="report-text"><strong>Current Employment Status:</strong> {data.employmentStatus}</p>
          <p className="report-text"><strong>Missed Work Days:</strong> {data.missedWorkDays}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Domestic Impact Details</h2>
          {data.domesticImpact.map((impact, index) => (
            <p key={index} className="report-text">
              <strong>Activity:</strong> {impact.activity}, 
              <strong> Impact:</strong> {impact.impact}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Past Medical History</h2>
          <p className="report-text"><strong>Injuries:</strong> {data.pastInjuries}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">General Observation</h2>
          <p className="report-text"><strong>Observation:</strong> {data.generalObservation}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Physical Examination</h2>
          {data.physicalExamination.map((exam, index) => (
            <p key={index} className="report-text">
              <strong>Area:</strong> {exam.area}, 
              <strong> Observations:</strong> {exam.observations}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Diagnosis - Physical Injuries</h2>
          {data.physicalDiagnosis.map((diagnosis, index) => (
            <p key={index} className="report-text">
              <strong>Injury:</strong> {diagnosis.injury}, 
              <strong> Details:</strong> {diagnosis.details}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Diagnosis - Psychological Injuries</h2>
          {data.psychologicalDiagnosis.map((diagnosis, index) => (
            <p key={index} className="report-text">
              <strong>Injury:</strong> {diagnosis.injury}, 
              <strong> Details:</strong> {diagnosis.details}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Opinion</h2>
          <p className="report-text">{data.opinion}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Prognosis - Physical Injuries</h2>
          {data.physicalPrognosis.map((prognosis, index) => (
            <p key={index} className="report-text">
              <strong>Prognosis:</strong> {prognosis.details}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Prognosis - Psychological Injuries</h2>
          {data.psychologicalPrognosis.map((prognosis, index) => (
            <p key={index} className="report-text">
              <strong>Prognosis:</strong> {prognosis.details}
            </p>
          ))}
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Further Treatment and Rehabilitation</h2>
          <p className="report-text">{data.furtherTreatment}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Statement of Truth</h2>
          <p className="report-text">{data.statementOfTruth}</p>
        </section>
        <section className="report-section">
          <h2 className="report-subtitle">Signature</h2>
          <p className="report-text"><strong>Signed By:</strong> {data.signedBy}</p>
        </section>
      </div>
      <button onClick={generatePdf} className="report-download-button">Download PDF</button>
    </div>
  );
};

export default MedicalReport;
