// src/components/MultiStepForm/AnatomySectionForm.js
import React from 'react';
import SelectableList from '../Common/SelectableList';
import Button from '../Common/Button';
import FormLayout from '../Common/FormLayout';
import "./Form.css";

const AnatomySectionForm = ({ values, handleChange, handleBlur, prevStep }) => {
  const anatomyOptions = ["Head", "Neck", "Nose bleed", "High blood pressure", "Right ribs", "Abdomen", "Right Hip"];
  const psychologicalInjuryOptions = ["Travel Discomfort", "Travel Anxiety", "Low mood", "Flashbacks and Panic Attacks", "Nightmares"];

  const handleAddAnatomy = (item) => {
    if (item && !values.anatomy.includes(item)) {
      handleChange({
        target: {
          name: 'anatomy',
          value: [...values.anatomy, item],
        },
      });
    }
  };

  const handleRemoveAnatomy = (item) => {
    handleChange({
      target: {
        name: 'anatomy',
        value: values.anatomy.filter((anatomy) => anatomy !== item),
      },
    });
  };

  const handleAddPsychologicalInjury = (item) => {
    if (item && !values.psychologicalInjuries.includes(item)) {
      handleChange({
        target: {
          name: 'psychologicalInjuries',
          value: [...values.psychologicalInjuries, item],
        },
      });
    }
  };

  const handleRemovePsychologicalInjury = (item) => {
    handleChange({
      target: {
        name: 'psychologicalInjuries',
        value: values.psychologicalInjuries.filter((injury) => injury !== item),
      },
    });
  };

  return (
    <FormLayout title="SECTION: ANATOMY">
      <p className="form-description">Please select affected anatomies.</p>
      <div className='anatomy-container'>
        <SelectableList 
          title="Anatomy" 
          options={anatomyOptions} 
          selectedItems={values.anatomy}
          handleAddItem={handleAddAnatomy}
          handleRemoveItem={handleRemoveAnatomy}
        />
        <SelectableList 
          title="Psychological Injuries" 
          options={psychologicalInjuryOptions}
          selectedItems={values.psychologicalInjuries}
          handleAddItem={handleAddPsychologicalInjury}
          handleRemoveItem={handleRemovePsychologicalInjury}
        />
      </div>
      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default AnatomySectionForm;
