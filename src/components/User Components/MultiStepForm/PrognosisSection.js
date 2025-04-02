import React, { useState, useEffect } from "react";
import RadioButton from "../Common/RadioButton";
import TextAreaField from "../Common/TextAreaField";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import "../Common/Common.css";
import Accordion from "../Common/Accordion/Accordion";
import { toCamelCase } from "../Common/util";
import SelectField from "../Common/SelectField";
import { specialistOptions, symptomSeverity, timeAfterAccident } from "./Constants";

const PrognosisSection = ({ values, handleChange, handleBlur, prevStep, errors }) => {
  const [openAccordions, setOpenAccordions] = useState([]);

  useEffect(() => {
    const openSections = [];
    
    values?.anatomy?.forEach(({name}) => {
      const fieldNamePrefix = `physicalInjuriesDetailedPrognosis_${toCamelCase(name)}`;
      const statusKey = `physicalInjuriesPrognosis_${toCamelCase(name)}_resolvedOrOngoing`;

      const questions = values[statusKey] === 'Resolved' ? resolvedPrognosisQuestions : ongoingPrognosisQuestions;

      questions.forEach((question) => {
        const fieldName = `${fieldNamePrefix}_${toCamelCase(question.name)}`;
        if (errors[fieldName]) {
          openSections.push(name);
        }
      });
    });

    values?.psychologicalInjuries?.forEach((item) => {
      const fieldNamePrefix = `psychologicalInjuriesDetailedPrognosis_${toCamelCase(item)}`;
      const statusKey = `psychologicalInjuriesPrognosis_${toCamelCase(item)}_resolvedOrOngoing`;

      const questions = values[statusKey] === 'Resolved' ? resolvedPrognosisQuestions : ongoingPrognosisQuestions;

      questions.forEach((question) => {
        const fieldName = `${fieldNamePrefix}_${toCamelCase(question.name)}`;
        if (errors[fieldName]) {
          openSections.push(item);
        }
      });
    });

    setOpenAccordions(openSections);
  }, [errors, values]);

  const ongoingPrognosisQuestions = [
    {
      name: "timeWillTakeToRecover",
      label: "How much time will it take to recover? (From index accident)",
      component: "InputField",
      type: "text"
    },
    {
      name: "severeDisability",
      label: "Severity of disability?",
      component: "SelectField",
      type: "text",
      options: symptomSeverity
    },
    {
      name: "claimantRequireSpecialist",
      label: "Will the claimant require a specialist?",
      component: "RadioButton",
      options: ["Yes", "No"]
    },
    {
      name: "specialist",
      label: "Which specialist?",
      component: "SelectField",
      type: "text",
      options: specialistOptions
    },
    {
      name: "anyLongTermSequelae",
      label: "Will there be any long-term sequelae?",
      component: "SelectField",
      options: ["Yes", "No"]
    },
    {
      name: "otherRecommendation",
      label: "Any other recommendations?",
      component: "TextAreaField"
    },
    {
      name: "treatmentAndRehabiliation",
      label: "Further Treatment and Rehabilitation",
      component: "TextAreaField"
    }
  ];

  const resolvedPrognosisQuestions = [
    {
      name: "whenDidItResolved",
      label: "When did it resolve? (From index accident)",
      component: "SelectField",
      type: "text",
      options: timeAfterAccident
    },
    {
      name: "anyLongTermSequelae",
      label: "Will there be any long-term sequelae?",
      component: "SelectField",
      options: ["Yes", "No"]
    }
  ];

  const getBadgeLabel = (itemKey) => {
    const status = values[itemKey];
    return status === 'Resolved' ? 'Resolved' : 'Ongoing';
  };

  const getAccordionTitle = (item, itemKey) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <span>{item} <span className={`badge ${getBadgeLabel(itemKey).toLowerCase()}`}>{getBadgeLabel(itemKey)}</span></span>
    </div>
  );

  const renderQuestionComponent = (question, anatomy) => {
    const fieldName = `${toCamelCase(anatomy)}_${toCamelCase(question.name)}`;
  
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
              values={values}
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
  
  const renderQuestions = (statusKey, fieldNamePrefix) => {
    const status = values[statusKey];
    const questions = status === 'Resolved' ? resolvedPrognosisQuestions : ongoingPrognosisQuestions;
  
    return (
      <div className="question-group">
        {questions.map(question => renderQuestionComponent(question, fieldNamePrefix))}
      </div>
    );
  };

  return (
    <FormLayout title="SECTION: PROGNOSIS">
      <div>
        <h4 className="form-sub-heading">Physical Injuries</h4>
        {values?.anatomy?.map((item) => {
          let itemKey = `physicalInjuriesPrognosis_${toCamelCase(item.name)}_resolvedOrOngoing`;
          let fieldNamePrefix = `physicalInjuriesDetailedPrognosis_${toCamelCase(item.name)}`;
          let title = `${item.name} - ${item.trauma}`
          return (<Accordion key={item.name} title={getAccordionTitle(title, itemKey)} isOpenInitially={!!openAccordions.includes(item.name)}>
            {renderQuestions(itemKey, fieldNamePrefix)}
          </Accordion>)
        })}
      </div>
      
      <div>
        <h4 className="form-sub-heading">Psychological Injuries</h4>
        {values?.psychologicalInjuries?.map((item) => {
          let itemKey = `psychologicalInjuriesPrognosis_${toCamelCase(item)}_resolvedOrOngoing`;
          let fieldNamePrefix = `psychologicalInjuriesDetailedPrognosis_${toCamelCase(item)}`;
          return <Accordion key={item} title={getAccordionTitle(item, itemKey)} isOpenInitially={!!openAccordions.includes(item)}>
            {renderQuestions(itemKey, fieldNamePrefix)}
          </Accordion>
        })}
      </div>

      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default PrognosisSection;
