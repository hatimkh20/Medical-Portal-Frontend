// src/components/MultiStepForm/AnatomySectionForm.js
import React from 'react';
import SelectableList from '../Common/SelectableList';
import Button from '../Common/Button';
import FormLayout from '../Common/FormLayout';

const DomesticImpactList = ({ prevStep, nextStep }) => {
  const options = ["Personal Care", "Lifting Items", "Shopping", "Sex", "Gym"];

  return (
    <FormLayout title="SECTION: DOMESTIC IMPACT">
      <SelectableList title="Impacted Activities" options={options} />
      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit" onClick={nextStep}>Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default DomesticImpactList;
