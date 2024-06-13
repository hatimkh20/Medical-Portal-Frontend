// src/components/Common/InputField.js
import React from "react";
import { useField } from "formik";
import "./Common.css";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
