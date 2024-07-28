import React from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField"; // Ensure this is correctly imported
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";

import "../Common/Common.css";
import { presentSeverityOptions } from "./Constants";
import { toCamelCase } from "../Common/util";

const DomesticImpactSection = ({ values, prevStep, nextStep }) => {

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
          name={`${symptom}_severityAtAccident`}
          options={severityOptions.map((opt) => opt.label)}
        />
        <SelectField
          label="What is the current condition?"
          name={`${symptom}_currentCondition`}
          options={presentSeverityOptions}
        />
      </div>
    </div>
  );

  return (
    <FormLayout title="SECTION: DOMESTIC IMPACT">
      <p className="form-description">
        Add severity of injury to each aspect of domestic impact.
      </p>
      {values?.domesticLifeActivities?.map((symptom) => (
        <Accordion key={symptom} title={symptom}>
          {renderSymptomDetails(`domesticImpact_${toCamelCase(symptom)}`)}
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

export default DomesticImpactSection;
