// src/components/Common/SelectField.js
import React from "react";
import { useField } from "formik";
import "./Common.css";

const SelectField = ({ label, options = [], fullLine, ...props }) => {
  const [field, meta] = useField(props);
  const className = fullLine ? "form-group" : "input-form-group";

  return (
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
  );
};

export default SelectField;

