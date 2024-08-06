import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import "./Form.css";
import usePost from "../../../hooks/usePost";
import LoadingErrorWrapper from "../Common/LoadingErrorWrapper";
import makePayload from "./makePayload";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router";
import { getDateWithoutTZ } from "../Common/util";

const MultiStepForm = ({ steps }) => {
  console.log("RENDERS")
  const [currentStep, setCurrentStep] = useState(0);
  
  const {id} = useParams();

  console.log(id, "idd ")

  const mapResponseToFormData = (response) => {
    console.log("MApping Func tion Called")
    const formData = {
      currentStepKey: response.currentReportSectionStatus,
      fullName: "",
      dateOfBirth: "",
      address: "",
      occupation: "",
      dateOfExamination: "",
      whichRecordsSeen: "",
      medicalRecordsProvided: "",
      hasPhotoIDConfirmed: "",
      dateOfAccident: "",
      ageAtTimeOfAccident: "",
      whichTypeOfIDChecked: "",
      vehicleType: "",
      otherVehicleType: "",
      vehicleWheels: "",
      anatomy: [],
      psychologicalInjuries: [],
      domesticLifeActivities: [],
      medicalNotes:[],
      selectedBibliographies: []
      // Add other fields as needed
    }

    // Helper function to set formData based on the response keys and values
    const setFormData = (path, value) => {
        const keys = path.split('.');
        let temp = formData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) {
                temp[keys[i]] = {};
            }
            temp = temp[keys[i]];
        }

        temp[keys[keys.length - 1]] = value;
    };

    // Mapping based on the response structure
        const claimantDetails = response.claimantDetails || {};
        formData.fullName = claimantDetails.fullName;
        setFormData('fullName', claimantDetails.fullName);
        setFormData('dateOfBirth', getDateWithoutTZ(claimantDetails.dateOfBirth));
        setFormData('address', claimantDetails.address);
        setFormData('occupation', claimantDetails.occupation);
        setFormData('whichTypeOfIDChecked', claimantDetails.typeOfIdChecked);
        setFormData('dateOfExamination', getDateWithoutTZ(claimantDetails.dateOfExamination));
        setFormData('whichRecordsSeen', claimantDetails.recordsWereSeen);
        setFormData('dateOfAccident', getDateWithoutTZ(claimantDetails.dateOfAccident));
        setFormData('ageAtTimeOfAccident', claimantDetails.ageAtTimeOfAccident);
        setFormData('medicalRecordsProvided', claimantDetails.medicalReportsProvided);
        setFormData('hasPhotoIDConfirmed', claimantDetails.photoIdConfirmed);
    

        const accidentDetails = response.accidentDetails || {};
        setFormData('vehicleType', accidentDetails.vehicleType);
        setFormData('otherVehicleType', accidentDetails.otherVehicleType);
        setFormData('vehicleWheels', accidentDetails.vehicleWheels);
    

        const accidentSection = response.accidentSection || {};
        setFormData('accidentTime', accidentSection.timeOfAccident);
        setFormData('impactSpeed', accidentSection.speedOfImpact);
        setFormData('accidentLocation', accidentSection.accidentLocation);
        setFormData('vehicleDamage', accidentSection.levelOfDamageVehicle);

        if (accidentSection.details) {
            accidentSection.details.forEach(detail => {
                setFormData(detail.question, detail.answer);
            });
        }
    

      const anatomySection = response.anatomySection || {};
      setFormData('anatomy', anatomySection.anatomySelectedOptions);
      setFormData('psychologicalInjuries', anatomySection.psychologicalInjuriesSelectedOptions);
  

      const symptomsSection = response.symptomsSection || {};
      if (symptomsSection.questions) {
          symptomsSection.questions.forEach(symptom => {
              setFormData(`symptom_${symptom.type}_startTime`, symptom.symptomsStart);
              setFormData(`symptom_${symptom.type}_currentSeverity`, symptom.severityNow);
              setFormData(`symptom_${symptom.type}_severityOnset`, symptom.severityOnset);
              setFormData(`symptom_${symptom.type}_resolvedDuration`, symptom.symptomsResolvedDuration);
          });
      }
    

      const treatmentSection = response.treatmentSection || {};
      const immediateTreatment = treatmentSection.immediateTreatment || {};
      setFormData('serviceAtAccident', immediateTreatment.serviceAttendedSceneOfAccident);
      setFormData('postLocationAccident', immediateTreatment.locationWentAfterAccident);
      setFormData('treatmentAtAccident', immediateTreatment.treatmentReceivedAtSceneOfAccident);
      setFormData('postLocationBy', immediateTreatment.howGetThere);

      const laterTreatment = treatmentSection.laterTreatment || {};
      setFormData('laterTreatmentLocation', laterTreatment.whereTreatmentReceived);
      setFormData('receivedTreatment', laterTreatment.whatTreatmentReceived);
      setFormData('treatmentTimeAfterAccident', laterTreatment.durationOfTreatmentReceivedAfterAccident);
      setFormData('imagingOrScans', laterTreatment.whatImagingOrScansDone);
    

      const livehoodEducationSection = response.livehoodEducationSection || {};
      setFormData('employmentStatus', livehoodEducationSection.employmentStatus);
  

      const employmentEducationSection = response.employmentEducationSection || {};
      setFormData('currentEmployment', employmentEducationSection.studyingWhere);
      setFormData('durationTakenOffFromSchoolAfterAccident', employmentEducationSection.durationTakenOffFromSchoolAfterAccident);
      setFormData('hoursEmployment', employmentEducationSection.hoursGaveToEducation);
      setFormData('phasedReturnToSchoolManagement', employmentEducationSection.phasedReturnToSchoolManagement);
  

      const domesticSection = response.domesticSection || {};
      setFormData('domesticLifeActivities', domesticSection.domesticImpactedAreas);


      const domesticImpactSection = response.domesticImpactSection || {};
      if (domesticImpactSection.questions) {
          domesticImpactSection.questions.forEach(question => {
              setFormData(`domesticImpact_${question.type}_severityAtAccident`, question.severityAtAccident);
              setFormData(`domesticImpact_${question.type}_currentCondition`, question.currentCondition);
          });
      }
  

      const medicalHistorySection = response.medicalHistorySection || {};
      setFormData('pastMedicalInjuries', medicalHistorySection.detailsOfPastMedicalInjuries);

      if (medicalHistorySection.medicalNotes) {
          medicalHistorySection.medicalNotes.forEach(note => {
              setFormData(`medicalNotes_${note.fileName}_fileName`, note.fileName);
              setFormData(`medicalNotes_${note.fileName}_expertReview`, note.expertReview);
          });
      }
  

      const generalObservationSection = response.generalObservationSection || {};
      setFormData('physicalAppearance', generalObservationSection.physicalAppearance);
      setFormData('presenceOfScars', generalObservationSection.presenceOfBruisesScarsMarks);
      setFormData('otherPresenceOfScars', generalObservationSection.otherPresenceOfBruisesScarsMarks);
      setFormData('conversation', generalObservationSection.holdingIntelligentConversation);
      setFormData('otherConversation', generalObservationSection.otherHoldingIntelligentConversation);
      setFormData('eyeContact', generalObservationSection.goodEyeContact);
      setFormData('otherEyeContact', generalObservationSection.otherGoodEyeContact);
      setFormData('mentalState', generalObservationSection.mentalState);
      setFormData('otherMentalState', generalObservationSection.otherMentalState);
  

      const physicalExaminationSection = response.physicalExaminationSection || {};
      if (physicalExaminationSection.questions) {
          physicalExaminationSection.questions.forEach(question => {
              setFormData(`physicalExamination_${question.type}_palpation`, question.observationOfPalpation);
              setFormData(`physicalExamination_${question.type}_observation`, question.observationOnFlexios);
          });
      }
  

      const diagnosisSection = response.diagnosisSection || {};
      
      if (diagnosisSection.physicalInjuries && diagnosisSection.physicalInjuries.questions) {
          diagnosisSection.physicalInjuries.questions.forEach(injury => {
              setFormData(`physicalInjuriesDiagnosis_${injury.type}_injury`, injury.injury);
              setFormData(`physicalInjuriesDiagnosis_${injury.type}_otherInjury`, injury.otherInjury);
              setFormData(`physicalInjuriesDiagnosis_${injury.type}_injuryMechanism`, injury.mechanismOfInjury);
              setFormData(`physicalInjuriesDiagnosis_${injury.type}_otherInjuryMechanism`, injury.otherMechanismOfInjury);
              setFormData(`physicalInjuriesDiagnosis_${injury.type}_trauma`, injury.traumaItCaused);
              setFormData(`physicalInjuriesDiagnosis_${injury.type}_otherTrauma`, injury.otherTraumaItCaused);
          });
      }

      if (diagnosisSection.psychologicalInjuries && diagnosisSection.psychologicalInjuries.questions) {
          diagnosisSection.psychologicalInjuries.questions.forEach(injury => {
              setFormData(`psychologicalInjuriesDiagnosis_${injury.type}_injuryMechanism`, injury.mechanismOfInjury);
              setFormData(`psychologicalInjuriesDiagnosis_${injury.type}_otherInjuryMechanism`, injury.otherMechanismOfInjury);
          });
      }

      const opinionSection = response.opinionSection || {};
      if (opinionSection.physicalInjuries && opinionSection.physicalInjuries.questions) {
        opinionSection.physicalInjuries.questions.forEach(question => {
          setFormData(`physicalInjuriesOpinion_${question.type}_injuryOpinion`, question.opinion);
        });
        
      }
    
      if (opinionSection.psychologicalInjuries && opinionSection.psychologicalInjuries.questions) {
        opinionSection.psychologicalInjuries.questions.forEach(question => {
          setFormData(`psychologicalInjuriesOpinion_${question.type}_injuryOpinion`, question.opinion);
        });
      }

      const exceptionalCircumstances = opinionSection.exceptionalCircumstances || {};
      setFormData('claimedExceptionalCircumstances', exceptionalCircumstances.claimantClaimedAnyExceptionalCircumstance);
      setFormData('exceptionalCircumstancesInAccident', exceptionalCircumstances.anyExceptionalCircumstanceInAccident);
      setFormData('injuriesExceptionallySevere', exceptionalCircumstances.injuriesSustainedInAccident);
      setFormData('agreementAsMedicalExpert', exceptionalCircumstances.inAgreementAsMedicalExpert);
      setFormData('injuriesResultOfExceptionalCircumstances', exceptionalCircumstances.injuriesResultOfExceptionalCircumstance);
      setFormData('anythingElse', exceptionalCircumstances.anythingElse);
    
    
      const prognosisSection = response.prognosisSection || {};
      if (prognosisSection.physicalInjuries && prognosisSection.physicalInjuries.questions) {
        prognosisSection.physicalInjuries.questions.forEach(question => {
          setFormData(`physicalInjuriesPrognosis_${question.question}`, question.answer);
        });
      }
    
      if (prognosisSection.psychologicalInjuries && prognosisSection.psychologicalInjuries.questions) {
        prognosisSection.psychologicalInjuries.questions.forEach(question => {
          setFormData(`psychologicalInjuriesPrognosis_${question.question}`, question.answer);
        });
      }
    
      const prognosisDetailedSection = response.prognosisDetailedSection || {};
      if (prognosisDetailedSection.physicalInjuries && prognosisDetailedSection.physicalInjuries.questions) {
        prognosisDetailedSection.physicalInjuries.questions.forEach(question => {
          setFormData(`prognosisDetailed_${question._id}`, question);
        });
      }
    
      if (prognosisDetailedSection.psychologicalInjuries && prognosisDetailedSection.psychologicalInjuries.questions) {
        prognosisDetailedSection.psychologicalInjuries.questions.forEach(question => {
          setFormData(`psychologicalPrognosisDetailed_${question._id}`, question);
        });
      }
    
      const statementOfTruthSection = response.statementOfTruthSection || {};
      if (statementOfTruthSection.predefinedStatement) {
        setFormData('selectedStatement', {
          name: statementOfTruthSection.predefinedStatement.name,
          content: statementOfTruthSection.predefinedStatement.statement
        });
      }
    
      const expertBibliographySection = response.expertBibliographySection || {};
      if (expertBibliographySection.selectedBibliography) {
        expertBibliographySection.selectedBibliography.forEach(bibliography => {
          formData.selectedBibliographies.push({
            id: bibliography._id,
            detail: bibliography.bibliography
          });
        });
      }
    
  

    console.log("MAPPING RESULT", formData, response)

    return formData;
};

