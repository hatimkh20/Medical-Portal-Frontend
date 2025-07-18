import React from "react";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import {
  timeOfAccident,
  vehicleLevelDamage,
  vehicleSpeedImpact,
} from "./Constants";

const questionsFourWheels = [
  {
    name: "seatbeltFit",
    label: "Did the vehicle have a seatbelt fitted?",
    defaultValue: "yes",
  },
  {
    name: "seatbeltOn",
    label: "Did the claimant have the seatbelt on?",
    defaultValue: "yes",
  },
  {
    name: "seatbeltWear",
    label: "Does the claimant have an exception to wearing a seatbelt?",
    defaultValue: "no",
  },
  {
    name: "airbagsFit",
    label: "Did the vehicle have airbags fitted?",
    defaultValue: "yes",
  },
  {
    name: "airbagsDeploy",
    label: "Did the airbags deploy?",
    defaultValue: "no",
  },
];

const questionsTwoWheels = [
  {
    name: "safetyHelmetOn",
    label: "Did the claimant have a safety helmet on?",
    defaultValue: "yes"
  },
];

const AccidentSectionForm = ({
  values,
  handleChange,
  handleBlur,
  prevStep,
}) => {
  const isFourWheeledVehicle = [
    "car",
    "van",
    "4x4",
    "bus",
    "truck",
    "trailer",
    "Other",
  ].includes(values.vehicleType);
  const isTwoWheeledVehicle = [
    "bicycle",
    "motorbike",
    "cycle-bike",
    "scooter",
    "pushbike",
  ].includes(values.vehicleType);

  const renderRadioButtons = (name, defaultValue) => (
    <>
      <RadioButton
        name={`vehicleQuestion_${name}`}
        value="yes"
        label="Yes"
        checked={values[`vehicleQuestion_${name}`] === "yes"}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
      />
      <RadioButton
        name={`vehicleQuestion_${name}`}
        value="no"
        label="No"
        checked={values[`vehicleQuestion_${name}`] === "no"}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
      />
    </>
  );

  return (
    <FormLayout title=" ACCIDENT">
      <p className="form-description">
        Please provide details about the accident.
      </p>
      <div className="input-group">
        <SelectField
          name="accidentTime"
          label="What time of the day did the accident happen?"
          value={values.accidentTime}
          onChange={handleChange}
          onBlur={handleBlur}
          options={timeOfAccident}
        />
        <InputField
          name="accidentLocation"
          label="Where did the accident occur?"
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
          value={values.impactSpeed}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <SelectField
          name="vehicleDamage"
          label="What was the vehicular damage?"
          options={vehicleLevelDamage}
          value={values.vehicleDamage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {/* Dynamic question rendering based on vehicle type */}
      {isFourWheeledVehicle && (
        <>
          <p className="form-description">
            Please provide the following details
          </p>
          {questionsFourWheels.map((question) => (
            <div key={question.name} className="radio-group-inline">
              <label>{question.label}</label>
              <div className="radio-container">
                {renderRadioButtons(question.name, question.defaultValue)}
              </div>
            </div>
          ))}
        </>
      )}
      {isTwoWheeledVehicle && (
        <>
          <p className="form-description">
          Please provide the following details
          </p>
          {questionsTwoWheels.map((question) => (
            <div key={question.name} className="radio-group-inline">
              <label>{question.label}</label>
              <div className="radio-container">
                {renderRadioButtons(question.name, question.defaultValue)}
              </div>
            </div>
          ))}
        </>
      )}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Save & Proceed</Button>
      </div>
    </FormLayout>
  );
};

export default AccidentSectionForm;
