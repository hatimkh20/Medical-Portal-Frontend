// MedicalReport.js
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './medicalReport.css';
import DetailsSection from './DetailSection';
import TableSection from './TableSection';

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
        
        <DetailsSection 
          title="Claimant's Details"
          layout="two-rows"
          details={[
            { label: 'Full Name', value: data.name, inline: true },
            { label: 'Date of Birth', value: data.dob, inline: true },
            { label: 'Address', value: data.address, inline: true },
            { label: 'Occupation', value: data.occupation, inline: true },
            { label: 'Medical Records', value: data.medicalRecords, inline: true },
            { label: 'Date of Accident', value: data.dateOfAccident, inline: true },
            { label: 'Date of Examination', value: data.dateOfExamination, inline: true },
            { label: 'Duration of Examination', value: data.durationOfExamination, inline: true },
            { label: 'Instructing Party', value: data.instructingParty, inline: true },
            { label: 'Agency', value: data.agency, inline: true }
          ]}
        />

        <DetailsSection 
          title="Accident Details"
          layout="single-column"
          details={[
            { label: 'Claimant Reported', value: data.accidentResponse, inline: false }
          ]}
        />

        <TableSection 
          title="Symptoms Details"
          rows={data.symptoms.map(symptom => ({
            Area: symptom.area,
            Symptoms: symptom.symptoms,
            Severity: symptom.severity
          }))}
        />

        <DetailsSection 
          title="Treatment Details"
          layout="single-column"
          details={data.treatment.map(treat => ({
            label: 'Treatment',
            value: `${treat.treatment}, Details: ${treat.details}`,
            inline: false
          }))}
        />

        <DetailsSection 
          title="Employment/Education Details"
          layout="single-column"
          details={[
            { label: 'Current Employment Status', value: data.employmentStatus, inline: true },
            { label: 'Missed Work Days', value: data.missedWorkDays, inline: true }
          ]}
        />

        <TableSection 
          title="Domestic Impact Details"
          rows={data.domesticImpact.map(impact => ({
            Activity: impact.activity,
            Impact: impact.impact
          }))}
        />

        <DetailsSection 
          title="Past Medical History"
          layout="single-column"
          details={[
            { label: 'Injuries', value: data.pastInjuries, inline: false }
          ]}
        />

        <DetailsSection 
          title="General Observation"
          layout="single-column"
          details={[
            { label: 'Observation', value: data.generalObservation, inline: false }
          ]}
        />

        <TableSection 
          title="Physical Examination"
          rows={data.physicalExamination.map(exam => ({
            Area: exam.area,
            Observations: exam.observations
          }))}
        />

        <TableSection 
          title="Diagnosis - Physical Injuries"
          rows={data.physicalDiagnosis.map(diagnosis => ({
            Injury: diagnosis.injury,
            Details: diagnosis.details
          }))}
        />

        <TableSection 
          title="Diagnosis - Psychological Injuries"
          rows={data.psychologicalDiagnosis.map(diagnosis => ({
            Injury: diagnosis.injury,
            Details: diagnosis.details
          }))}
        />

        <DetailsSection 
          title="Opinion"
          layout="single-column"
          details={[
            { label: 'Opinion', value: data.opinion, inline: false }
          ]}
        />

        <TableSection 
          title="Prognosis - Physical Injuries"
          rows={data.physicalPrognosis.map(prognosis => ({
            Prognosis: prognosis.details
          }))}
        />

        <TableSection 
          title="Prognosis - Psychological Injuries"
          rows={data.psychologicalPrognosis.map(prognosis => ({
            Prognosis: prognosis.details
          }))}
        />

        <DetailsSection 
          title="Further Treatment and Rehabilitation"
          layout="single-column"
          details={[
            { label: 'Further Treatment', value: data.furtherTreatment, inline: false }
          ]}
        />

        <DetailsSection 
          title="Statement of Truth"
          layout="single-column"
          details={[
            { label: 'Statement of Truth', value: data.statementOfTruth, inline: false }
          ]}
        />

        <DetailsSection 
          title="Signature"
          layout="single-column"
          details={[
            { label: 'Signed By', value: data.signedBy, inline: true }
          ]}
        />
      </div>
      <button onClick={generatePdf} className="report-download-button">Download PDF</button>
    </div>
  );
};

export default MedicalReport;
