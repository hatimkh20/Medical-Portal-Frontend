import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./medicalReport.css";
import DetailsSection from "./DetailSection";
import TableSection from "./TableSection";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { formatString } from "../User Components/Common/util";

const MedicalReport = () => {
  const { reportId } = useParams();
  const { data, loading, error } = useFetch(`/api/report/specific/${reportId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const generatePdf = () => {
    const input = document.getElementById("report-container");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdfCanvas = new jsPDF("p", "mm", [imgHeight, imgWidth]);
      pdfCanvas.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdfCanvas.save("report.pdf");
    });
  };

  return (
    <div className="report-wrapper">
      <div id="report-container" className="report-container">
        <header className="report-header">
          <h1 className="report-title">Medical Report</h1>
        </header>

        {/* Claimant's Details Section */}
        <DetailsSection
          title="Claimant's Details"
          layout="two-rows"
          details={[
            { label: "Full Name", value: data.claimantDetails.fullName },
            {
              label: "Date of Birth",
              value: data.claimantDetails.dateOfBirth.slice(0, 10),
            }, // Formatting date
            { label: "Address", value: data.claimantDetails.address },
            { label: "Occupation", value: data.claimantDetails.occupation },
            {
              label: "Type of ID Checked",
              value: data.claimantDetails.typeOfIdChecked,
            },
            {
              label: "Date of Examination",
              value: data.claimantDetails.dateOfExamination.slice(0, 10),
            },
            {
              label: "Records Were Seen",
              value: data.claimantDetails.recordsWereSeen,
            },
            {
              label: "Date of Accident",
              value: data.claimantDetails.dateOfAccident.slice(0, 10),
            },
            {
              label: "Age at Time of Accident",
              value: data.claimantDetails.ageAtTimeOfAccident,
            },
            {
              label: "Medical Reports Provided",
              value: data.claimantDetails.medicalReportsProvided,
            },
            {
              label: "Photo ID Confirmed",
              value: data.claimantDetails.photoIdConfirmed,
            },
          ]}
        />

        {/* Accident Details Section */}
        <DetailsSection
          title="Accident Details"
          layout="single-column"
          details={[
            {
              label: "Claimant Reported",
              nextLine: true,
              value: `On the ${
                data?.accidentSection?.timeOfAccident || "day"
              }  of ${data.claimantDetails.dateOfAccident.slice(
                0,
                10
              )}, the claimant's vehicle was stationary at a junction when it was rear-ended by a third-party vehicle traveling at a ${
                data?.accidentSection?.speedOfImpact || "normal"
              } typical of city road conditions. The impact resulted in significant damage to the claimant's car. 
              Notably, the vehicle was equipped with headrests and an airbag; however, the airbag did not deploy upon impact. 
              The incident is currently under investigation for further assessment.`,
            },
          ]}
        />

        {/* Symptoms Section */}
        <TableSection
          title="Symptoms Details"
          rows={data.symptomsSection.questions.map((symptom) => ({
            Anatomy: symptom.type,
            "Started At": symptom.symptomsStart,
            "Severity at onset": symptom.severityOnset,
            "Severity now": symptom.severityNow,
            "Resolved duration": symptom.symptomsResolvedDuration,
          }))}
        />

        {/* Treatment Details Section */}
        <DetailsSection
          title="Treatment Details"
          layout="single-column"
          details={[
            {
              label: "Immediate Treatment",
              nextLine: true,
              value: `${
                data?.treatmentSection?.immediateTreatment
                  ?.serviceAttendedSceneOfAccident || "Someone"
              }
              attended at the scene of accident. 
              ${
                data?.treatmentSection?.immediateTreatment
                  ?.treatmentReceivedAtSceneOfAccident
              }.
              The claimant ${
                data?.treatmentSection?.immediateTreatment
                  ?.locationWentAfterAccident
              } after the accident and he went there by ${
                data?.treatmentSection?.immediateTreatment?.howGetThere
              }.`,
            },
            {
              label: "Later Treatment",
              nextLine: true,
              value: `The treatment was received ${data?.treatmentSection?.laterTreatment?.whereTreatmentReceived}. 
            The claimant seek treatment after the ${data?.treatmentSection?.laterTreatment?.durationOfTreatmentReceivedAfterAccident}
             of accident and received the  treatment ${data?.treatmentSection?.laterTreatment?.whatTreatmentReceived}. 
            ${data?.treatmentSection?.laterTreatment?.whatImagingOrScansDone}.`,
            },
          ]}
        />

        {/* Employment/Education Details */}
        <DetailsSection
          title="Employment/Education Details"
          layout="single-column"
          details={[
            {
              label: "Studying where",
              value: data.employmentEducationSection.studyingWhere,
            },
            {
              label: "Duration Taken Off From School After Accident",
              value:
                data.employmentEducationSection
                  .durationTakenOffFromSchoolAfterAccident,
            },
            {
              label: "Hours Gave To Education",
              value: data.employmentEducationSection.hoursGaveToEducation,
            },
            {
              label: "Phased Return to School Management",
              value:
                data.employmentEducationSection.phasedReturnToSchoolManagement,
            },
          ]}
        />

        {/* Domestic Impact Details */}
        <TableSection
          title="Domestic Impact Details"
          rows={data.domesticImpactSection.questions.map(
            (injury) => ({
              "Activity": formatString(injury.type),
              "Severity at onset": injury.severityAtAccident,
              "Current condition": injury.currentCondition
            })
          )}
        />

        {/* General Observations Section */}
        <DetailsSection
          title="General Observations"
          layout="single-column"
          details={[
            {
              label: "Physical Appearance",
              value: data.generalObservationSection.physicalAppearance,
            },
            {
              label: "Presence of Bruises, Scars, Marks",
              value: data.generalObservationSection.presenceOfBruisesScarsMarks,
            },
            {
              label: "Holding Intelligent Conversation",
              value:
                data.generalObservationSection.holdingIntelligentConversation,
            },
            {
              label: "Eye Contact and Rapport",
              value: data.generalObservationSection.goodEyeContact,
            },
            {
              label: "Mental State",
              value: data.generalObservationSection.mentalState,
            },
          ]}
        />

        {/* Diagnosis Details Section */}
        <TableSection
          title="Diagnosis - Physical Injuries"
          rows={data.diagnosisSection.physicalInjuries.questions.map(
            (injury) => ({
              Injury: injury.type,
              Mechanism: injury.mechanismOfInjury,
              Trauma: injury.traumaItCaused,
            })
          )}
        />

        {/* Psychological Injuries Section */}
        <TableSection
          title="Diagnosis - Psychological Injuries"
          rows={data.diagnosisSection.psychologicalInjuries.questions.map(
            (injury) => ({
              Type: injury.type,
              Mechanism: injury.mechanismOfInjury,
            })
          )}
        />

        {/* Prognosis Details */}
        <TableSection
          title="Prognosis - Physical Injuries"
          rows={data.prognosisSection.physicalInjuries.questions.map(
            (injury) => ({
              Question: injury.question,
              Answer: injury.answer,
            })
          )}
        />

        {/* Psychological Prognosis Details */}
        <TableSection
          title="Prognosis - Psychological Injuries"
          rows={data.prognosisSection.psychologicalInjuries.questions.map(
            (injury) => ({
              Question: injury.question,
              Answer: injury.answer,
            })
          )}
        />

        {/* Statement of Truth */}
        <DetailsSection
          title="Statement of Truth"
          layout="single-column"
          details={[
            {
              label: "Statement",
              value: data.statementOfTruthSection.predefinedStatement.statement,
            },
          ]}
        />

        {/* Expert Bibliography */}
        <TableSection
          title="Expert Bibliography"
          rows={data.expertBibliographySection.selectedBibliography.map(
            (bib) => ({
              Bibliography: bib.bibliography,
            })
          )}
        />
      </div>
      <button onClick={generatePdf} className="report-download-button">
        Download PDF
      </button>
    </div>
  );
};

export default MedicalReport;
