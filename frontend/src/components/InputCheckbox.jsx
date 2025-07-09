import React from "react";

const InputCheckbox = ({ name, label, inverted = false }) => {
  return (
    <div className={inverted ? 'input-flex' : 'input-checkbox'}>
      {
        inverted && <label htmlFor={name}>{label}</label>
      }
      <input type="checkbox" id={name} />
      {
        !inverted && <label htmlFor={name}>{label}</label>
      }
    </div>
  )
}

export default InputCheckbox;