// src/components/Common/FormLayout.js
import React from "react";
import "./Common.css";

const FormLayout = ({ title, children }) => {
  return (
    <div className="form-container">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormLayout;
