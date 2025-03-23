import React, { useEffect } from "react";
import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";

const ClaimantDetails = ({ values, handleChange, handleBlur, handleSubmit }) => {
  const pageKey = "claimantDetails";

  // Function to calculate age at the time of the accident
  useEffect(() => {
    if (values.dateOfBirth && values.dateOfAccident) {
      const dob = new Date(values.dateOfBirth);
      const accidentDate = new Date(values.dateOfAccident);

      if (!isNaN(dob) && !isNaN(accidentDate) && accidentDate >= dob) {
        let age = accidentDate.getFullYear() - dob.getFullYear();
        const monthDiff = accidentDate.getMonth() - dob.getMonth();
        const dayDiff = accidentDate.getDate() - dob.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        handleChange({
          target: { name: "ageAtTimeOfAccident", value: age.toString() },
        });
      }
    }
  }, [values.dateOfBirth, values.dateOfAccident]);

  return (
    <FormLayout title="CLAIMANT'S DETAIL">
      <p className="form-description">Please provide claimant's personal details</p>
      <div className="input-group">
        <InputField
          name="fullName"
          label="Full Name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="dateOfBirth"
          label="Date Of Birth"
          type="date"
          value={values.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <TextAreaField
          name="address"
          label="Address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <div className="rowspan-2">
          <InputField
            name="occupation"
            label="Occupation"
            value={values.occupation}
            onChange={handleChange}
            onBlur={handleBlur}
            pageKey={pageKey}
          />
          <InputField
            name="whichTypeOfIDChecked"
            label="Which type of ID was checked?"
            value={values.whichTypeOfIDChecked}
            onChange={handleChange}
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
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        {values.medicalRecordsProvided !== "no" && (
          <InputField
            name="whichRecordsSeen"
            label="Which records were seen?"
            value={values.whichRecordsSeen}
            onChange={handleChange}
            onBlur={handleBlur}
            pageKey={pageKey}
          />
        )}
        {values.medicalRecordsProvided === "no" && <div style={{ width: "100%" }} />}
      </div>
      <div className="input-group">
        <InputField
          name="dateOfAccident"
          label="Date Of Accident"
          type="date"
          value={values.dateOfAccident}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="ageAtTimeOfAccident"
          label="Age at the time of accident"
          type="number"
          value={values.ageAtTimeOfAccident}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
          disabled // Make read-only since it's auto-calculated
        />
      </div>

      {/* Bilal work */}
      <div className="input-group">
        <InputField
          name="accompaniedBy"
          label="Accompanied By"
          value={values.accompaniedBy}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="placeOfExamination"
          label="Place Of Examination"
          value={values.placeOfExamination}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <InputField
          name="durationOfExamination"
          label="Duration Of Examination"
          value={values.durationOfExamination}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="dateOfReport"
          label="Date Of Report"
          type="date"
          value={values.dateOfReport}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <InputField
          name="instructingParty"
          label="Instructing Party"
          value={values.instructingParty}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="instructingPartyRef"
          label="Instructing Party Ref"
          value={values.instructingPartyRef}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <InputField
          name="agency"
          label="Agency"
          value={values.agency}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
        <InputField
          name="agencyRef"
          label="Agency Ref"
          value={values.agencyRef}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      <div className="input-group">
        <InputField
          name="medcoCaseNumber"
          label="Medco Case Number"
          value={values.medcoCaseNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          pageKey={pageKey}
        />
      </div>
      {/* Bilal work end */}
      <div className="input-group">
        <div className="input-form-group">
          <label>Were medical records provided?</label>
          <div className="radio-container">
            <RadioButton
              name="medicalRecordsProvided"
              value="yes"
              checked={values.medicalRecordsProvided === "yes"}
              onChange={handleChange}
              pageKey={pageKey}
            />
            <RadioButton
              name="medicalRecordsProvided"
              value="no"
              checked={values.medicalRecordsProvided === "no"}
              onChange={handleChange}
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
              onChange={handleChange}
              pageKey={pageKey}
            />
            <RadioButton
              name="hasPhotoIDConfirmed"
              value="no"
              checked={values.hasPhotoIDConfirmed === "no"}
              onChange={handleChange}
              pageKey={pageKey}
            />
          </div>
        </div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" onClick={handleSubmit} style={{ marginLeft: 'auto' }}>Save & Next</Button>
      </div>
    </FormLayout>
  );
};

export default ClaimantDetails;
