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
    anatomy: [],
    psychologicalInjuries: [],
    // Add other fields as needed
  });

  const nextStep = (values) => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    console.log("Form Submitted", values)
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
            <StepComponent {...formikProps} 
            prevStep={prevStep} 
            nextStep={nextStep} 
            // formState={formData} 
            // handleChange={()=>handleChange}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;
