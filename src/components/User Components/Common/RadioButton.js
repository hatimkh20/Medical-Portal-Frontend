import React from "react";
import { useField } from "formik";
import "./Common.css";

const RadioButton = ({ label, inline = false, ...props }) => {
  const [field, meta] = useField({ type: "radio", ...props });

  return (
    <div className="radio-group">
      <label className={inline ? "radio-inline" : "radio-label"}>
        <input
          type="radio"
          {...field}
          {...props}
          required
        />
        {props.value}
        {/* {meta.touched && meta.error && (
        <div className="error">{meta.error}</div>
      )} */}
      </label>
      
    </div>
  );
};

export default RadioButton;
