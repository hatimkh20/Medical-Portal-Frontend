    // src/components/Common/RadioButton.js
    import React from "react";
    import "./Common.css";

    const RadioButton = ({ label, name, value, onChange, checked, inline = false }) => {
      return (
        <label className={inline ? "radio-inline" : "radio-label"}>
          <input type="radio" name={name} value={value} className="radio-input" onChange={onChange} checked={checked}/>
          {value}
        </label>
      );
    };

    export default RadioButton;
