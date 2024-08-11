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
  observations,
  traumaOptions,
} from "./Constants";
import RadioButton from "../Common/RadioButton";
import { toCamelCase } from "../Common/util";

const DiagnosisSection = ({ values, prevStep, errors, handleChange, handleBlur }) => {
  const [selectedInjuries, setSelectedInjuries] = useState({});
  const [selectedMechanisms, setSelectedMechanisms] = useState({});
  const [selectedTraumas, setSelectedTraumas] = useState({});

  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const updatedOpenAccordions = {};
    
    values?.anatomy?.forEach((item) => {
      const injuryName = `physicalInjuriesDiagnosis_${toCamelCase(item)}_injury`;
      const injuryOtherName = `physicalInjuriesDiagnosis_${toCamelCase(item)}_otherInjury`;
      const mechanismName = `physicalInjuriesDiagnosis_${toCamelCase(item)}_injuryMechanism`;
      const traumaName = `physicalInjuriesDiagnosis_${toCamelCase(item)}_trauma`;

      if (errors[injuryName] || errors[injuryOtherName] || errors[mechanismName] || errors[traumaName]) {
        updatedOpenAccordions[item] = true;
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

  const handleInjuryChange = (name, value) => {
    setSelectedInjuries({
      ...selectedInjuries,
      [name]: value,
    });
    handleChange({ target: { name, value } }); // Update Formik's values
  };

  const handleMechanismChange = (name, value) => {
    setSelectedMechanisms({
      ...selectedMechanisms,
      [name]: value,
    });
    handleChange({ target: { name, value } }); // Update Formik's values
  };

  const handleTraumaChange = (name, value) => {
    setSelectedTraumas({
      ...selectedTraumas,
      [name]: value,
    });
    handleChange({ target: { name, value } }); // Update Formik's values
  };

  const renderAnatomyDetails = (anatomy) => {
    const injuryName = `${anatomy}_injury`;
    const injuryOtherName = `${anatomy}_otherInjury`;
    const mechanismName = `${anatomy}_injuryMechanism`;
    const traumaName = `${anatomy}_trauma`;

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
            options={mechanismWhiplashOptions}
            value={values[mechanismName]}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
          />

          <SelectField
            label="Trauma it caused"
            name={traumaName}
            options={traumaOptions}
            value={values[traumaName]}
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
    <FormLayout title="SECTION: DIAGNOSIS">
      <p className="form-description">
        Please identify all the Whiplash and Non-whiplash related injuries and
        tell how it happened and what trauma claimant got
      </p>

      <div>
        <h4 className="form-sub-heading">PHYSICAL INJURIES</h4>
        {values?.anatomy?.map((item) => (
          <Accordion key={item} title={item} isOpenInitially={!!openAccordions[item]}>
            {renderAnatomyDetails(`physicalInjuriesDiagnosis_${toCamelCase(item)}`)}
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
