// src/components/MultiStepForm/AnatomySectionForm.js
import React from "react";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import SelectField from "../Common/SelectField";

const LivelihoodSection = ({ prevStep, nextStep }) => {
  return (
    <FormLayout title="IMPACT ON LIVELIHOOD / EDUCATION">
      
      <div className="input-group">
        <SelectField
          name="employmentStatus"
          label="Please select your employment status"
          options={["Student", "A", "B", "C"]}
          fullLine={true}
        />
      </div>
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit" onClick={nextStep}>
          Proceed to Next Step
        </Button>
      </div>
    </FormLayout>
  );
};

export default LivelihoodSection;