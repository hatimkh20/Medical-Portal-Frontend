// src/components/Common/Button.js
import React from "react";
import "./Common.css";

const Button = ({ type, onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className="common-button">
      {children}
    </button>
  );
};

export default Button;
