// src/components/Common/SelectField.js
import React, { useEffect } from "react";
import { useField } from "formik";
import "./Common.css";
import {titleCase, isOtherSelected, isPluralFrequencySelected} from "./util"
import InputField from "../Common/InputField";

const SelectField = ({ label, options = [], fullLine, values, ...props }) => {
  const [field, meta] = useField(props);
  const className = fullLine ? "form-group" : "input-form-group";

  return (
    <div className={className}>
      <div className={className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} className="text-input">
          <option value="">Select an option</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
      {
        isOtherSelected(field.value) &&
        <div className={props.children && "input-group"}>
          <InputField
            name={`other${titleCase(field.name)}`}
            label={`Other ${label}, if you selected any other`}
            value={values && values[`other${titleCase(field.name)}`]}
            required={true}
            onChange={field.onChange}
            onBlur={props.onBlur}
          />
          {props.children}
        </div>
    }

      {
        isPluralFrequencySelected(field.value) &&
        <div className={props.children && "input-group"}>
          <InputField
            name={`${titleCase(field.name)}_frequency`}
            label={`Enter the frequency of ${field.value.toLowerCase()}`}
            value={values && values[`${titleCase(field.name)}_frequency`]}
            required={true}
            onChange={field.onChange}
            onBlur={props.onBlur}
            type="number" // Set input type to number
            min="0" // Optional: Prevent negative numbers
      
          />
          {props.children}
        </div>
    }
    </div>
  );
};

export default SelectField;

