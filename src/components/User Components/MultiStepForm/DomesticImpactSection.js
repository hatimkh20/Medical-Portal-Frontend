import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField"; // Ensure this is correctly imported
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";

import "../Common/Common.css";
import { presentSeverityOptions, resolutionOptions } from "./Constants";
import { toCamelCase } from "../Common/util";

const DomesticImpactSection = ({ values, prevStep, nextStep, errors }) => {
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const newOpenAccordions = {};
    values?.domesticLifeActivities?.forEach((symptom) => {
      const severityAtAccidentName = `domesticImpact_${toCamelCase(
        symptom
      )}_severityAtAccident`;
      const currentConditionName = `domesticImpact_${toCamelCase(
        symptom
      )}_currentCondition`;

      if (errors[severityAtAccidentName] || errors[currentConditionName]) {
        newOpenAccordions[symptom] = true;
      }
    });
    setOpenAccordions(newOpenAccordions);
  }, [errors, values?.domesticLifeActivities]);

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
      {values[`${symptom}_currentCondition`] === "Presently Resolved" && (
          <div className="input-group">
            <SelectField
              label="When was it resolved?"
              name={`${symptom}_resolvedFollowUpAction`}
              options={resolutionOptions}
            />
          </div>
        )}
    </div>
  );

  return (
    <FormLayout title=" DOMESTIC IMPACT">
      <p className="form-description">
        Add severity of injury to each aspect of domestic impact.
      </p>
      {values?.domesticLifeActivities?.map((symptom) => {
        const severityAtAccidentName = `domesticImpact_${toCamelCase(
          symptom
        )}_severityAtAccident`;
        const currentConditionName = `domesticImpact_${toCamelCase(
          symptom
        )}_currentCondition`;

        // Determine if the accordion should be open initially
        const isOpenInitially = !!openAccordions[symptom];

        return (
          <Accordion
            key={symptom}
            title={symptom}
            isOpenInitially={isOpenInitially}
          >
            {renderSymptomDetails(`domesticImpact_${toCamelCase(symptom)}`)}
          </Accordion>
        );
      })}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Save & Proceed</Button>
      </div>
    </FormLayout>
  );
};

export default DomesticImpactSection;
