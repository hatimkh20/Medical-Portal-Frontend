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
    <FormLayout title="Vehicular Details">
      <p className="form-description">
        Please select vehicle type, note that all questions will be according to that.
      </p>
      {/* <div className="input-group"> */}
        <SelectField
          name="vehicleType"
          label="Vehicle Type"
          options={vehicleTypes}
          value={values.vehicleType}
          otherHandleChange={handleChange}
          values={values}
          onBlur={handleBlur}
          fullLine={true}
        >
          <InputField
            name="vehicleWheels"
            label="Enter number of wheels"
            value={values.vehicleWheels}
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          />
        </SelectField>
      {/* </div> */}
       {/* {isOtherSelected(values.vehicleType) && (
        <div className="input-group">
          <InputField
            name="otherVehicleType"
            label="Other vehicle type, if you selected any other"
            value={values.otherVehicleType}
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
        </div> */}
      {/* )} */}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>Previous Step</Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );

  
};

export default AccidentDetails;
