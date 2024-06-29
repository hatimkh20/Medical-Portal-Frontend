// src/components/MultiStepForm/MultiStepForm.js
import React, { useState } from "react";
import { Formik, Form } from "formik";
import "./Form.css";

const MultiStepForm = ({steps}) => {
  const [currentStep, setCurrentStep] = useState(0);
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
    vehicleType: "",
    otherVehicleType: "",
    vehicleWheels: "",
    // Add other fields as needed
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

  const StepComponent = steps.getStepComponent(currentStep);
  
  return (
    <div className="multi-step-form-container">
      <Formik
        initialValues={formData}
        validationSchema={steps.getStepValidationSchema(currentStep)}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <StepComponent {...formikProps} prevStep={prevStep} nextStep={nextStep} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;
