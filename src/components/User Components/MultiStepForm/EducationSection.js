// src/components/MultiStepForm/AnatomySectionForm.js
import React from "react";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import SelectField from "../Common/SelectField";
import InputField from "../Common/InputField";

const EducationSection = ({ prevStep, nextStep }) => {
  return (
    <FormLayout title="SECTION: EMPLOYMENT / EDUCATION">
      <div>
        <div className="input-group">
          <InputField
            name="currentEmployment"
            label="Where are you studying currently?"
          />
          <InputField
            name="hoursEmployment"
            label="How many hours do you give to your education?"
          />
        </div>
        <div className="input-group">
        <InputField
            name="currentEmployment"
            label="How long did you take off from school after accident?"
          />
          <InputField
            name="hoursEmployment"
            label="How was your phased return to school managed?"
          />
        </div>
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

export default EducationSection;
