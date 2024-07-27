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
      const imgData = canvas.toDataURL('image/jpeg', 0.9); // Use JPEG and reduce quality to 0.5
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
            { label: 'Full Name', value: data.claimantDetails.name, inline: true },
            { label: 'Date of Birth', value: data.claimantDetails.dob, inline: true },
            { label: 'Address', value: data.claimantDetails.address, inline: true },
            { label: 'Occupation', value: data.claimantDetails.occupation, inline: true },
            { label: 'Phone', value: data.claimantDetails.phone, inline: true },
            { label: 'GP Name', value: data.claimantDetails.gpName, inline: true },
            { label: 'GP Address', value: data.claimantDetails.gpAddress, inline: true },
            { label: 'Referrer', value: data.claimantDetails.referrer, inline: true },
            { label: 'Agency Reference', value: data.claimantDetails.agencyReference, inline: true },
            { label: 'Agency Address', value: data.claimantDetails.agencyAddress, inline: true },
            { label: 'Solicitor', value: data.claimantDetails.solicitor, inline: true },
            { label: 'Solicitor Address', value: data.claimantDetails.solicitorAddress, inline: true },
            { label: 'Date of Examination', value: data.claimantDetails.dateOfExamination, inline: true },
            { label: 'Duration of Examination', value: data.claimantDetails.durationOfExamination, inline: true },
            { label: 'Examination Venue', value: data.claimantDetails.examinationVenue, inline: true },
            { label: 'Report Date', value: data.claimantDetails.reportDate, inline: true },
            { label: 'Agency', value: data.claimantDetails.agency, inline: true },
            { label: 'Case Number', value: data.claimantDetails.caseNumber, inline: true }
          ]}
        />

        <DetailsSection 
          title="Accident Details"
          layout="single-column"
          details={[
            { label: 'Claimant Reported', value: data.accidentDetails.claimantResponse, inline: false }
          ]}
        />

        <TableSection 
          title="Symptoms Details"
          rows={data.symptomsDetails.map(symptom => ({
            Anatomy: symptom.anatomy,
            "Started At": symptom.duration,
            "Severity at onset": symptom.severityOnset,
            "Severity now": symptom.severityNow,
            "Ongoing/Resolved": symptom.ongoing
          }))}
        />

        <DetailsSection 
          title="Treatment Details"
          layout="single-column"
          details={[
            { label: 'Immediate Treatment', value: data.accidentDetails.claimantResponse, inline: false },
            { label: 'Later Treatment', value: data.accidentDetails.claimantResponse, inline: false },

          ]}
        />

        <DetailsSection 
          title="Employment/Education Details"
          layout="single-column"
          details={[
            { label: 'Current Employment Status', value: data.employmentEducationDetails.employmentStatus, inline: true },
            { label: 'Occupation', value: data.employmentEducationDetails.occupation, inline: true },
            { label: 'Education Level', value: data.employmentEducationDetails.educationLevel, inline: true },
            { label: 'Missed Work Days', value: data.employmentEducationDetails.missedWorkDays, inline: true },
            { label: 'Impact on Work', value: data.employmentEducationDetails.impactOnWork, inline: true }
          ]}
        />

        <TableSection 
          title="Domestic Impact Details"
          rows={data.domesticImpactDetails.map(impact => ({
            Activity: impact.activity,
            Severity: impact.severity,
            SymptomExacerbation: impact.symptomExacerbation
          }))}
          mergedHeader="Ongoing"
        />

        <DetailsSection 
          title="Past Medical History"
          layout="single-column"
          details={[
            { label: 'Injuries', value: data.pastMedicalHistory.injuries, inline: false },
            { label: 'Illnesses', value: data.pastMedicalHistory.illnesses, inline: false },
            { label: 'Operations', value: data.pastMedicalHistory.operations, inline: false }
          ]}
        />

        <DetailsSection 
          title="General Observation"
          layout="single-column"
          details={[
            { label: 'Presentation', value: data.generalObservation.presentation, inline: true },
            { label: 'Demeanor', value: data.generalObservation.demeanor, inline: true },
            { label: 'Pain Levels', value: data.generalObservation.painLevels, inline: true },
            { label: 'Pain Management', value: data.generalObservation.painManagement, inline: true },
            { label: 'Mobility', value: data.generalObservation.mobility, inline: true }
          ]}
        />

        <TableSection 
          title="Physical Examination"
          rows={data.physicalExamination.map(exam => ({
            Area: exam.area,
            Observation: exam.observation,
            Characteristics: exam.characteristics,
            SymptomExacerbation: exam.symptomExacerbation
          }))}
        />

        <TableSection 
          title="Diagnosis - Physical Injuries"
          rows={data.diagnosisPhysicalInjuries.map(diagnosis => ({
            Injury: diagnosis.injury,
            Mechanism: diagnosis.mechanism,
            Treatment: diagnosis.treatment,
            Prognosis: diagnosis.prognosis
          }))}
        />

        <TableSection 
          title="Diagnosis - Psychological Injuries"
          rows={data.diagnosisPsychologicalInjuries.map(diagnosis => ({
            Injury: diagnosis.injury,
            Mechanism: diagnosis.mechanism,
            Treatment: diagnosis.treatment,
            Prognosis: diagnosis.prognosis
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
          rows={data.prognosisPhysicalInjuries.map(prognosis => ({
            Injury: prognosis.injury,
            ShortTerm: prognosis.shortTerm,
            LongTerm: prognosis.longTerm
          }))}
        />

        <TableSection 
          title="Prognosis - Psychological Injuries"
          rows={data.prognosisPsychologicalInjuries.map(prognosis => ({
            Injury: prognosis.injury,
            ShortTerm: prognosis.shortTerm,
            LongTerm: prognosis.longTerm
          }))}
        />

        <DetailsSection 
          title="Further Treatment and Rehabilitation"
          layout="single-column"
          details={[
            { label: 'Further Treatment', value: data.furtherTreatmentRehabilitation, inline: false }
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
            { label: 'Signed By', value: `${data.signedBy.name}, ${data.signedBy.qualifications}`, inline: true },
            { label: 'Date', value: data.signedBy.date, inline: true }
          ]}
        />

        <TableSection 
          title="Expert Bibliography"
          rows={data.expertBibliography.map(bibliography => ({
            Bibliography: bibliography
          }))}
        />
      </div>
      <button onClick={generatePdf} className="report-download-button">Download PDF</button>
    </div>
  );
};

export default MedicalReport;
