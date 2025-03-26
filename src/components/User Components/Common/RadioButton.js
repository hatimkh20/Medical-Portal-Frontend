import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import "./Common.css";

const RadioButton = ({ label, inline = false, defaultValue, ...props }) => {
  const [field, meta] = useField({ type: "radio", ...props });
  const { setFieldValue, values } = useFormikContext();

   // Set the default value if it's not already set
   useEffect(() => {
    if (values[props.name] === undefined) {
      setFieldValue(props.name, defaultValue);
    }
  }, [values, props.name, setFieldValue, defaultValue]);


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
