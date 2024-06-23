// src/components/MultiStepForm/MultiStepForm.js
import React, { useState } from "react";
import { Formik, Form } from "formik";
import ClaimantDetails from "./ClaimantDetails";
import AccidentDetails from "./AccidentDetails";
import AccidentSectionForm from "./AccidentSection"; // Import the new form component
import {
  claimantDetailsSchema,
  accidentDetailsSchema,
  accidentSectionSchema,
} from "./formSchema";
import "./Form.css";
import AnatomySectionForm from "./AnatomySection";
import SymptomSectionForm from "./SymptomSectionForm";
import TreatmentSection from "./TreatmentSection";
import LivelihoodSection from "./LivelihoodSection";
import EducationSection from "./EducationSection";
import DomesticImpactList from "./DomesticImpactList";
import DomesticImpactSection from "./DomesticImpactSection";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
    vehicleType: "", // Add new fields as needed
    otherVehicleType: "",
    vehicleWheels: "",
    // Continue adding other new fields here
  });

  const nextStep = (values) => {
    setFormData({ ...formData, ...values });
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
    nextStep(values);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Formik
            initialValues={formData}
            //validationSchema={claimantDetailsSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <ClaimantDetails {...formikProps} />
              </Form>
            )}
          </Formik>
        );
      case 2:
        return (
          <Formik
            initialValues={formData}
            //validationSchema={accidentDetailsSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <AccidentDetails {...formikProps} prevStep={prevStep} />
              </Form>
            )}
          </Formik>
        );
      case 3:
        return (
          <Formik
            initialValues={formData}
            //validationSchema={accidentSectionSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <AccidentSectionForm {...formikProps} prevStep={prevStep} />
              </Form>
            )}
          </Formik>
        );
      case 4:
        return (
          <Formik
            initialValues={formData}
            //validationSchema={accidentSectionSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <AnatomySectionForm {...formikProps} prevStep={prevStep} />
              </Form>
            )}
          </Formik>
        );

      case 5:
        return (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
            {(formikProps) => (
              <Form>
                <SymptomSectionForm
                  {...formikProps}
                  selectedAnatomies={formData.selectedAnatomies}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              </Form>
            )}
          </Formik>
        );

        case 6:
        return (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
            {(formikProps) => (
              <Form>
                <TreatmentSection
                  {...formikProps}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              </Form>
            )}
          </Formik>
        );

        case 7:
        return (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
            {(formikProps) => (
              <Form>
                <LivelihoodSection
                  {...formikProps}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              </Form>
            )}
          </Formik>
        );

        case 8:
        return (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
            {(formikProps) => (
              <Form>
                <EducationSection
                  {...formikProps}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              </Form>
            )}
          </Formik>
        );

        case 9:
        return (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
            {(formikProps) => (
              <Form>
                <DomesticImpactList
                  {...formikProps}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              </Form>
            )}
          </Formik>
        );

        case 10:
        return (
          <Formik initialValues={formData} onSubmit={handleSubmit}>
            {(formikProps) => (
              <Form>
                <DomesticImpactSection
                  {...formikProps}
                  prevStep={prevStep}
                />
              </Form>
            )}
          </Formik>
        );

      default:
        return null;
    }
  };

  return <div className="multi-step-form-container">{renderStep()}</div>;
};

export default MultiStepForm;
