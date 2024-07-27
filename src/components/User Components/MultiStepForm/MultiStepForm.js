// src/components/MultiStepForm/MultiStepForm.js
import React, { useState } from "react";
import { Formik, Form } from "formik";
import "./Form.css";
import usePost from "../../../hooks/usePost";
import LoadingErrorWrapper from "../Common/LoadingErrorWrapper";
import makePayload from "./makePayload";

const MultiStepForm = ({steps}) => {
  const [reportId, setReportId] = useState(null);

  const [currentStep, setCurrentStep] = useState(18);
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
    domesticLifeActivities: [],
    // Add other fields as needed
  });

  const { data: response, loading, error, postRequest: saveForm } = usePost('/api/report', {
    headers: { 'Content-Type': 'application/json' },
  });

  const nextStep = (values) => {
    if(steps.isValid(currentStep+1))
      setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values) => {
    console.log("Form Submitted", values)
    setFormData({ ...formData, ...values });
    console.log("Saving for: " + JSON.stringify(makePayload(currentStep)));
    const reportId = response?.data?._id;
    await saveForm(makePayload(currentStep, values, reportId));

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
            <LoadingErrorWrapper loading={loading} error={error}>
              <StepComponent {...formikProps} 
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
