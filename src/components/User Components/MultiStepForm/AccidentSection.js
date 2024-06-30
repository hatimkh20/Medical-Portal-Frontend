// src/components/MultiStepForm/AccidentSectionForm.js
import React from "react";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import { vehicleLevelDamage, vehicleSpeedImpact } from "./Constants";

const AccidentSectionForm = ({ values, handleChange, handleBlur, prevStep }) => {
  return (
    <FormLayout title="SECTION: ACCIDENT">
      <p className="form-description">
        Please provide details about the accident.
      </p>
      <div className="input-group">
        <InputField
          name="accidentTime"
          label="What time of the day did the accident happen?"
          value={values.accidentTime}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputField
          name="accidentLocation"
          label="Where did the accident happen?"
          value={values.accidentLocation}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="input-group">
        <SelectField
          name="impactSpeed"
          label="What was the speed of impact?"
          options={vehicleSpeedImpact}
          value={values?.impactSpeed}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <SelectField
          name="vehicleDamage"
          label="What was the level of damage to the vehicle?"
          value={values?.vehicleDamage}
          options={vehicleLevelDamage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <p className="form-description">
        Since you mentioned the claimant was in a 4*4 vehicle, please provide
        the following details:
      </p>
      <div className="radio-group-inline">
        <label>Did the vehicle have a seatbelt fitted?</label>
        <div className="radio-container">
          <RadioButton
            name="seatbeltFit"
            value="yes"
            label="Yes"
            checked={values.seatbeltFit === 'yes'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <RadioButton
            name="seatbeltFit"
            value="no"
            label="No"
            checked={values.seatbeltFit === 'no'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Did the claimant have the seatbelt on?</label>
        <div className="radio-container">
          <RadioButton
            name="seatbeltOn"
            value="yes"
            label="Yes"
            checked={values.seatbeltOn === 'yes'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <RadioButton
            name="seatbeltOn"
            value="no"
            label="No"
            checked={values.seatbeltOn === 'no'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Does the claimant have an exception to wearing a seatbelt?</label>
        <div className="radio-container">
          <RadioButton
            name="seatbeltWear"
            value="yes"
            label="Yes"
            checked={values.seatbeltWear === 'yes'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <RadioButton
            name="seatbeltWear"
            value="no"
            label="No"
            checked={values.seatbeltWear === 'no'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Did the vehicle have airbags fitted?</label>
        <div className="radio-container">
          <RadioButton
            name="airbagsFit"
            value="yes"
            label="Yes"
            checked={values.airbagsFit === 'yes'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <RadioButton
            name="airbagsFit"
            value="no"
            label="No"
            checked={values.airbagsFit === 'no'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="radio-group-inline">
        <label>Did the airbags deploy?</label>
        <div className="radio-container">
          <RadioButton
            name="airbagsDeploy"
            value="yes"
            label="Yes"
            checked={values.airbagsDeploy === 'yes'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <RadioButton
            name="airbagsDeploy"
            value="no"
            label="No"
            checked={values.airbagsDeploy === 'no'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

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
