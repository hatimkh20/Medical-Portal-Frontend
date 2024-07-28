import React, { useState } from "react";
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
}) => {

  const renderAnatomyOnsets = (anatomy) => {
    const palpationName = `${anatomy}_palpation`;
    const observationName = `${anatomy}_observation`;

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
      {values?.anatomy?.map((item) => (
        <Accordion key={item} title={item}>
          {renderAnatomyOnsets(`physicalExamination_${toCamelCase(item)}`)}
        </Accordion>
      ))}
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
