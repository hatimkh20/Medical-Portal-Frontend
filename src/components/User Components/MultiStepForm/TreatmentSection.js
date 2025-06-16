import React from "react";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import SelectField from "../Common/SelectField";
import InputField from "../Common/InputField";
import { attendanceOptions, imagingOptions, postAccidentLocations, prescriptionOptions, responseTeams, timeAfterAccident, treatmentOptions } from "./Constants";

const TreatmentSection = ({ values, handleChange, prevStep, nextStep }) => {
  return (
    <FormLayout title=" TREATMENT">
      <div>
        <h4 className="form-sub-heading">IMMEDIATE TREATMENT</h4>

        <div className="input-group">
          <SelectField
            label="Which service attended the scene of the accident?"
            name="serviceAtAccident"
            options={responseTeams}
            value={values.serviceAtAccident}
            values={values}
            onChange={handleChange}
          />
          <SelectField
            label="What treatment was received at the scene of the accident?"
            name="treatmentAtAccident"
            options={treatmentOptions}
            value={values.treatmentAtAccident}
            values={values}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <SelectField
            label="Where did you go after the accident?"
            name="postLocationAccident"
            options={postAccidentLocations}
            value={values.postLocationAccident}
            values={values}
            onChange={handleChange}
          />
          <InputField
            label="How did you get there?"
            name="postLocationBy"
            value={values.postLocationBy}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <h4 className="form-sub-heading">LATER TREATMENT</h4>

        <div className="input-group">
          <SelectField
            label="Where did you go for Treatment?"
            name="laterTreatmentLocation"
            options={attendanceOptions}
            value={values.laterTreatmentLocation}
            values={values}
            onChange={handleChange}
          />
          <SelectField
            label="How long after the accident did you seek treatment?"
            name="treatmentTimeAfterAccident"
            options={timeAfterAccident}
            value={values.treatmentTimeAfterAccident}
            values={values}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <SelectField
            label="What medications did you receive?"
            name="receivedTreatment"
            options={prescriptionOptions}
            value={values.receivedTreatment}
            values={values}
            onChange={handleChange}
          />
          <SelectField
            label="What imaging or scans were done?"
            name="imagingOrScans"
            options={imagingOptions}
            value={values.imagingOrScans}
            values={values}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">
          Save & Proceed
        </Button>
      </div>
    </FormLayout>
  );
};

export default TreatmentSection;
