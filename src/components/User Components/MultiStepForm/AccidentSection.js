// src/components/MultiStepForm/AccidentSectionForm.js
import React from "react";
import InputField from "../Common/InputField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";

const AccidentSectionForm = ({ values, prevStep, nextStep }) => {
  return (
    <FormLayout title="SECTION: ACCIDENT">
      <p className="form-description">
        Please provide details about the accident.
      </p>
      <div className="input-group">
        <InputField
          name="accidentTime"
          label="What time of the day did the accident happen?"
        />
        <InputField
          name="accidentLocation"
          label="Where did the accident happen?"
        />
      </div>
      <div className="input-group">
        <InputField name="impactSpeed" label="What was the speed of impact?" />
        <InputField
          name="vehicleDamage"
          label="What was the level of damage to the vehicle?"
        />
      </div>
      <p className="form-description">
        Since you mentioned the claimant was in a 4*4 vehicle, please provide
        the following details:
      </p>
      <div className="radio-group-inline">
        <label>Did the vehicle have a seatbelt fitted?</label>
        <div className="radio-container">
          <RadioButton name="seatbeltFit" value="yes" label="Yes" />
          <RadioButton name="seatbeltFit" value="no" label="No" />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Did the claimant have the seatbelt on?</label>
        <div className="radio-container">
          <RadioButton name="seatbeltOn" value="yes" label="Yes" />
          <RadioButton name="seatbeltOn" value="no" label="No" />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Does the claimant have an exception to wearing a seatbelt?</label>
        <div className="radio-container">
          <RadioButton name="seatbeltWear" value="yes" label="Yes" />
          <RadioButton name="seatbeltWear" value="no" label="No" />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Did the vehicle have airbags fitted?</label>
        <div className="radio-container">
          <RadioButton name="airbagsFit" value="yes" label="Yes" />
          <RadioButton name="airbagsFit" value="no" label="No" />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Did the airbags deploy?</label>
        <div className="radio-container">
          <RadioButton name="airbagsDeploy" value="yes" label="Yes" />
          <RadioButton name="airbagsDeploy" value="no" label="No" />
        </div>
      </div>
      {/* Repeat for other questions */}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default AccidentSectionForm;
