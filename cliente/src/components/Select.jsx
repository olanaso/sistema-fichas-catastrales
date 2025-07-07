import React from "react";
import Button from "./Button";

const Select = ({ label,
                  link,
                  name,
                  options = [],
                  multiple,
                  button,
                  required = false }) => {
  return (
    <div className='input-group'>
      {
        label &&
        <label className="form-label" htmlFor={name}>
          <span>{label} {required && '*'}</span>
          {
            link && <a href={link.href}>{link.name}</a>
          }
        </label>
      }
      <div className='input-flex'>
        <select className="form-control-sm w-100" name={name} id={name} multiple={multiple} required={required}>
          {
            options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)
          }
        </select>
        {
          button && <Button name={button.name} type={button.type} href={button.href} icon={button.icon} format={button.format} />
        }
      </div>
    </div>
  )
}

export default Select;