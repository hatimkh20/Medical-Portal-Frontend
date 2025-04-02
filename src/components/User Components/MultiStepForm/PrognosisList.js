import React from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";  // Ensure this is the correct path to your styles
import "../Common/Common.css"
import { toCamelCase } from "../Common/util";

const PrognosisList = ({ values, handleChange, handleBlur, prevStep }) => {
  const renderRadioButtons = (name) => {

    const resolvedOrOngoing = `${name}_resolvedOrOngoing`;

    return <div className="radio-group-inline">
      <RadioButton
        name={resolvedOrOngoing}
        value="Resolved"
        label="Resolved"
        checked={values[resolvedOrOngoing] === "Resolved"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <RadioButton
        name={resolvedOrOngoing}
        value="Ongoing"
        label="Ongoing"
        checked={values[resolvedOrOngoing] === "Ongoing"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  };

  return (
    <FormLayout title="SECTION: PROGNOSIS">
      <div>
        <h4 className="form-sub-heading">Physical Injuries</h4>
        {values.anatomy.map(({name, trauma}) => (
          <div key={name} className="prognosis">
            <label className="prognosis-label">{name} - {trauma}</label>
            {renderRadioButtons(`physicalInjuriesPrognosis_${toCamelCase(name)}`)}
          </div>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">Psychological Injuries</h4>
        {values.psychologicalInjuries.map((psychologicalInjuries) => (
          <div key={psychologicalInjuries} className="prognosis">
            <label className="prognosis-label">{psychologicalInjuries}</label>
            {renderRadioButtons(`psychologicalInjuriesPrognosis_${toCamelCase(psychologicalInjuries)}`)}
          </div>
        ))}
      </div>
      
      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default PrognosisList;
