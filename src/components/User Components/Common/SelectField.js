// src/components/Common/SelectField.js
import React, { useEffect } from "react";
import { useField } from "formik";
import "./Common.css";
import {titleCase, isOtherSelected, isPluralFrequencySelected, toCamelCase} from "./util"
import InputField from "../Common/InputField";

const SelectField = ({ label, options = [], optionValues = [], fullLine, values, ...props }) => {
  const [field, meta] = useField(props);
  const className = fullLine ? "form-group" : "input-form-group";
  const fields = field.name.split('_');

  console.log(values, "Valll")
  const otherFieldName = fields.slice(0, fields.length - 1).join("_") + fields.length > 1 ? "_":"" + "other" + titleCase(fields.at(-1));

  return (
    <div className={className}>
      <div className={className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} className="text-input">
          <option value="">Select an option</option>
          {options.map((option, idx) => (
            <option key={idx} value={optionValues.length > 0 ? optionValues[idx]: option}>{option}</option>
          ))}
        </select>
        {meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
      {
        
        isOtherSelected(field.value) &&
        
        <div className={props.children && "input-group"}>
          <InputField
            name={otherFieldName}
            label={`Other ${label}, if you selected any other`}
            value={values && values[otherFieldName]}
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
            name={`${toCamelCase(field.name)}Frequency`}
            label={`Enter the frequency of ${field.value.toLowerCase()}`}
            value={values && values[`${toCamelCase(field.name)}Frequency`]}
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

