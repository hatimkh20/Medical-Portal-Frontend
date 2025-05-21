import React from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";  // Ensure this is the correct path to your styles
import "../Common/Common.css"
import { toCamelCase } from "../Common/util";

const PrognosisList = ({ values, handleChange, handleBlur, prevStep }) => {

  const renderRadioButtons = (name, anatomyName = null, isPsychological = false) => {
    const resolvedOrOngoing = `${name}_resolvedOrOngoing`;

    // Determine default value
    let defaultValue = "Ongoing"; // default to Ongoing
    if (!isPsychological && anatomyName) {
      const severityKey = `symptom_${toCamelCase(anatomyName)}_currentSeverity`;
      const severityValue = values[severityKey].toLowerCase();
      defaultValue = severityValue === "resolved" ? "Resolved" : "Ongoing";
    }

    return (
      <div className="radio-group-inline">
        <RadioButton
          name={resolvedOrOngoing}
          value="Resolved"
          label="Resolved"
          checked={
            values[resolvedOrOngoing] === "Resolved" ||
            (!values[resolvedOrOngoing] && defaultValue === "Resolved")
          }
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <RadioButton
          name={resolvedOrOngoing}
          value="Ongoing"
          label="Ongoing"
          checked={
            values[resolvedOrOngoing] === "Ongoing" ||
            (!values[resolvedOrOngoing] && defaultValue === "Ongoing")
          }
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    );
  };

  return (
    <FormLayout title=" PROGNOSIS">
      <div>
        <h4 className="form-sub-heading">Physical Injuries</h4>
        {values.anatomy.map(({ name, trauma }) => (
          <div key={name} className="prognosis">
            <label className="prognosis-label">{name} - {trauma}</label>
            {renderRadioButtons(`physicalInjuriesPrognosis_${toCamelCase(name)}`, name, false)}
          </div>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">Psychological Injuries</h4>
        {values.psychologicalInjuries.map((psychologicalInjury) => (
          <div key={psychologicalInjury} className="prognosis">
            <label className="prognosis-label">{psychologicalInjury}</label>
            {renderRadioButtons(`psychologicalInjuriesPrognosis_${toCamelCase(psychologicalInjury)}`, null, true)}
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
