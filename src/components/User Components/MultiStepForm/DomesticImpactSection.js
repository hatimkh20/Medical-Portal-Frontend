import React from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField"; // Ensure this is correctly imported
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";

import "../Common/Common.css";

const DomesticImpactSection = ({ prevStep, nextStep }) => {
  const options = ["Personal Care", "Lifting Items", "Shopping", "Sex", "Gym"];

  const severityOptions = [
    { value: "mild", label: "Mild" },
    { value: "moderate", label: "Moderate" },
    { value: "severe", label: "Severe" },
  ];

  const renderSymptomDetails = (symptom) => (
    <div>
      <div className="input-group">
        <SelectField
          label="What was the severity at the time of accident?"
          name={`${symptom}_severity_accident`}
          options={severityOptions.map((opt) => opt.label)}
        />
        <SelectField
          label="What is the current condition?"
          name={`${symptom}_severity_current`}
          options={severityOptions.map((opt) => opt.label)}
        />
      </div>
    </div>
  );

  return (
    <FormLayout title="SECTION: DOMESTIC IMPACT">
      <p className="form-description">
        Add severity of injury to each aspect of domestic impact.
      </p>
      {options.map((symptom) => (
        <Accordion key={symptom} title={symptom}>
          {renderSymptomDetails(symptom)}
        </Accordion>
      ))}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        {/* <Button type="submit" onClick={nextStep}>
          Proceed to Next Step
        </Button> */}
      </div>
    </FormLayout>
  );
};

export default DomesticImpactSection;
