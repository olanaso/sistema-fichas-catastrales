import React from "react";

const InputRadio = ({ name, label, group }) => {
  return (
    <div className='input-radio'>
      <input type="radio" name={group} id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default InputRadio;