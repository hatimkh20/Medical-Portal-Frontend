import React from "react";
import RadioButton from "../Common/RadioButton";
import TextAreaField from "../Common/TextAreaField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import "../Common/Common.css";
import Accordion from "../Common/Accordion/Accordion";
import { toCamelCase } from "../Common/util";
import SelectField from "../Common/SelectField";
import InputField from "../Common/InputField";

const PrognosisSection = ({ values, handleChange, handleBlur, prevStep }) => {
  const ongoingPrognosisQuestions = [
    {
      label: "How much time will it take to recover? (From index accident)",
      component: "InputField",
      type: "text"
    },
    {
      label: "Severity of disability?",
      component: "InputField",
      type: "text"
    },
    {
      label: "Will the claimant require a specialist?",
      component: "RadioButton",
      options: ["Yes", "No"]
    },
    {
      label: "Which specialist?",
      component: "InputField",
      type: "text"
    },
    {
      label: "Will there be any long-term sequelae?",
      component: "SelectField",
      options: ["Yes", "No"]
    },
    {
      label: "Any other recommendations?",
      component: "TextAreaField"
    },
    {
      label: "Further Treatment and Rehabilitation",
      component: "TextAreaField"
    }
  ];
  
  const resolvedPrognosisQuestions = [
    {
      label: "When did it resolve? (From index accident)",
      component: "InputField",
      type: "text"
    },
    {
      label: "Will there be any long-term sequelae?",
      component: "SelectField",
      options: ["Yes", "No"]
    }
  ];
  const getBadgeLabel = (item) => {
    const status = values[`prognosis_${toCamelCase(item)}_`];
    return status === 'Resolved' ? 'Resolved' : 'Ongoing';
  };

  // Enhanced title with badge for Accordion
  const getAccordionTitle = (item) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <span>{item} <span className={`badge ${getBadgeLabel(item).toLowerCase()}`}>{getBadgeLabel(item)}</span></span>
      
    </div>
  );

  const renderQuestionComponent = (question, anatomy) => {
    const fieldName = `${toCamelCase(anatomy)}_${toCamelCase(question.label)}`;
  
    switch (question.component) {
      case "InputField":
        return (
          <div className="question-item">
            <InputField
              name={fieldName}
              label={question.label}
              type={question.type}
              value={values[fieldName] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        );
      case "TextAreaField":
        return (
          <div className="question-item">
            <TextAreaField
              name={fieldName}
              label={question.label}
              value={values[fieldName] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        );
      case "SelectField":
        return (
          <div className="question-item">
            <SelectField
              name={fieldName}
              label={question.label}
              options={question.options}
              value={values[fieldName]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        );
      case "RadioButton":
        return (
          <div className="question-item">
            <label>{question.label}</label>
            <div className="radio-container">
              {question.options.map(option => (
                <RadioButton
                  key={option}
                  name={fieldName}
                  value={option}
                  label={option}
                  checked={values[fieldName] === option}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  
  const renderQuestions = (anatomy) => {
    const statusKey = `prognosis_${toCamelCase(anatomy)}_`;
    const status = values[statusKey];
    const questions = status === 'Resolved' ? resolvedPrognosisQuestions : ongoingPrognosisQuestions;
  
    return (
      <div className="question-group">
        {questions.map(question => renderQuestionComponent(question, anatomy))}
      </div>
    );
  };

  return (
    <FormLayout title="SECTION: PROGNOSIS">
      <div>
        <h4 className="form-sub-heading">Physical Injuries</h4>
        {values?.anatomy?.map((item) => (
          <Accordion key={item} title={getAccordionTitle(item)}>
            {renderQuestions(item)}
          </Accordion>
        ))}
      </div>

      <div>
        <h4 className="form-sub-heading">Psychological Injuries</h4>
        {values?.psychologicalInjuries?.map((item) => (
          <Accordion key={item} title={getAccordionTitle(item)}>
            {renderQuestions(item)}
          </Accordion>
        ))}
      </div>

      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default PrognosisSection;
