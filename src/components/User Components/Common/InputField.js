// src/components/Common/InputField.js
import React from "react";
import { useField } from "formik";
import "./Common.css";

const InputField = ({ label, fullLine = false, ...props }) => { 
  const [field, meta] = useField(props);
  const className = fullLine ? "form-group" : "input-form-group";

  return (
    <div className={className}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
