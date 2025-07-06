import React from "react";

const Switch = ({ label, name, checked }) => (
  <div className="input-flex">
    <label className="form-label" htmlFor="">{label}</label>
    <label htmlFor={name} className="switch">
      <input type="checkbox" id={name} checked={checked} />
      <i className="slider round" />
    </label>
  </div>
)

export default Switch;