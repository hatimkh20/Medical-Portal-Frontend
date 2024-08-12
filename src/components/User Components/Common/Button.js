// src/components/Common/Button.js
import React from "react";
import "./Common.css";

const Button = ({ type, onClick, children, className , ...props}) => {
  const buttonClass = `common-button ${className || ''}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
