import React, { useState, useEffect } from "react";
import Accordion from "../Common/Accordion/Accordion";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "../Common/Common.css";
import RadioButton from "../Common/RadioButton";
import TextAreaField from "../Common/TextAreaField";
import { toCamelCase } from "../Common/util";

const OpinionSection = ({ values, prevStep, handleChange, errors, handleBlur }) => {
  const [openAccordions, setOpenAccordions] = useState([]);

  useEffect(() => {
    const openSections = [];
    console.log("Errors:", errors);
    
    values?.anatomy?.forEach((item) => {
      const injuryName = `physicalInjuriesOpinion_${toCamelCase(item)}_injuryOpinion`;
      console.log("Checking anatomy item:", injuryName, "Error present:", !!errors[injuryName]);
      if (errors[injuryName]) {
        openSections.push(item);
      }
    });

    values?.psychologicalInjuries?.forEach((item) => {
      const injuryName = `psychologicalInjuriesOpinion_${toCamelCase(item)}_injuryOpinion`;
      console.log("Checking psychological item:", injuryName, "Error present:", !!errors[injuryName]);
      if (errors[injuryName]) {
        openSections.push(item);
      }
    });

    setOpenAccordions(openSections);
    console.log("Open Accordions:", openSections);
  }, [errors, values.anatomy, values.psychologicalInjuries]);

  const circumstances_questions = [
    {
      name: "claimedExceptionalCircumstances",
      label: "Did claimant's claimed any exceptional circumstances?",
    },
    {
      name: "agreementAsMedicalExpert",
      label: "Are you in agreement as Medical Expert?",
    },
    {
      name: "exceptionalCircumstancesInAccident",
      label: "Were there any exceptional circumstances in accident?",
    },
    {
      name: "injuriesResultOfExceptionalCircumstances",
      label: "Were the injuries result of exceptional circumstances?",
    },
    {
      name: "injuriesExceptionallySevere",
      label: "Injuries sustained in accident were exceptionally severe?",
    },
  ];

  const renderRadioButtons = (name) => (
    <>
      <RadioButton
        name={name}
        value="yes"
        label="Yes"
        checked={values[name] === "yes"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <RadioButton
        name={name}
        value="no"
        label="No"
        checked={values[name] === "no"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );

  const renderAnatomyDetails = (anatomy) => {
    const injuryName = `${anatomy}_injuryOpinion`;

    return (
      <TextAreaField
        name={injuryName}
        label="Please provide your opinion about the physical injuries sustained during the accident"
        value={values[injuryName]}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={2}
      />
    );
  };

  const renderPsychologicalInjuries = (psychologicalInjuries) => {
    const injuryName = `${psychologicalInjuries}_injuryOpinion`;

    return (
      <TextAreaField
        name={injuryName}
        label="Please provide your opinion about the psychological injuries sustained during the accident"
        value={values[injuryName]}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={2}
      />
    );
  };

  return (
    <FormLayout title="SECTION: OPINION">
      <div>
        <h4 className="form-sub-heading">PHYSICAL INJURIES</h4>
        {values?.anatomy?.map((item) => (
          <Accordion key={item} title={item} isOpenInitially={!!openAccordions.includes(item)}>
            {renderAnatomyDetails(`physicalInjuriesOpinion_${toCamelCase(item)}`)}
          </Accordion>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">PSYCHOLOGICAL INJURIES</h4>
        {values?.psychologicalInjuries?.map((item) => (
          <Accordion key={item} title={item} isOpenInitially={!!openAccordions.includes(item)}>
            {renderPsychologicalInjuries(`psychologicalInjuriesOpinion_${toCamelCase(item)}`)}
          </Accordion>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">EXCEPTIONAL CIRCUMSTANCES</h4>

        {circumstances_questions.map((question) => (
          <div key={question.name} className="radio-group-inline">
            <label>{question.label}</label>
            <div className="radio-container">
              {renderRadioButtons(question.name)}
            </div>
          </div>
        ))}

        <TextAreaField
          name="anythingElse"
          label="Anything else"
          value={values?.anythingElse}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={2}
        />
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

export default OpinionSection;
