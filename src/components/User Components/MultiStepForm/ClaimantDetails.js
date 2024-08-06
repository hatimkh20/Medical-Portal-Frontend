// src/components/MultiStepForm/ClaimantDetails.js
import React, { useState } from "react";
import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";

const ClaimantDetails = ({ values, handleChange, handleBlur, handleSubmit }) => {
  // const [values, setvalues] = useState(values);

  console.log(values, "VALUES")

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setvalues({ ...values, [name]: value });
    // console.log(values)
    console.log(e.target)
    handleChange(e); // Call Formik's handleChange
  };

  const save = async (e) => {

    // await handleSubmit(e)();
  }

  const pageKey = "claimantDetails";

  return (
    <FormLayout title="CLAIMANT'S DETAIL">
      <p className="form-description">
        Please provide claimant's personal details
      </p>
      <div className="input-group">
        <InputField
          name="fullName"
          label="Full Name"
          value={values.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="dateOfBirth"
          label="Date Of Birth"
          type="date"
          value={values.dateOfBirth}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <TextAreaField
          name="address"
          label="Address"
          value={values.address}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <div className="rowspan-2">
          <InputField
            name="occupation"
            label="Occupation"
            value={values.occupation}
            onChange={handleInputChange}
            onBlur={handleBlur}
            pageKey={pageKey}
          />
          <InputField
            name="whichTypeOfIDChecked"
            label="Which type of ID was checked?"
            value={values.whichTypeOfIDChecked}
            onChange={handleInputChange}
            onBlur={handleBlur}
            pageKey={pageKey}
          />
        </div>
      </div>
      <div className="input-group">
        <InputField
          name="dateOfExamination"
          label="Date Of Examination"
          type="date"
          value={values.dateOfExamination}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="whichRecordsSeen"
          label="Which records were seen?"
          value={values.whichRecordsSeen}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <InputField
          name="dateOfAccident"
          label="Date Of Accident"
          type="date"
          value={values.dateOfAccident}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="ageAtTimeOfAccident"
          label="Age at the time of accident"
          type="number"
          value={values.ageAtTimeOfAccident}
          onChange={handleInputChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <div className="input-form-group">
          <label>Were medical records provided?</label>
          <div className="radio-container">
            <RadioButton
              name="medicalRecordsProvided"
              value="yes"
              checked={values.medicalRecordsProvided === "yes"}
              onChange={handleInputChange}
              pageKey={pageKey}
            />
            <RadioButton
              name="medicalRecordsProvided"
              value="no"
              checked={values.medicalRecordsProvided === "no"}
              onChange={handleInputChange}
              pageKey={pageKey}
            />
          </div>
        </div>

        <div className="input-form-group">
          <label>Has photo ID been confirmed?</label>
          <div className="radio-container">
            <RadioButton
              name="hasPhotoIDConfirmed"
              value="yes"
              checked={values.hasPhotoIDConfirmed === "yes"}
              onChange={handleInputChange}
              pageKey={pageKey}
            />
            <RadioButton
              name="hasPhotoIDConfirmed"
              value="no"
              checked={values.hasPhotoIDConfirmed === "no"}
              onChange={handleInputChange}
              pageKey={pageKey}
            />
          </div>
        </div>
      </div>
      <Button type="submit" onClick={save}>Save & Next</Button>
    </FormLayout>
  );
};

export default ClaimantDetails;
