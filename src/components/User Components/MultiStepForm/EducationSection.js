// src/components/MultiStepForm/AnatomySectionForm.js
import React from "react";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";

const EducationSection = ({ values, handleChange, prevStep, nextStep }) => {
  return (
    
    <FormLayout title="SECTION: EMPLOYMENT / EDUCATION">
      <div>
        <div className="input-group">
          <InputField
            name="currentEmployment"
            label="Where is your place of study or employment?"
            value={values.currentEmployment}
            onChange={handleChange}
          />
          <InputField
            name="hoursEmployment"
            label="How many hours do you work or study add per week?"
            value={values.hoursEmployment}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
        <InputField
            name="durationTakenOffFromSchoolAfterAccident"
            label="How long were you away from school/work after the accident?"
            value={values.durationTakenOffFromSchoolAfterAccident}
            onChange={handleChange}
          />
          <InputField
            name="phasedReturnToSchoolManagement"
            label="How was your return to normal activities managed?"
            value={values.phasedReturnToSchoolManagement}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">
          Proceed to Next Step
        </Button>
      </div>
    </FormLayout>
  );
};

export default EducationSection;
