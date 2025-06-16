// src/components/MultiStepForm/AnatomySectionForm.js
import React from "react";
import SelectableList from "../Common/SelectableList";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import { anatomyList, psychologicalInjuries } from "./Constants";

const AnatomySectionForm = ({ values, handleChange, handleBlur, prevStep }) => {
  
  const handleAddAnatomy = (item) => {
    if (!item) return;
  
    let traumaValue = values[`${item}_trauma`] || "";
  
    // If traumaValue is 'Other', get the actual input from `${item}_otherTrauma`
    if (traumaValue === "Other") {
      const otherTrauma = values[`${item}_otherTrauma`];
      if (otherTrauma) {
        traumaValue = otherTrauma;
      }
    }
  
    const alreadyExists = values.anatomy.some(
      (a) => a.name === item && a.trauma === traumaValue
    );
  
    if (!alreadyExists) {
      handleChange({
        target: {
          name: "anatomy",
          value: [...values.anatomy, { name: item, trauma: traumaValue }],
        },
      });
    }
  };  

  const handleRemoveAnatomy = (anatomyName, trauma) => {
    console.log(anatomyName, trauma);
    handleChange({
      target: {
        name: "anatomy",
        value: values.anatomy.filter(
          (a) => !(a.name === anatomyName && a.trauma === trauma)
        ),
      },
    });
  };  

  const handleAddPsychologicalInjury = (item) => {
    if (item && !values.psychologicalInjuries.includes(item)) {
      handleChange({
        target: {
          name: "psychologicalInjuries",
          value: [...values.psychologicalInjuries, item],
        },
      });
    }
  };

  const handleRemovePsychologicalInjury = (item) => {
    handleChange({
      target: {
        name: "psychologicalInjuries",
        value: values.psychologicalInjuries.filter((injury) => injury !== item),
      },
    });
  };

  return (
    <FormLayout title=" ANATOMY">
      <p className="form-description">Please select affected anatomies.</p>
      <div className="anatomy-container">
        <SelectableList
          title="Anatomy"
          name="anatomy"
          options={anatomyList}
          selectedItems={values.anatomy} // Already in object format
          handleAddItem={handleAddAnatomy}
          handleRemoveItem={handleRemoveAnatomy}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          isAnatomy={true} // New prop to identify anatomy case
        />
        <SelectableList
          title="Psychological Injuries"
          options={psychologicalInjuries}
          name="psychologicalInjuries"
          selectedItems={values.psychologicalInjuries}
          handleAddItem={handleAddPsychologicalInjury}
          handleRemoveItem={handleRemovePsychologicalInjury}
          values={values}
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

export default AnatomySectionForm;
