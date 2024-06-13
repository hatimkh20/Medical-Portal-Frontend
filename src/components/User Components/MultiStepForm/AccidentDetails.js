// src/components/MultiStepForm/AccidentDetails.js
import React from "react";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";

const AccidentDetails = ({ values, prevStep }) => {
  return (
    <FormLayout title="Accident Details">
      <InputField name="vehicleType" label="Vehicle Type" />
      {values.vehicleType === 'Other' && (
        <InputField name="otherVehicleType" label="Other Vehicle Type" />
      )}
      {/* Add other form fields here */}
      <Button type="button" onClick={prevStep}>Previous</Button>
      <Button type="submit">Save & Next</Button>
    </FormLayout>
  );
};

export default AccidentDetails;
