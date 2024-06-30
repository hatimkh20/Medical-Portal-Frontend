// src/components/Common/TextAreaField.js
import React from "react";
import { useField } from "formik";
import "./Common.css";

const TextAreaField = ({ label, rows = 3, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="textarea-form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} rows={rows} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextAreaField;