import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "../Common/Common.css";
import { observations, palpations } from "./Constants";
import { toCamelCase } from "../Common/util";

const PhysicalExaminationSection = ({
  values,
  prevStep,
  handleChange,
  handleBlur,
  errors
}) => {
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    // Check for errors and open corresponding accordions
    const newOpenAccordions = {};
    Object.values(values.anatomy || {}).forEach(({ name }) => { // Extract `name` from object
      const anatomyName = `physicalExamination_${toCamelCase(name)}`;
      const palpationName = `${anatomyName}_palpation`;
      const observationName = `${anatomyName}_observation`;

      if (errors[palpationName] || errors[observationName]) {
        newOpenAccordions[name] = true;
      }
    });
    setOpenAccordions(newOpenAccordions);
  }, [errors, values.anatomy]);

  const renderAnatomyOnsets = (anatomyName) => {
    const palpationName = `${anatomyName}_palpation`;
    const observationName = `${anatomyName}_observation`;

    return (
      <div>
        <div className="input-group">
          <SelectField
            label="Observations on Palpation"
            name={palpationName}
            options={palpations}
            value={values[palpationName]}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
          />
          <SelectField
            label="Observations on flexion/extension or abduction"
            name={observationName}
            options={observations}
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
    <FormLayout title="SECTION: PHYSICAL EXAMINATION">
      <p className="form-description">
        Now, you have to add the onset and severity of the selected physical
        examination
      </p>
      {Object.values(values?.anatomy || {}).map(({ name, trauma }) => {
        const formattedName = `physicalExamination_${toCamelCase(name)}`;
        return (
          <Accordion key={name} title={`${name} - ${trauma || "No trauma specified"}`} isOpenInitially={!!openAccordions[name]}>
            {renderAnatomyOnsets(formattedName)}
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

export default PhysicalExaminationSection;
