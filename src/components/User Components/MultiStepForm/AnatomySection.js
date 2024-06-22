// src/components/MultiStepForm/AnatomySectionForm.js
import React from 'react';
import SelectableList from '../Common/SelectableList';
import Button from '../Common/Button';
import FormLayout from '../Common/FormLayout';

const AnatomySectionForm = ({ prevStep, nextStep }) => {
  const anatomyOptions = ["Head", "Neck", "Nose bleed", "High blood pressure", "Right ribs", "Abdomen", "Right Hip"];
  const psychologicalInjuryOptions = ["Travel Discomfort", "Travel Anxiety", "Low mood", "Flashbacks and Panic Attacks", "Nightmares"];

  return (
    <FormLayout title="SECTION: ANATOMY">
      <p className="form-description">Please select affected anatomies.</p>
      <SelectableList title="Anatomy" options={anatomyOptions} />
      <SelectableList title="Psychological Injuries" options={psychologicalInjuryOptions} />
      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit" onClick={nextStep}>Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default AnatomySectionForm;
