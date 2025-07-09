import React from "react";
import Button from "./Button";

const TextArea = ({ label, link, name, rows, placeholder, button }) => {
  return (
    <div className="input-group">
      {
        label &&
        <label className="form-label" htmlFor={name}>
          <span>{label}</span>
          {
            link && <a href={link.href}>{link.name}</a>
          }
        </label>
      }
      <div className='input-flex'>
        <textarea rows={rows} className="form-control-sm w-100" id={name} placeholder={placeholder}>
        </textarea>
        {
          button && <Button name={button.name} type={button.type} href={button.href} icon={button.icon} />
        }
      </div>
    </div>
  )
}

export default TextArea;