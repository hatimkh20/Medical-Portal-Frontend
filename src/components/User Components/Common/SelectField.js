// src/components/Common/SelectField.js
import React from "react";
import { useField } from "formik";
import "./Common.css";

const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-group">
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
