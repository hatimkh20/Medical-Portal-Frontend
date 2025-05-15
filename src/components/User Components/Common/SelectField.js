// src/components/Common/SelectField.js
import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import "./Common.css";
import { titleCase, isOtherSelected, isPluralFrequencySelected, toCamelCase } from "./util";
import InputField from "../Common/InputField";

const SelectField = ({ label, options = [], optionValues = [], fullLine, values, defaultValue, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const className = fullLine ? "form-group" : "input-form-group";
  const fields = field.name.split('_');

  let otherFieldName = "other" + titleCase(field.name);
  if (fields.length > 1) {
    otherFieldName = fields.slice(0, fields.length - 1).join("_") + "_other" + titleCase(fields.at(-1));
  }

  // Set default value on first render if not already set
  useEffect(() => {
    if (!field.value && defaultValue) {
      setFieldValue(field.name, defaultValue);
    }
  }, []);

  return (
    <div className={className}>
      <div className={className}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select
          {...field}
          {...props}
          className="text-input"
          value={field.value || defaultValue || ""}
        >
          <option value="">Select an option</option>
          {options.map((option, idx) => (
            <option key={idx} value={optionValues.length > 0 ? optionValues[idx] : option}>
              {option}
            </option>
          ))}
        </select>
        {meta.error ? <div className="error">{meta.error}</div> : null}
      </div>

      {isOtherSelected(field.value) && (
        <div className={props.children && "input-group"}>
          <InputField
            name={otherFieldName}
            label={`Enter ${label}?`}
            value={values && values[otherFieldName]}
            required={true}
            onChange={field.onChange}
            onBlur={props.onBlur}
          />
          {props.children}
        </div>
      )}

      {isPluralFrequencySelected(field.value) && (
        <div className={props.children && "input-group"}>
          <InputField
            name={`${toCamelCase(field.name)}Frequency`}
            label={`Enter the frequency of ${field.value.toLowerCase()}`}
            value={values && values[`${toCamelCase(field.name)}Frequency`]}
            required={true}
            onChange={field.onChange}
            onBlur={props.onBlur}
            type="number"
            min="0"
          />
          {props.children}
        </div>
      )}
    </div>
  );
};

export default SelectField;
