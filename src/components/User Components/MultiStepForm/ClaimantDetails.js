// src/components/MultiStepForm/ClaimantDetails.js
import React from "react";
import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";

const ClaimantDetails = ({ values }) => {
  return (
    <FormLayout title="CLAIMANT'S DETAIL">
      <p className="form-description">
        Please provide claimant's personal details
      </p>
      <div className="input-group">
        <InputField name="fullName" label="Full Name" />
        <InputField name="dateOfBirth" label="Date Of Birth" type="date" />
      </div>
      <div className="input-group">
        <TextAreaField name="address" label="Address" />
        <div className="rowspan-2">
          <InputField name="occupation" label="Occupation" />
          <InputField
            name="whichTypeOfIDChecked"
            label="Which type of ID was checked?"
          />
        </div>
      </div>
      <div className="input-group">
        <InputField
          name="dateOfExamination"
          label="Date Of Examination"
          type="date"
        />
        <InputField name="whichRecordsSeen" label="Which records were seen?" />
      </div>
      <div className="input-group">
        <InputField
          name="dateOfAccident"
          label="Date Of Accident"
          type="date"
        />
        <InputField
          name="ageAtTimeOfAccident"
          label="Age at the time of accident"
          type="number"
        />
      </div>
      <div className="input-group"></div>
      <div className="input-group">
        <div className="form-group">
          <label>Were medical records provided?</label>
          <div className="radio-container">
            <RadioButton
              name="medicalRecordsProvided"
              value="yes"
              label="Yes"
            />
            <RadioButton name="medicalRecordsProvided" value="no" label="No" />
          </div>
        </div>

        <div className="form-group">
          <label>Has photo ID been confirmed?</label>
          <div className="radio-container">
            <RadioButton name="hasPhotoIDConfirmed" value="yes" label="Yes" />
            <RadioButton name="hasPhotoIDConfirmed" value="no" label="No" />
          </div>
        </div>
      </div>
      <Button type="submit">Save & Next</Button>
    </FormLayout>
  );
};

export default ClaimantDetails;
