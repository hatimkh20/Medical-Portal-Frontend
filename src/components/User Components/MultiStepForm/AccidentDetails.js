// src/components/MultiStepForm/AccidentDetails.js
import React from "react";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";

const AccidentDetails = ({ values, handleChange, handleBlur, prevStep }) => {
  return (
    <FormLayout title="ACCIDENT DETAILS">
      <p className="form-description">
        Please select vehicle type, note that all questions will be according to that.
      </p>
      <div className="input-group">
        <SelectField
          name="vehicleType"
          label="Vehicle Type"
          options={['Car', 'Bike', 'Truck', 'Other']}
          value={values?.vehicleType}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {values.vehicleType === 'Other' && (
        <div className="input-group">
          <InputField
            name="otherVehicleType"
            label="Other vehicle type, if you selected any other"
            value={values.otherVehicleType}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputField
            name="vehicleWheels"
            label="Vehicle wheels, if you selected any other"
            value={values.vehicleWheels}
            onChange={handleChange}
            onBlur={handleBlur}
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
