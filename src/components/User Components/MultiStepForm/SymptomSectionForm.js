import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "../Common/Common.css";
import { symptomSeverity, timeAfterAccident } from "./Constants";
import { toCamelCase } from "../Common/util";

const SymptomSectionForm = ({ values, handleChange, prevStep, nextStep, errors }) => {
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const newOpenAccordions = {};
    values?.anatomy?.forEach((symptom) => {
      const fieldNamePrefix = `symptom_${toCamelCase(symptom)}_`;
      const fieldsToCheck = [
        `${fieldNamePrefix}startTime`,
        `${fieldNamePrefix}severityOnset`,
        `${fieldNamePrefix}currentSeverity`,
        `${fieldNamePrefix}resolvedDuration`,
      ];

      if (fieldsToCheck.some((field) => errors[field])) {
        newOpenAccordions[symptom] = true;
      }
    });
    setOpenAccordions(newOpenAccordions);
  }, [errors, values?.anatomy]);

  const handleInputChange = (e) => {
    handleChange(e); // Call Formik's handleChange
  };

  const renderSymptomDetails = (symptom) => {
    const fieldNamePrefix = `symptom_${toCamelCase(symptom)}_`;
    return (
      <div>
        <div className="input-group">
          <SelectField
            label="When did the symptoms start?"
            name={`${fieldNamePrefix}startTime`}
            options={timeAfterAccident}
            onChange={handleInputChange}
            value={values[`${fieldNamePrefix}startTime`]}
            values={values}
          />
          <SelectField
            label="Select severity at onset"
            name={`${fieldNamePrefix}severityOnset`}
            options={symptomSeverity}
            onChange={handleInputChange}
            value={values[`${fieldNamePrefix}severityOnset`]}
          />
        </div>
        <div className="input-group">
          <SelectField
            label="What is the severity now?"
            name={`${fieldNamePrefix}currentSeverity`}
            options={symptomSeverity}
            onChange={handleInputChange}
            value={values[`${fieldNamePrefix}currentSeverity`]}
          />
          <SelectField
            label="If symptoms have resolved, how long ago was this?"
            name={`${fieldNamePrefix}resolvedDuration`}
            options={timeAfterAccident}
            onChange={handleInputChange}
            value={values[`${fieldNamePrefix}resolvedDuration`]}
            values={values}
          />
        </div>
      </div>
    );
  };

  return (
    <FormLayout title="SECTION: SYMPTOMS">
      <p className="form-description">
        Add the onset and severity for the selected symptoms
      </p>
      {values?.anatomy?.map((symptom) => {
        const isOpenInitially = !!openAccordions[symptom];

        return (
          <Accordion
            key={symptom}
            title={symptom}
            isOpenInitially={isOpenInitially}
          >
            {renderSymptomDetails(symptom)}
          </Accordion>
        );
      })}
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
