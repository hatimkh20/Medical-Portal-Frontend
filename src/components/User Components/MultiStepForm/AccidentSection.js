import React from "react";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import { vehicleLevelDamage, vehicleSpeedImpact } from "./Constants";

const questionsFourWheels = [
  { name: "seatbeltFit", label: "Did the vehicle have a seatbelt fitted?" },
  { name: "seatbeltOn", label: "Did the claimant have the seatbelt on?" },
  {
    name: "seatbeltWear",
    label: "Does the claimant have an exception to wearing a seatbelt?",
  },
  { name: "airbagsFit", label: "Did the vehicle have airbags fitted?" },
  { name: "airbagsDeploy", label: "Did the airbags deploy?" },
];

const questionsTwoWheels = [
  {
    name: "safetyHelmetOn",
    label: "Did the claimant have a safety helmet on?",
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
    "Other"
  ].includes(values.vehicleType);
  const isTwoWheeledVehicle = [
    "bicycle",
    "motorbike",
    "cycle-bike",
    "scooter",
    "pushbike",
  ].includes(values.vehicleType);

  const renderRadioButtons = (name) => (
    <>
      <RadioButton
        name={name}
        value="yes"
        label="Yes"
        checked={values[name] === "yes"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <RadioButton
        name={name}
        value="no"
        label="No"
        checked={values[name] === "no"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );

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
          value={values.impactSpeed}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <SelectField
          name="vehicleDamage"
          label="What was the level of damage to the vehicle?"
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
            Since the claimant was in a vehicle with four or more wheels, please
            provide the following details:
          </p>
          {questionsFourWheels.map((question) => (
            <div key={question.name} className="radio-group-inline">
              <label>{question.label}</label>
              <div className="radio-container">
                {renderRadioButtons(question.name)}
              </div>
            </div>
          ))}
        </>
      )}
      {isTwoWheeledVehicle && (
        <>
          <p className="form-description">
            Since the claimant was on a two-wheeled vehicle, please answer the
            following:
          </p>
          {questionsTwoWheels.map((question) => (
            <div key={question.name} className="radio-group-inline">
              <label>{question.label}</label>
              <div className="radio-container">
                {renderRadioButtons(question.name)}
              </div>
            </div>
          ))}
        </>
      )}
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
