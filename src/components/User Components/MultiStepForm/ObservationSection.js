import React from "react";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import RadioButton from "../Common/RadioButton";
import SelectField from "../Common/SelectField";
import { eyeContactOptions, mentalStateOptions } from "./Constants";

const ObservationSection = ({ values, handleChange, handleBlur, prevStep }) => {
  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setvalues({ ...values, [name]: value });
    // console.log(values)
    console.log(e.target);
    handleChange(e); // Call Formik's handleChange
  };

  return (
    <FormLayout title="SECTION: GENERAL OBSERVATIONS">
      <p className="form-description">
        Please provide details about the general observations.
      </p>

      <div className="input-group">
        <div className="input-form-group">
          <label>Physical appearance</label>
          <div className="radio-container" style={{ width: "100%" }}>
            <RadioButton
              name="physicalAppearance"
              value="Good"
              checked={values.physicalAppearance === "Good"}
              onChange={handleInputChange}
              defaultValue="Good"
            />
            <RadioButton
              name="physicalAppearance"
              value="Dishevelled"
              checked={values.physicalAppearance === "Dishevelled"}
              onChange={handleInputChange}
              defaultValue="Good"

            />
            <RadioButton
              name="physicalAppearance"
              value="Other"
              checked={values.physicalAppearance === "Other"}
              onChange={handleInputChange}
              defaultValue="Good"

            />
          </div>
        </div>

        {values.physicalAppearance === "Other" && (
          <InputField
            name="otherPhysicalAppearance"
            label="Please fill, if you selected any other (optional)"
            value={values.otherPhysicalAppearance}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </div>

      <div className="input-group">
        <div className="input-form-group">
          <label>Presence of bruises, scars, marks</label>
          <div className="radio-container" style={{ width: "100%" }}>
            <RadioButton
              name="presenceOfScars"
              value="yes"
              checked={values.presenceOfScars === "yes"}
              onChange={handleInputChange}
              defaultValue="no"

            />
            <RadioButton
              name="presenceOfScars"
              value="no"
              checked={values.presenceOfScars === "no"}
              onChange={handleInputChange}
              defaultValue="no"

            />
            <RadioButton
              name="presenceOfScars"
              value="Other"
              checked={values.presenceOfScars === "Other"}
              onChange={handleInputChange}
              defaultValue="no"

            />
          </div>
        </div>

        {values.presenceOfScars === "Other" && (
          <InputField
            name="otherPresenceOfScars"
            label="Please fill, if you selected any other (optional)"
            value={values.otherPresenceOfScars}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </div>

      <div className="input-group">
        <div className="input-form-group">
          <label>Holding intellegent / coherent conversation</label>
          <div className="radio-container" style={{ width: "100%" }}>
            <RadioButton
              name="conversation"
              value="yes"
              checked={values.conversation === "yes"}
              onChange={handleInputChange}
              defaultValue="yes"

            />
            <RadioButton
              name="conversation"
              value="no"
              checked={values.conversation === "no"}
              onChange={handleInputChange}
              defaultValue="yes"

            />
            <RadioButton
              name="conversation"
              value="Other"
              checked={values.conversation === "Other"}
              onChange={handleInputChange}
              defaultValue="yes"

            />
          </div>
        </div>

        {values.conversation === "Other" && (
          <InputField
            name="otherConversation"
            label="Please fill, if you selected any other (optional)"
            value={values.otherConversation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </div>

      <div className="input-group">
        <SelectField
          name="eyeContact"
          label="Good eye contact / Rapport"
          value={values.eyeContact}
          onChange={handleInputChange}
          onBlur={handleBlur}
          fullLine={true}
          options={eyeContactOptions}
          values={values}
        />
      </div>

      <div className="input-group">
        <SelectField
          name="mentalState"
          label="Mental Health: Signs of Anxiety / Depression"
          value={values.mentalState}
          onChange={handleInputChange}
          onBlur={handleBlur}
          fullLine={true}
          options={mentalStateOptions}
          values={values}
        />
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

export default ObservationSection;
