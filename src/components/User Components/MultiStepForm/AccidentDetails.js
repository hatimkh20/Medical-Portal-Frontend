// src/components/MultiStepForm/AccidentDetails.js
import React, { useState } from "react";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import { vehicleTypes } from "../MultiStepForm/Constants";
import { otherOrValue, isOtherSelected } from "../Common/util";
import "./Form.css";

const AccidentDetails = ({ values, handleChange, handleBlur, prevStep, setFieldValue }) => {

  const onVehicleTypeChange = (e) => {
    handleChange(e);
    setFieldValue("vehicleWheels", "")
  }

  return (
    <FormLayout title="ACCIDENT DETAILS">
      <p className="form-description">
        Please select vehicle type, note that all questions will be according to that.
      </p>
      <div className="input-group">
        <SelectField
          name="vehicleType"
          label="Vehicle Type"
          options={vehicleTypes}
          value={otherOrValue(vehicleTypes, values?.vehicleType)}
          onChange={onVehicleTypeChange}
          onBlur={handleBlur}
          fullLine={true}
        />
      </div>
      {isOtherSelected(vehicleTypes, values.vehicleType) && (
        <div className="input-group">
          <InputField
            name="vehicleType"
            label="Other vehicle type, if you selected any other"
            value={values.vehicleType != "Other"? values.vehicleType: ""}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputField
            name="vehicleWheels"
            label="Vehicle wheels, if you selected any other"
            value={values.vehicleWheels}
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          />
        </div>
      )}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );

  
};

export default AccidentDetails;
