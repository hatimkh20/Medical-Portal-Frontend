import React, { useState } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";
import "../Common/Common.css";
import { mechanismPsychologicalTraumaOptions, mechanismWhiplashOptions, observations, traumaOptions } from "./Constants";
import RadioButton from "../Common/RadioButton";

const DiagnosisSection = ({ values, prevStep, handleChange, handleBlur }) => {
  const [selectedInjuries, setSelectedInjuries] = useState({});
  const [selectedMechanisms, setSelectedMechanisms] = useState({});
  const [selectedTraumas, setSelectedTraumas] = useState({});

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
    const injuryOtherName = `${anatomy}_injury_other`;
    const mechanismName = `${anatomy}_mechanism_of_injury`;
    const mechanismOtherName = `${anatomy}_mechanism_of_injury_other`;
    const traumaName = `${anatomy}_trauma`;
    const traumaOtherName = `${anatomy}_trauma_other`;

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
            onChange={(e) => handleMechanismChange(mechanismName, e.target.value)}
          />
          {values[mechanismName] === "Other" && (
            <InputField
              label="Please fill, if selected other (optional)"
              name={mechanismOtherName}
              value={values[mechanismOtherName]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>
        <div className="input-group">
          <SelectField
            label="Trauma it caused"
            name={traumaName}
            options={traumaOptions}
            value={values[traumaName]}
            onChange={(e) => handleTraumaChange(traumaName, e.target.value)}
          />
          {values[traumaName] === "Other" && (
            <InputField
              label="Please fill, if selected other (optional)"
              name={traumaOtherName}
              value={values[traumaOtherName]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>
    );
  };

  const renderPsychologicalInjuries = (psychologicalInjuries) => {

  const mechanismName = `${psychologicalInjuries}_injury`;
  const mechanismOtherName = `${psychologicalInjuries}_injury_other`;

  return (
    <div>        
      <div className="input-group">
          <SelectField
            label="Mechanism of injury"
            name={mechanismName}
            options={mechanismPsychologicalTraumaOptions}
            value={values[mechanismName]}
            onChange={(e) => handleMechanismChange(mechanismName, e.target.value)}
          />
          {values[mechanismName] === "Other" && (
            <InputField
              label="Please fill, if selected other (optional)"
              name={mechanismOtherName}
              value={values[mechanismOtherName]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>
    </div>
  );
};

  return (
    <FormLayout title="SECTION: DIAGNOSIS">
      <p className="form-description">
        Please identify all the Whiplash and Non-whiplash related injuries and tell how it happened and what trauma claimant got
      </p>

      <div>
        <h4 className="form-sub-heading">PHYSICAL INJURIES</h4>
        {values?.anatomy?.map((item) => (
          <Accordion key={item} title={item}>
            {renderAnatomyDetails(item)}
          </Accordion>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">PSYCHOLOGICAL INJURIES</h4>
        {values?.psychologicalInjuries?.map((item) => (
          <Accordion key={item} title={item}>
            {renderPsychologicalInjuries(item)}
          </Accordion>
        ))}
      </div>
      
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

export default DiagnosisSection;
