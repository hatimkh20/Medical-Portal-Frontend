import React from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";  // Ensure this is the correct path to your styles
import "../Common/Common.css"
import { toCamelCase } from "../Common/util";

const PrognosisList = ({ values, handleChange, handleBlur, prevStep }) => {
  const renderRadioButtons = (name) => (
    <div className="radio-group-inline">
      <RadioButton
        name={name}
        value="Resolved"
        label="Resolved"
        checked={values[name] === "Resolved"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <RadioButton
        name={name}
        value="Ongoing"
        label="Ongoing"
        checked={values[name] === "Ongoing"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );

  return (
    <FormLayout title="SECTION: PROGNOSIS">
      <div>
        <h4 className="form-sub-heading">Physical Injuries</h4>
        {values.anatomy.map((anatomy) => (
          <div key={anatomy} className="prognosis">
            <label className="prognosis-label">{anatomy}</label>
            {renderRadioButtons(`prognosis_${toCamelCase(anatomy)}_`)}
          </div>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">Psychological Injuries</h4>
        {values.psychologicalInjuries.map((psychologicalInjuries) => (
          <div key={psychologicalInjuries} className="prognosis">
            <label className="prognosis-label">{psychologicalInjuries}</label>
            {renderRadioButtons(`prognosis_${toCamelCase(psychologicalInjuries)}_`)}
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
