import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "../Common/Common.css";
import { symptomSeverity, timeAfterAccident } from "./Constants";
import { toCamelCase } from "../Common/util";

const SymptomSectionForm = ({
  values,
  handleChange,
  prevStep,
  nextStep,
  errors,
}) => {
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const newOpenAccordions = {};
    values?.anatomy?.forEach(({ name }) => {
      // Extract name from anatomy object
      const fieldNamePrefix = `symptom_${toCamelCase(name)}_`;
      const fieldsToCheck = [
        `${fieldNamePrefix}startTime`,
        `${fieldNamePrefix}severityOnset`,
        `${fieldNamePrefix}currentSeverity`,
        `${fieldNamePrefix}resolvedDuration`,
      ];

      if (fieldsToCheck.some((field) => errors[field])) {
        newOpenAccordions[name] = true;
      }
    });
    setOpenAccordions(newOpenAccordions);
  }, [errors, values?.anatomy]);

  const handleInputChange = (e) => {
    handleChange(e); // Call Formik's handleChange
  };

  const renderSymptomDetails = ({ name }) => {
    const fieldNamePrefix = `symptom_${toCamelCase(name)}_`;
    const currentSeverity = values[`${fieldNamePrefix}currentSeverity`];
  
    return (
      <div>
        <div className="input-group">
          <SelectField
            label="When was the onset of symptoms"
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
            value={currentSeverity}
          />
          {currentSeverity?.toLowerCase() === "resolved" && (
            <SelectField
              label="If symptoms have resolved, how long ago was this?"
              name={`${fieldNamePrefix}resolvedDuration`}
              options={timeAfterAccident}
              onChange={handleInputChange}
              value={values[`${fieldNamePrefix}resolvedDuration`]}
              values={values}
            />
          )}
        </div>
      </div>
    );
  };
  

  return (
    <FormLayout title=" SYMPTOMS">
      <p className="form-description">
        Add the onset and severity for the selected symptoms
      </p>
      {values?.anatomy?.map(({ name, trauma }) => {
        // Extract name & trauma
        const isOpenInitially = !!openAccordions[name];
        const title = `${name} - ${trauma}`; // Combine name & trauma

        return (
          <Accordion key={name} title={title} isOpenInitially={isOpenInitially}>
            {renderSymptomDetails({ name })}
          </Accordion>
        );
      })}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default SymptomSectionForm;
