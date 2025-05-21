import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";
import "../Common/Common.css";
import {
  mechanismPsychologicalTraumaOptions,
  mechanismWhiplashOptions,
  mechanismNonWhiplashOptions,
  observations,
  traumaOptions,
  injuryTypeByAnatomy,
} from "./Constants";
import RadioButton from "../Common/RadioButton";
import { toCamelCase } from "../Common/util";

const DiagnosisSection = ({ values, prevStep, errors, handleChange, handleBlur }) => {
  const [selectedInjuries, setSelectedInjuries] = useState({});
  const [selectedMechanisms, setSelectedMechanisms] = useState({});
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const updatedOpenAccordions = {};

    values?.anatomy?.forEach(({ name }) => {
      const injuryName = `physicalInjuriesDiagnosis_${toCamelCase(name)}_injury`;
      const injuryOtherName = `physicalInjuriesDiagnosis_${toCamelCase(name)}_otherInjury`;
      const mechanismName = `physicalInjuriesDiagnosis_${toCamelCase(name)}_injuryMechanism`;

      if (errors[injuryName] || errors[injuryOtherName] || errors[mechanismName]) {
        updatedOpenAccordions[name] = true;
      }
    });

    values?.psychologicalInjuries?.forEach((item) => {
      const mechanismName = `psychologicalInjuriesDiagnosis_${toCamelCase(item)}_injuryMechanism`;

      if (errors[mechanismName]) {
        updatedOpenAccordions[item] = true;
      }
    });

    setOpenAccordions(updatedOpenAccordions);
  }, [errors, values]);

  // 👇 Pre-fill injury based on anatomy
  useEffect(() => {
    if (!values || !values.anatomy) return;

    values.anatomy.forEach(({ name }) => {
      const key = `physicalInjuriesDiagnosis_${toCamelCase(name)}_injury`;
      if (!values[key]) {
        debugger;
        const defaultInjury = injuryTypeByAnatomy[name.toLowerCase()];
        if (defaultInjury) {
          handleChange({ target: { name: key, value: defaultInjury } });
        }
      }
    });
  }, [values.anatomy, handleChange]);

  const handleInjuryChange = (name, value) => {
    setSelectedInjuries({
      ...selectedInjuries,
      [name]: value,
    });
    handleChange({ target: { name, value } });
  };

  const handleMechanismChange = (name, value) => {
    setSelectedMechanisms({
      ...selectedMechanisms,
      [name]: value,
    });
    handleChange({ target: { name, value } });
  };

  const renderAnatomyDetails = (name) => {
    const injuryName = `${name}_injury`;
    const injuryOtherName = `${name}_otherInjury`;
    const mechanismName = `${name}_injuryMechanism`;

    const mechanismOptions =
      values[injuryName] === "Whiplash"
        ? mechanismWhiplashOptions
        : mechanismNonWhiplashOptions;

    return (
      <div>
        <div className="input-group">
          <div className="input-form-group">
            <label>Injury</label>
            <div className="radio-container" style={{ width: "100%" }}>
              <RadioButton
                name={injuryName}
                value="Whiplash"
                checked={values[injuryName] === "Whiplash"}
                onChange={(e) => handleInjuryChange(injuryName, e.target.value)}
              />
              <RadioButton
                name={injuryName}
                value="Non-Whiplash"
                checked={values[injuryName] === "Non-Whiplash"}
                onChange={(e) => handleInjuryChange(injuryName, e.target.value)}
              />
              <RadioButton
                name={injuryName}
                value="Other"
                checked={values[injuryName] === "Other"}
                onChange={(e) => handleInjuryChange(injuryName, e.target.value)}
              />
            </div>
          </div>
          {values[injuryName] === "Other" && (
            <InputField
              name={injuryOtherName}
              label="Please fill, if you selected any other (optional)"
              value={values[injuryOtherName]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>

        <div className="input-group">
          <SelectField
            label="Mechanism of injury"
            name={mechanismName}
            options={mechanismOptions}
            value={values[mechanismName]}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  };

  const renderPsychologicalInjuries = (psychologicalInjuries) => {
    const mechanismName = `${psychologicalInjuries}_injuryMechanism`;

    return (
      <div>
        <div className="input-group">
          <SelectField
            label="Mechanism of injury"
            name={mechanismName}
            options={mechanismPsychologicalTraumaOptions}
            value={values[mechanismName]}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
            fullLine={true}
          />
        </div>
      </div>
    );
  };

  return (
    <FormLayout title=" DIAGNOSIS">
      <p className="form-description">
        Please identify all the Whiplash and Non-whiplash related injuries and
        tell how it happened and what trauma claimant got
      </p>

      <div>
        <h4 className="form-sub-heading">PHYSICAL INJURIES</h4>
        {values?.anatomy?.map(({ name, trauma }) => (
          <Accordion key={name} title={`${name} - ${trauma}`} isOpenInitially={!!openAccordions[name]}>
            {renderAnatomyDetails(`physicalInjuriesDiagnosis_${toCamelCase(name)}`)}
          </Accordion>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">PSYCHOLOGICAL INJURIES</h4>
        {values?.psychologicalInjuries?.map((item) => (
          <Accordion key={item} title={item} isOpenInitially={!!openAccordions[item]}>
            {renderPsychologicalInjuries(`psychologicalInjuriesDiagnosis_${toCamelCase(item)}`)}
          </Accordion>
        ))}
      </div>

      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default DiagnosisSection;
