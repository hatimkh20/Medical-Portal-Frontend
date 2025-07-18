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
    
    values?.anatomy?.forEach(({ name }) => {
      const injuryName = `physicalInjuriesOpinion_${toCamelCase(name)}_injuryOpinion`;
      console.log("Checking anatomy item:", injuryName, "Error present:", !!errors[injuryName]);
      if (errors[injuryName]) {
        openSections.push(name);
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
      defaultValue: "no"
    },
    {
      name: "exceptionalCircumstancesInAccident",
      label: "Were there any exceptional circumstances in accident?",
      defaultValue: "no"

    },
    {
      name: "injuriesResultOfExceptionalCircumstances",
      label: "Were the injuries result of exceptional circumstances?",
      defaultValue: "no"

    },
    {
      name: "injuriesExceptionallySevere",
      label: "Injuries sustained in accident were exceptionally severe?",
      defaultValue: "no"

    },
    {
      name: "agreementAsMedicalExpert",
      label: "Are you in agreement as Medical Expert?",
      defaultValue: "yes"

    },
  ];

  const renderRadioButtons = (name, defaultValue) => (
    <>
      <RadioButton
        name={name}
        value="yes"
        label="Yes"
        checked={values[name] === "yes"}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
      />
      <RadioButton
        name={name}
        value="no"
        label="No"
        checked={values[name] === "no"}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}

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
    <FormLayout title=" OPINION">
      <div>
        <h4 className="form-sub-heading">PHYSICAL INJURIES</h4>
        {values?.anatomy?.map(({ name, trauma }) => (
          <Accordion key={name} title={`${name} - ${trauma}`} isOpenInitially={!!openAccordions.includes(name)}>
            {renderAnatomyDetails(`physicalInjuriesOpinion_${toCamelCase(name)}`)}
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
              {renderRadioButtons(question.name, question.defaultValue)}
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
        <Button type="submit">Save & Proceed</Button>
      </div>
    </FormLayout>
  );
};

export default OpinionSection;
