// src/components/MultiStepForm/MultiStepForm.js
import React, { useState } from "react";
import { Formik, Form } from "formik";
import ClaimantDetails from "./ClaimantDetails";
import AccidentDetails from "./AccidentDetails";
import { claimantDetailsSchema, accidentDetailsSchema } from "./formSchema";
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
    // Add other form fields here
  });

  const nextStep = (values) => {
    console.log("Next Step");
    setFormData({ ...formData, ...values });
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values) => {
    console.log("Submitting form", values);
    setFormData({ ...formData, ...values });
    // Save data to the backend
    try {
      await fetch('/api/saveFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...values }),
      });
    } catch (error) {
      console.error('Error:', error);
    }
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
            {({ values }) => (
              <Form>
                <ClaimantDetails values={values} />
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
            {({ values }) => (
              <Form>
                <AccidentDetails values={values} prevStep={prevStep} />
              </Form>
            )}
          </Formik>
        );
      // Add cases for other steps
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form-container">
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
