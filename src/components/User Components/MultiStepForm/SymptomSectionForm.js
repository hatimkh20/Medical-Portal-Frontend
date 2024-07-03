import React from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "../Common/Common.css";
import { symptomSeverity, timeAfterAccident } from "./Constants";
import { toCamelCase } from "../Common/util";

const SymptomSectionForm = ({ values, handleChange, prevStep, nextStep }) => {
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

  const handleInputChange = (e) => {
    handleChange(e); // Call Formik's handleChange
  };


  const renderSymptomDetails = (symptom) => {
    const fieldNamePrefix = `symptons_${toCamelCase(symptom)}_`;
    return (<div>
      <div className="input-group">
        <SelectField
          label="When did the symptoms start?"
          name={`${fieldNamePrefix}StartTime`}
          options={timeAfterAccident}
          onChange={handleInputChange}
          value={values[`${fieldNamePrefix}StartTime`]}
        />
        <SelectField
          label="Select severity at onset"
          name={`${fieldNamePrefix}SeverityOnset`}
          options={symptomSeverity}
          onChange={handleInputChange}
          value={values[`${fieldNamePrefix}SeverityOnset`]}
        />
      </div>
      <div className="input-group">
        <SelectField
          label="What is the severity now?"
          name={`${fieldNamePrefix}CurrentSeverity`}
          options={symptomSeverity}
          onChange={handleInputChange}
          value={values[`${fieldNamePrefix}CurrentSeverity`]}
        />
        <SelectField
          label="If symptoms have resolved, how long ago was this?"
          name={`${fieldNamePrefix}ResolvedDuration`}
          options={timeAfterAccident}
          onChange={handleInputChange}
          value={values[`${fieldNamePrefix}ResolvedDuration`]}
        />
      </div>
    </div>
  );
  }

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
        <Button type="submit">
          Proceed to Next Step
        </Button>
      </div>
    </FormLayout>
  );
};

export default SymptomSectionForm;
