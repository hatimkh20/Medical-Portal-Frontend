import React from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField"; // Ensure this is correctly imported
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";

import "../Common/Common.css";
import { symptomSeverity, timeAfterAccident } from "./Constants";

const SymptomSectionForm = ({ values, prevStep, nextStep }) => {
  const symptoms = [
    "Neck",
    "Head",
    "High blood pressure",
    "Nose bleed",
    "Right Hip",
  ]; // Example anatomies

  const severityOptions = [
    { value: "mild", label: "Mild" },
    { value: "moderate", label: "Moderate" },
    { value: "severe", label: "Severe" },
  ];

  const timeOptions = [
    { value: "1_hour", label: "1 hour after accident" },
    { value: "3_hours", label: "3 hours after accident" },
    { value: "1_day", label: "1 day after accident" },
  ];

  const renderSymptomDetails = (symptom) => (
    <div>
      <div className="input-group">
        <SelectField
          label="When did the symptoms start?"
          name={`${symptom}_start_time`}
          options={timeAfterAccident}
        />
        <SelectField
          label="Select severity at onset"
          name={`${symptom}_severity_onset`}
          options={symptomSeverity}
        />
      </div>
      <div className="input-group">
        <SelectField
          label="What is the severity now?"
          name={`${symptom}_current_severity`}
          options={symptomSeverity}
        />
        <SelectField
          label="If symptoms have resolved, how long ago was this?"
          name={`${symptom}_resolved_duration`}
          options={timeAfterAccident}
        />
      </div>
      
    </div>
  );

  return (
    <FormLayout title="SECTION: SYMPTOMS">
      <p className="form-description">
        Add the onset and severity for the selected symptoms
      </p>
      {values?.anatomy?.map((symptom) => (
        <Accordion key={symptom} title={symptom}>
          {renderSymptomDetails(symptom)}
        </Accordion>
      ))}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit" onClick={nextStep}>
          Proceed to Next Step
        </Button>
      </div>
    </FormLayout>
  );
};

export default SymptomSectionForm;
