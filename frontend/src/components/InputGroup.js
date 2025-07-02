import React from "react";
import Button from "./Button";

const InputGroup = ({ label,
                      link,
                      name,
                      type,
                      placeholder,
                      button,
                      required = false,
                      value }) => {
  return (
    <div className="input-group">
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
        <input className="form-control-sm w-100" type={type} id={name} placeholder={placeholder} required={required} value={value} />
        {
          button && <Button name={button.name} type={button.type} href={button.href} icon={button.icon} format={button.format} className={button.className} />
        }
      </div>
      <div className='valid-feedback'>

      </div>
    </div>
  )
}

export default InputGroup;