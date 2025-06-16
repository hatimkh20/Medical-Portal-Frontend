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
          ?.map(({ name }) => name?.toLowerCase())
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
          ?.map(({ name }) => name?.toLowerCase())
          ?.includes(formatString(injury?.type)?.toLowerCase())
      ) || [];

  const resolvedPsychologicalDetails =
    data?.prognosisDetailedSection?.psychologicalInjuries?.questions?.filter(
      (injury) =>
        data?.prognosisSection?.psychologicalInjuries?.questions?.find(
          (q) =>
            q?.question?.toLowerCase() ===
              `${injury?.type}_resolvedOrOngoing`.toLowerCase() &&
            q?.answer?.toLowerCase() === "resolved"
        )
    ) || [];

  const ongoingPsychologicalDetails =
    data?.prognosisDetailedSection?.psychologicalInjuries?.questions?.filter(
      (injury) =>
        data?.prognosisSection?.psychologicalInjuries?.questions?.find(
          (q) =>
            q?.question?.toLowerCase() ===
              `${injury?.type}_resolvedOrOngoing`.toLowerCase() &&
            q?.answer?.toLowerCase() === "ongoing"
        )
    ) || [];

  const handleOtherValues = (obj, fieldName) => {
    if (!obj || !fieldName) return null;

    const fieldValue = obj[fieldName];

    // Ensure case matches the actual property in the data
    const otherFieldKey = `other${fieldName
      .charAt(0)
      .toUpperCase()}${fieldName.slice(1)}`;

    console.log(`Processing field: ${fieldName}`);
    console.log(`Original value:`, fieldValue);
    console.log(`Checking for alternative field: ${otherFieldKey}`);
    console.log(`Other field value (${otherFieldKey}):`, obj[otherFieldKey]);

    if (
      typeof fieldValue === "string" &&
      fieldValue.toLowerCase() === "other" &&
      obj[otherFieldKey]?.trim()
    ) {
      console.log(`Replacing "${fieldValue}" with "${obj[otherFieldKey]}"`);
      return obj[otherFieldKey]; // Use the alternative value
    }

    console.log(`Returning original value:`, fieldValue);
    return fieldValue;
  };

  return (
    <div className="report-wrapper">
      <div id="report-container" className="report-container">
        <header className="report-header">
          <h1 className="report-title">Medical Report</h1>
        </header>

        {/* Claimant's Details Section */}
        <DetailsSection
          title="Claimant Detail"
          layout="two-rows"
          details={[
            {
              label: "Full Name",
              value: data?.claimantDetails?.fullName,
            },
            {
              label: "Date of Birth",
              value: data?.claimantDetails?.dateOfBirth?.slice(0, 10),
            }, // Formatting date
            {
              label: "Address",
              value: data?.claimantDetails?.address,
            },
            {
              label: "Occupation",
              value: data?.claimantDetails?.occupation,
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
              value: data?.claimantDetails?.accompaniedBy,
            },
            {
              label: "Place Of Examination",
              value: data?.claimantDetails?.placeOfExamination,
            },
            {
              label: "Duration Of Examination",
              value: data?.claimantDetails?.durationOfExamination,
            },
            {
              label: "Date Of Report",
              value: data?.claimantDetails?.dateOfReport?.slice(0, 10),
            },
            {
              label: "Instructing Party",
              value: data?.claimantDetails?.instructingParty,
            },
            {
              label: "Instructing Party Ref",
              value: data?.claimantDetails?.instructingPartyRef,
            },
            {
              label: "Agency",
              value: data?.claimantDetails?.agency,
            },
            {
              label: "Agency Ref",
              value: data?.claimantDetails?.agencyRef,
            },
            {
              label: "Medco Case Number",
              value: data?.claimantDetails?.medcoCaseNumber,
            },
          ]}
        />

        <DetailsSection
          title="Vehicular Detail"
          layout="single-column"
          details={[
            {
              label: "Claimant Reported",
              nextLine: true,
              value: (() => {
                const accident = data?.accidentSection || {};
                const claimant = data?.claimantDetails || {};

                // Extract details from the array
                const seatbeltWear = accident.details?.find(
                  (d) => d.question === "vehicleQuestion_seatbeltWear"
                )?.answer;
                const airbagDeploy = accident.details?.find(
                  (d) => d.question === "vehicleQuestion_airbagsDeploy"
                )?.answer;

                // Construct the paragraph dynamically
                return `On the ${accident.timeOfAccident || "day"} of ${
                  claimant.dateOfAccident?.slice(0, 10) || "the accident date"
                }, 
        the claimant's vehicle was stationary at a junction when it was rear-ended by a third-party vehicle traveling at ${
          accident.speedOfImpact || "a normal speed"
        }, typical of city road conditions. 
        
        The impact resulted in ${
          accident.levelOfDamageVehicle || "some damage"
        } to the claimant's car. ${
                  accident.levelOfDamageVehicle
                    ?.toLowerCase()
                    .includes("extensive")
                    ? "The severity of the damage suggests a significant impact."
                    : ""
                }

        The vehicle was equipped with headrests and airbags. ${
          seatbeltWear === "yes"
            ? "The claimant was wearing a seatbelt at the time of the collision."
            : seatbeltWear === "no"
            ? "The claimant was not wearing a seatbelt, which may have increased the risk of injury."
            : ""
        } ${
                  airbagDeploy === "yes"
                    ? "The airbags deployed upon impact."
                    : "However, the airbags did not deploy."
                }

        The incident is currently under investigation for further assessment.`;
              })(),
            },
          ]}
        />

        {/* Symptoms Section */}
        <TableSection
          title="Symptoms Details"
          rows={data?.symptomsSection?.questions
            ?.filter((symptom) =>
              data?.anatomySection?.anatomySelectedOptions?.some(
                (option) => formatString(symptom?.type) === option?.name
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
              value: (() => {
                const treatment =
                  data?.treatmentSection?.immediateTreatment || {};
                return `${
                  treatment.serviceAttendedSceneOfAccident || "Someone"
                } attended at the scene of the accident. 
        ${
          treatment.treatmentReceivedAtSceneOfAccident ||
          "No treatment details available"
        }. 
        The claimant ${
          treatment.locationWentAfterAccident || "went elsewhere"
        } after the accident and traveled there by ${
                  treatment.howGetThere || "an unknown method"
                }.`;
              })(),
            },
            {
              label: "Later Treatment",
              nextLine: true,
              value: (() => {
                const treatment = data?.treatmentSection?.laterTreatment || {};

                // Handle "Other" cases
                const whereTreatment = handleOtherValues(
                  treatment,
                  "whereTreatmentReceived"
                );
                const whatTreatment = handleOtherValues(
                  treatment,
                  "whatTreatmentReceived"
                );
                const imagingScans = handleOtherValues(
                  treatment,
                  "whatImagingOrScansDone"
                );

                return `The treatment was received ${whereTreatment}. 
        The claimant sought treatment ${
          treatment.durationOfTreatmentReceivedAfterAccident ||
          "after some time"
        } 
        following the accident and received treatment ${whatTreatment}. 
        ${imagingScans || "No imaging or scans were conducted."}`;
              })(),
            },
          ]}
        />

        {/* Employment/Education Details */}
        <DetailsSection
          title="Employment/Education Details"
          layout="single-column"
          details={[
            {
              label: "Place of Study/Employment at the Time of the Accident",
              value: data?.employmentEducationSection?.studyingWhere,
            },
            {
              label: "Duration Away from School/Work After the Accident",
              value:
                data?.employmentEducationSection
                  ?.durationTakenOffFromSchoolAfterAccident,
            },
            {
              label: "Work/Study Hours",
              value: data?.employmentEducationSection?.hoursGaveToEducation,
            },
            {
              label: "Return to Work/School Management",
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
              value: handleOtherValues(
                data?.generalObservationSection,
                "physicalAppearance"
              ),
            },
            {
              label: "Presence of Bruises, Scars, Marks",
              value: handleOtherValues(
                data?.generalObservationSection,
                "presenceOfBruisesScarsMarks"
              ),
            },
            {
              label: "Holding Intelligent Conversation",
              value: handleOtherValues(
                data?.generalObservationSection,
                "holdingIntelligentConversation"
              ),
            },
            {
              label: "Eye Contact and Rapport",
              value: handleOtherValues(
                data?.generalObservationSection,
                "goodEyeContact"
              ),
            },
            {
              label: "Mental State",
              value: handleOtherValues(
                data?.generalObservationSection,
                "mentalState"
              ),
            },
          ]}
        />

        {/* PHYSICAL EXAMINATION Section */}
        <TableSection
          title="PHYSICAL EXAMINATION"
          rows={data?.physicalExaminationSection?.questions
            ?.filter((injury) =>
              data?.anatomySection?.anatomySelectedOptions?.some(
                (option) => formatString(injury?.type) === option?.name
              )
            )
            ?.map((injury) => ({
              Anatomy: formatString(injury?.type),
              "Observations on Palpation": handleOtherValues(
                injury,
                "observationOfPalpation"
              ),
              "Observations on flexion/ extension or abduction":
                handleOtherValues(injury, "observationOnFlexios"),
            }))}
        />

        {/* Diagnosis Details Section */}
        <TableSection
          title="Diagnosis - Physical Injuries"
          rows={data?.diagnosisSection?.physicalInjuries?.questions
            ?.filter((injury) =>
              data?.anatomySection?.anatomySelectedOptions?.some(
                (option) => formatString(injury?.type) === option?.name
              )
            )
            ?.map((injury) => {
              const anatomyName = formatString(injury?.type);
              const matchedAnatomy =
                data?.anatomySection?.anatomySelectedOptions?.find(
                  (option) => option?.name === anatomyName
                );

              return {
                Anatomy: anatomyName,
                Injury: handleOtherValues(injury, "injury"),
                Mechanism: handleOtherValues(injury, "mechanismOfInjury"),
                Trauma: matchedAnatomy?.trauma || "",
              };
            })}
        />

        {/* Psychological Injuries Section */}
        <TableSection
          title="Diagnosis - Psychological Injuries"
          rows={data?.diagnosisSection?.psychologicalInjuries?.questions?.map(
            (injury) => ({
              Type: formatString(getTextBeforeUnderscore(injury?.type)),
              Mechanism: handleOtherValues(injury, "mechanismOfInjury"),
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

        {/* Opinion - Physical Injuries */}
        <TableSection
          title="Opinion - Physical Injuries"
          rows={data?.opinionSection?.physicalInjuries?.questions
            ?.filter((injury) =>
              data?.anatomySection?.anatomySelectedOptions?.some(
                (option) => formatString(injury?.type) === option?.name
              )
            )
            ?.map((detail) => ({
              Type: formatString(detail?.type),
              Opinion: detail?.opinion,
            }))}
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
              label: "Are you in agreement as Medical Expert?",
              value:
                data?.opinionSection?.exceptionalCircumstances
                  ?.anyExceptionalCircumstanceInAccident,
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
              handleOtherValues(detail, "whenDidItResolved") ||
              handleOtherValues(detail, "timeWillTakeToRecover"),
            "Long Term Sequelae": handleOtherValues(
              detail,
              "anyLongTermSequelae"
            ),
          }))}
        />

        {/* Prognosis Details - Ongoing */}
        <TableSection
          title="Prognosis - Physical Injuries"
          mergedHeader="Ongoing"
          rows={ongoingPhysicalInjuryDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Estimated Time to Recover": handleOtherValues(
              detail,
              "timeWillTakeToRecover"
            ),
            "Severity of Disability": handleOtherValues(
              detail,
              "severeDisability"
            ),
            Specialist: handleOtherValues(detail, "specialist"),
            Recommendation: handleOtherValues(detail, "otherRecommendation"),
            "Long Term Sequelae": handleOtherValues(
              detail,
              "anyLongTermSequelae"
            ),
            "Treatment and Rehabilitation": handleOtherValues(
              detail,
              "treatmentAndRehabiliation"
            ),
          }))}
        />

        {/* Prognosis Details - Resolved */}
        <TableSection
          title="Prognosis - Psychological Injuries"
          mergedHeader="Resolved"
          rows={resolvedPsychologicalDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Resolved Time":
              handleOtherValues(detail, "whenDidItResolved") ||
              handleOtherValues(detail, "timeWillTakeToRecover"),
            "Long Term Sequelae": handleOtherValues(
              detail,
              "anyLongTermSequelae"
            ),
          }))}
        />

        {/* Prognosis Details - Ongoing */}
        <TableSection
          title="Prognosis - Psychological Injuries"
          mergedHeader="Ongoing"
          rows={ongoingPsychologicalDetails?.map((detail) => ({
            Type: formatString(detail?.type),
            "Estimated Time to Recover": handleOtherValues(
              detail,
              "timeWillTakeToRecover"
            ),
            "Severity of Disability": handleOtherValues(
              detail,
              "severeDisability"
            ),
            Specialist: handleOtherValues(detail, "specialist"),
            Recommendation: handleOtherValues(detail, "otherRecommendation"),
            "Long Term Sequelae": handleOtherValues(
              detail,
              "anyLongTermSequelae"
            ),
            "Treatment and Rehabilitation": handleOtherValues(
              detail,
              "treatmentAndRehabiliation"
            ),
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
