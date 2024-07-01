import React from "react";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import RadioButton from "../Common/RadioButton";

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
            />
            <RadioButton
              name="physicalAppearance"
              value="Dishevelled"
              checked={values.physicalAppearance === "Dishevelled"}
              onChange={handleInputChange}
            />
            <RadioButton
              name="physicalAppearance"
              value="Other"
              checked={values.physicalAppearance === "Other"}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {values.physicalAppearance === "Other" && (
          <InputField
            name="physicalAppearance"
            label="Please fill, if you selected any other (optional)"
            value={values.physicalAppearance}
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
            />
            <RadioButton
              name="presenceOfScars"
              value="no"
              checked={values.presenceOfScars === "no"}
              onChange={handleInputChange}
            />
            <RadioButton
              name="presenceOfScars"
              value="Other"
              checked={values.presenceOfScars === "Other"}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {values.presenceOfScars === "Other" && (
          <InputField
            name="presenceOfScars"
            label="Please fill, if you selected any other (optional)"
            value={values.presenceOfScars}
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
            />
            <RadioButton
              name="conversation"
              value="no"
              checked={values.conversation === "no"}
              onChange={handleInputChange}
            />
            <RadioButton
              name="conversation"
              value="Other"
              checked={values.conversation === "Other"}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {values.conversation === "Other" && (
          <InputField
            name="conversation"
            label="Please fill, if you selected any other (optional)"
            value={values.conversation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </div>

      <div className="input-group">
        <InputField
          name="fullName"
          label="Good eye contact / Rapport"
          value={values.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          fullLine={true}
        />
      </div>

      <div className="input-group">
        <InputField
          name="fullName"
          label="Mental State: Signs of Anxiety / Depression"
          value={values.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          fullLine={true}
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
