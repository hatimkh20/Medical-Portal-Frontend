import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "../Common/Common.css";
import { toCamelCase, getAnatomyOptions } from "../Common/util";

const PhysicalExaminationSection = ({
  values,
  prevStep,
  handleChange,
  handleBlur,
  errors,
}) => {
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    // Check for errors and open corresponding accordions
    const newOpenAccordions = {};
    Object.values(values.anatomy || {}).forEach(({ name }) => {
      // Extract `name` from object
      const anatomyName = `physicalExamination_${toCamelCase(name)}`;
      const palpationName = `${anatomyName}_palpation`;
      const observationName = `${anatomyName}_observation`;

      if (errors[palpationName] || errors[observationName]) {
        newOpenAccordions[name] = true;
      }
    });
    setOpenAccordions(newOpenAccordions);
  }, [errors, values.anatomy]);

  
  const renderAnatomyOnsets = (formattedAnatomyName, anatomyName) => {
    const palpationName = `${formattedAnatomyName}_palpation`;
    const observationName = `${formattedAnatomyName}_observation`;

    const { palpationOptions, flexionOptions } = getAnatomyOptions(anatomyName);

    return (
      <div>
        <div className="input-group">
          <SelectField
            label="Observations on Palpation"
            name={palpationName}
            options={palpationOptions}
            value={values[palpationName]}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
          />
          <SelectField
            label="Observations on flexion/extension or abduction"
            name={observationName}
            options={flexionOptions}
            value={values[observationName]}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  };

  return (
    <FormLayout title="EXAMINATION">
      <p className="form-description">
        Add onset and severity of the selected Anatomy
      </p>
      {Object.values(values?.anatomy || {}).map(({ name, trauma }) => {
        const formattedName = `physicalExamination_${toCamelCase(name)}`;
        return (
          <Accordion
            key={name}
            title={`${name} - ${trauma}`}
            isOpenInitially={!!openAccordions[name]}
          >
            {renderAnatomyOnsets(formattedName, name)}
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

export default PhysicalExaminationSection;
