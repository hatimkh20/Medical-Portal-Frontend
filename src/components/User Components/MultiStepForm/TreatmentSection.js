// src/components/MultiStepForm/AnatomySectionForm.js
import React from "react";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import SelectField from "../Common/SelectField";
import InputField from "../Common/InputField";
import { postAccidentLocations, responseTeams, treatmentOptions } from "./Constants";

const TreatmentSection = ({ values, prevStep, nextStep }) => {
  return (
    <FormLayout title="SECTION: TREATMENT">
      <div>
        <h4 className="form-sub-heading">IMMEDIATE TREATMENT</h4>

        <div className="input-group">
          <SelectField
            label="Which service attended the scene of the accident?"
            name="serviceAtAccident"
            options={responseTeams}
          />
          <SelectField
            label="What treatment was received at the scene of the accident?"
            name="treatmentAtAccident"
            options={treatmentOptions}
          />
        </div>
        <div className="input-group">
          <SelectField
            label="Where did you go after the accident?"
            name="postLocationAccident"
            options={postAccidentLocations}
          />
          <InputField
            label="How did you get there?"
            name="postLocationBy"
            value={values.postLocationBy}
          />
        </div>
      </div>

      <div>
        <h4 className="form-sub-heading">LATER TREATMENT</h4>

        <div className="input-group">
          <SelectField
            label="Where did you receive treatment?"
            name="e"
            options={["Option 1", "Option 2", "Option 3"]}
          />
          <SelectField
            label="How long after the accident did you seek treatment?"
            name="f"
            options={["Option 1", "Option 2", "Option 3"]}
          />
        </div>
        <div className="input-group">
          <SelectField
            label="What treatment did you receive?"
            name="g"
            options={["Option 1", "Option 2", "Option 3"]}
          />
          <SelectField
            label="What imaging or scans was done?"
            name="i"
            options={["Option 1", "Option 2", "Option 3"]}
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

export default TreatmentSection;
