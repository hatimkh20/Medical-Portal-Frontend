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
            validationSchema={claimantDetailsSchema}
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
            validationSchema={accidentDetailsSchema}
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
            validationSchema={accidentSectionSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <AccidentSectionForm {...formikProps} prevStep={prevStep} />
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
