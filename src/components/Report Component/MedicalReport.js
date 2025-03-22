import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./medicalReport.css";
import DetailsSection from "./DetailSection";
import TableSection from "./TableSection";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { faDownload, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  formatString,
  getTextBeforeUnderscore,
} from "../User Components/Common/util";
import SignatureSection from "./SignatureSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const resolvedPhysicalInjuryDetails =
    data?.prognosisDetailedSection?.physicalInjuries?.questions
      ?.filter((injury) =>
        data?.prognosisSection?.physicalInjuries?.questions?.find(
          (q) =>
            q?.question?.toLowerCase() ===
            `${injury?.type}_resolvedOrOngoing`.toLowerCase() &&
            q?.answer?.toLowerCase() === "resolved"
        )
      )
      ?.filter((injury) =>
        data?.anatomySection?.anatomySelectedOptions
          ?.map((option) => option?.toLowerCase())
          ?.includes(formatString(injury?.type)?.toLowerCase())
      ) || [];

  const ongoingPhysicalInjuryDetails =
    data?.prognosisDetailedSection?.physicalInjuries?.questions
      ?.filter((injury) =>
        data?.prognosisSection?.physicalInjuries?.questions?.find(
          (q) =>
            q?.question?.toLowerCase() ===
            `${injury?.type}_resolvedOrOngoing`.toLowerCase() &&
            q?.answer?.toLowerCase() === "ongoing"
        )
      )
      ?.filter((injury) =>
        data?.anatomySection?.anatomySelectedOptions
          ?.map((option) => option?.toLowerCase())
          ?.includes(formatString(injury?.type)?.toLowerCase())
      ) || [];

  const resolvedPsychologicalDetails =
    data?.prognosisDetailedSection?.psychologicalInjuries?.questions
      ?.filter((injury) =>
        data?.prognosisSection?.psychologicalInjuries?.questions?.find(
          (q) =>
            q?.question?.toLowerCase() ===
            `${injury?.type}_resolvedOrOngoing`.toLowerCase() &&
            q?.answer?.toLowerCase() === "resolved"
        )
      )
      ?.filter((injury) =>
        data?.anatomySection?.psychologicalInjuriesSelectedOptions
          ?.map((option) => option?.toLowerCase())
          ?.includes(formatString(injury?.type)?.toLowerCase())
      ) || [];

  const ongoingPsychologicalDetails =
    data?.prognosisDetailedSection?.psychologicalInjuries?.questions
      ?.filter((injury) =>
        data?.prognosisSection?.psychologicalInjuries?.questions?.find(
          (q) =>
            q?.question?.toLowerCase() ===
            `${injury?.type}_resolvedOrOngoing`.toLowerCase() &&
            q?.answer?.toLowerCase() === "ongoing"
        )
      )
      ?.filter((injury) =>
        data?.anatomySection?.psychologicalInjuriesSelectedOptions
          ?.map((option) => option?.toLowerCase())
          ?.includes(formatString(injury?.type)?.toLowerCase())
      ) || [];

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
            {
              label: "Full Name",
              value: data?.claimantDetails?.fullName
            },
            {
              label: "Date of Birth",
              value: data?.claimantDetails?.dateOfBirth?.slice(0, 10),
            }, // Formatting date
            { 
              label: "Address", 
              value: data?.claimantDetails?.address 
            },
            { 
              label: "Occupation", 
              value: data?.claimantDetails?.occupation 
            },
            {
              label: "Type of ID Checked",
              value: data?.claimantDetails?.typeOfIdChecked,
            },
            {
              label: "Date of Examination",
              value: data?.claimantDetails?.dateOfExamination?.slice(0, 10),
            },
            {
              label: "Records Were Seen",
              value: data?.claimantDetails?.recordsWereSeen,
            },
            {
              label: "Date of Accident",
              value: data?.claimantDetails?.dateOfAccident?.slice(0, 10),
            },
            {
              label: "Age at Time of Accident",
              value: data?.claimantDetails?.ageAtTimeOfAccident,
            },
            {
              label: "Medical Reports Provided",
              value: data?.claimantDetails?.medicalReportsProvided,
            },
            {
              label: "Photo ID Confirmed",
              value: data?.claimantDetails?.photoIdConfirmed,
            },
            { 
              label: "Accompanied By", 
              value: data?.claimantDetails?.accompaniedBy 
            },
            { 
              label: "Place Of Examination", 
              value: data?.claimantDetails?.placeOfExamination 
            },
            { 
              label: "Duration Of Examination", 
              value: data?.claimantDetails?.durationOfExamination 
            },
            { 
              label: "Date Of Report", 
              value: data?.claimantDetails?.dateOfReport?.slice(0, 10)
            },
            { 
              label: "Instructing Party", 
              value: data?.claimantDetails?.instructingParty 
            },
            { 
              label: "Instructing Party Ref", 
              value: data?.claimantDetails?.instructingPartyRef 
            },
            { 
              label: "Agency", 
              value: data?.claimantDetails?.agency 
            },
            { 
              label: "Agency Ref", 
              value: data?.claimantDetails?.agencyRef 
            },
            { 
              label: "Medco Case Number", 
              value: data?.claimantDetails?.medcoCaseNumber 
            }
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
              value: `On the ${data?.accidentSection?.timeOfAccident || "day"
                }  of ${data?.claimantDetails?.dateOfAccident?.slice(
                  0,
                  10
                )}, the claimant's vehicle was stationary at a junction when it was rear-ended by a third-party vehicle traveling at a ${data?.accidentSection?.speedOfImpact || "normal"
                } typical of city road conditions. The impact resulted in significant damage to the claimant's car. 
              Notably, the vehicle was equipped with headrests and an airbag; however, the airbag did not deploy upon impact. 
              The incident is currently under investigation for further assessment.`,
            },
          ]}
        />

        {/* Symptoms Section */}
        <TableSection
          title="Symptoms Details"
          rows={data?.symptomsSection?.questions
            ?.filter((symptom) =>
              data?.anatomySection?.anatomySelectedOptions?.includes(
                formatString(symptom?.type)
              )
            )
            ?.map((symptom) => ({
              Anatomy: formatString(symptom?.type),
              "Started At": symptom?.symptomsStart,
              "Severity at onset": symptom?.severityOnset,
              "Severity now": symptom?.severityNow,
              "Resolved duration": symptom?.symptomsResolvedDuration,
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
              value: `${data?.treatmentSection?.immediateTreatment
                  ?.serviceAttendedSceneOfAccident || "Someone"
                }
              attended at the scene of accident. 
              ${data?.treatmentSection?.immediateTreatment
                  ?.treatmentReceivedAtSceneOfAccident
                }.
              The claimant ${data?.treatmentSection?.immediateTreatment
                  ?.locationWentAfterAccident
                } after the accident and he went there by ${data?.treatmentSection?.immediateTreatment?.howGetThere
                }.`,
            },
            {
              label: "Later Treatment",
              nextLine: true,
              value: `The treatment was received ${data?.treatmentSection?.laterTreatment?.whereTreatmentReceived
                }. 
            The claimant seek treatment after the ${data?.treatmentSection?.laterTreatment
                  ?.durationOfTreatmentReceivedAfterAccident
                }
             of accident and received the  treatment ${data?.treatmentSection?.laterTreatment?.whatTreatmentReceived
                }. 
            ${data?.treatmentSection?.laterTreatment?.whatImagingOrScansDone
                }.`,
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
              value: data?.employmentEducationSection?.studyingWhere,
            },
            {
              label: "Duration Taken Off From School After Accident",
              value:
                data?.employmentEducationSection
                  ?.durationTakenOffFromSchoolAfterAccident,
            },
            {
              label: "Hours Gave To Education",
              value: data?.employmentEducationSection?.hoursGaveToEducation,
            },
            {
              label: "Phased Return to School Management",
              value:
                data?.employmentEducationSection
                  ?.phasedReturnToSchoolManagement,
            },
          ]}
        />

        {/* Domestic Impact Details */}
        <TableSection
          title="Domestic Impact Details"
          rows={data?.domesticImpactSection?.questions?.map((injury) => ({
            Activity: formatString(injury?.type),
            "Severity at onset": injury?.severityAtAccident,
            "Current condition": injury?.currentCondition,
          }))}
        />

        {/* PAST MEDICAL HISTORY Section */}
        <DetailsSection
          title="PAST MEDICAL HISTORY"
          layout="single-column"
          details={[
            {
              label: "Past Medical Injuries",
              value: data?.medicalHistorySection?.detailsOfPastMedicalInjuries,
            },
            {
              label: "Medical Notes Reviewed",
              value: data?.medicalHistorySection?.medicalNotesReviewed
                ?.map((notes) => notes?.expertReview)
                ?.join(", "),
            },
          ]}
        />

        {/* General Observations Section */}
        <DetailsSection
          title="General Observations"
          layout="single-column"
          details={[
            {
              label: "Physical Appearance",
              value: data?.generalObservationSection?.physicalAppearance,
            },
            {
              label: "Presence of Bruises, Scars, Marks",
              value:
                data?.generalObservationSection?.presenceOfBruisesScarsMarks,
            },
            {
              label: "Holding Intelligent Conversation",
              value:
                data?.generalObservationSection?.holdingIntelligentConversation,
            },
            {
              label: "Eye Contact and Rapport",
              value: data?.generalObservationSection?.goodEyeContact,
            },
            {
              label: "Mental State",
              value: data?.generalObservationSection?.mentalState,
            },
          ]}
        />

        {/* PHYSICAL EXAMINATION Section */}
        <TableSection
          title="PHYSICAL EXAMINATION"
          rows={data?.physicalExaminationSection?.questions
            ?.filter((injury) =>
              data?.anatomySection?.anatomySelectedOptions?.includes(
                formatString(injury?.type)
              )
            )
            ?.map((injury) => ({
              Anatomy: formatString(injury?.type),
              "Observations on Palpation": injury?.observationOfPalpation,
              "Observations on flexion/ extension or abduction":
                injury?.observationOnFlexios,
            }))}
        />

        {/* Diagnosis Details Section */}
        <TableSection
          title="Diagnosis - Physical Injuries"
          rows={data?.diagnosisSection?.physicalInjuries?.questions
            ?.filter((injury) =>
              data?.anatomySection?.anatomySelectedOptions?.includes(
                formatString(injury?.type)
              )
            )
            ?.map((injury) => ({
              Anatomy: formatString(injury?.type),
              Injury: injury?.injury,
              Mechanism: injury?.mechanismOfInjury,
              Trauma: injury?.traumaItCaused,
            }))}
        />

        {/* Psychological Injuries Section */}
        <TableSection
          title="Diagnosis - Psychological Injuries"
          rows={data?.diagnosisSection?.psychologicalInjuries?.questions?.map(
            (injury) => ({
              Type: formatString(getTextBeforeUnderscore(injury?.type)),
              Mechanism: injury?.mechanismOfInjury,
            })
          )}
        />

        {/* Opinion - Physical Injuries */}
        <TableSection
          title="Opinion - Physical Injuries"
          rows={data?.opinionSection?.physicalInjuries?.questions
            ?.filter((injury) =>
              data?.anatomySection?.anatomySelectedOptions?.includes(
                formatString(injury?.type)
              )
            )
            ?.map((detail) => ({
              Type: formatString(detail?.type),
              Opinion: detail?.opinion,
            }))}
        />

        {/* Opinion - Physchological Injuries */}
        <TableSection
          title="Opinion - Physchological Injuries"
          rows={data?.opinionSection?.psychologicalInjuries?.questions?.map(
            (detail) => ({
              Type: formatString(detail?.type),
              Opinion: detail?.opinion,
            })
          )}
        />

        {/* Opinion Section */}
        <DetailsSection
          title="Opinion"
          layout="single-column"
          details={[
            { label: "Exceptional Circumstances", labelHeading: true },
            {
              label: "Did claimant's claimed any exceptional circumstances?",
              value:
                data?.opinionSection?.exceptionalCircumstances
                  ?.claimantClaimedAnyExceptionalCircumstance,
            },
            {
              label: "Are you in agreement as Medical Expert?",
              value:
                data?.opinionSection?.exceptionalCircumstances
                  ?.anyExceptionalCircumstanceInAccident,
            },
            {
              label: "Were there any exceptional circumstances in accident?",
              value:
                data?.opinionSection?.exceptionalCircumstances
                  ?.injuriesSustainedInAccident,
            },
            {
              label: "Were the injuries result of exceptional circumstances?",
              value:
                data?.opinionSection?.exceptionalCircumstances
                  ?.inAgreementAsMedicalExpert,
            },
            {
              label:
                "Injuries sustained in accident were exceptionally severe?",
              value:
                data?.opinionSection?.exceptionalCircumstances
                  ?.injuriesResultOfExceptionalCircumstance,
            },
            {
              label: "Anything Else?",
              value:
                data?.opinionSection?.exceptionalCircumstances?.anythingElse,
            },
          ]}
        />

        {/* Prognosis Details - Resolved */}
        <TableSection
          title="Prognosis - Physical Injuries"
          mergedHeader="Resolved"
          rows={resolvedPhysicalInjuryDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Resolved Time":
              detail?.whenDidItResolved || detail?.timeWillTakeToRecover,
            "Long Term Sequelae": detail?.anyLongTermSequelae,
          }))}
        />

        {/* Prognosis Details - Ongoing */}
        <TableSection
          title="Prognosis - Physical Injuries"
          mergedHeader="Ongoing"
          rows={ongoingPhysicalInjuryDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Estimated Time to Recover": detail?.timeWillTakeToRecover,
            "Severity of Disability": detail?.severeDisability,
            Specialist: detail?.specialist,
            Recommendation: detail?.otherRecommendation,
            "Long Term Sequelae": detail?.anyLongTermSequelae,
            "Treatment and Rehabilitation": detail?.treatmentAndRehabiliation,
          }))}
        />

        {/* Prognosis Details - Resolved */}
        <TableSection
          title="Prognosis - Pyschological Injuries"
          mergedHeader="Resolved"
          rows={resolvedPsychologicalDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Resolved Time":
              detail?.whenDidItResolved || detail?.timeWillTakeToRecover,
            "Long Term Sequelae": detail?.anyLongTermSequelae,
          }))}
        />

        {/* Prognosis Details - Ongoing */}
        <TableSection
          title="Prognosis - Pyschological Injuries"
          mergedHeader="Ongoing"
          rows={ongoingPsychologicalDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Estimated Time to Recover": detail?.timeWillTakeToRecover,
            "Severity of Disability": detail?.severeDisability,
            Specialist: detail?.specialist,
            Recommendation: detail?.otherRecommendation,
            "Long Term Sequelae": detail?.anyLongTermSequelae,
            "Treatment and Rehabilitation": detail?.treatmentAndRehabiliation,
          }))}
        />

        {/* Statement of Truth */}
        <DetailsSection
          title="Statement of Truth"
          layout="single-column"
          details={[
            {
              label: data?.statementOfTruthSection?.predefinedStatement?.name,
              value:
                data?.statementOfTruthSection?.predefinedStatement?.statement,
              nextLine: true,
            },
          ]}
        />

        {/* Signature Section */}
        <SignatureSection
          signatureImage={data?.doctorSignature?.base64Image}
          doctorName={`${data?.userRefId?.first_name} ${data?.userRefId?.last_name}`}
          gmcNumber={data?.userRefId?.gmc_number}
          date="04/01/2024"
        />

        {/* Expert Bibliography */}
        <TableSection
          title="Expert Bibliography"
          rows={data?.expertBibliographySection?.selectedBibliography?.map(
            (bib) => ({
              Bibliography: bib?.bibliography,
            })
          )}
        />
      </div>
      <div className="button-container">
        <button
          onClick={() => window.history.back()}
          className="circle-button back-button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <button onClick={generatePdf} className="circle-button download-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
    </div>
  );
};

export default MedicalReport;