const {data: formData, loading: loadingOnGetForm, error:errorOnGetForm} = useFetch(`/api/report/specific/${id}`, null, mapResponseToFormData);

  const { data: response, loading: loadingOnSave, error: errorOnSave, postRequest: saveForm } = usePost('/api/report', {
    headers: { 'Content-Type': 'application/json' },
  });

  const [prevValues, setPrevValues] = useState({});

  useEffect(() => {
    setPrevValues(formData);
    steps && setCurrentStep(steps?.getCurrentStepByKey(formData?.currentStepKey));
  }, [formData])

  const nextStep = (values) => {
    if (steps.isValid(currentStep + 1)) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values) => {

    console.log(values)
    console.log(values.selectedBibliographies)
    if(JSON.stringify(prevValues) != JSON.stringify(values)){
      await saveForm(makePayload(currentStep, values, response?.data?._id || id));
      setPrevValues(values);
    }
    else{
      console.log("No changes detected, skipping save.");
    }
  
    nextStep(values);
  };

  const StepComponent = steps.getStepComponent(currentStep);

  if (!formData || !Object.keys(formData).length) {
    // Optionally render a loading state while fetching initial values
    return <LoadingErrorWrapper loading={loadingOnGetForm} error={errorOnGetForm}></LoadingErrorWrapper>

  }

  return (
    <div className="multi-step-form-container">
      <Formik
        initialValues={formData}
        validationSchema={steps.getStepValidationSchema(currentStep)}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
              <LoadingErrorWrapper loading={loadingOnSave} error={errorOnSave}>

                <StepComponent
                  {...formikProps}
                  // handleChange={formikProps.handleChange}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  // formState={formData}
                  // handleChange={()=>handleChange}
                />
              </LoadingErrorWrapper>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;
