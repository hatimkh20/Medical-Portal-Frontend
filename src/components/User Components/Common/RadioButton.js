  // src/components/Common/RadioButton.js
  import React from "react";
  import "./Common.css";

  const RadioButton = ({ label, name, value }) => {
    return (
      <label className="radio-label">
        <input type="radio" name={name} value={value} className="radio-input" />
        {label}
      </label>
    );
  };

  export default RadioButton;
