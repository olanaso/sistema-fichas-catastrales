import React from "react";
import Button from "./Button";
import { Typeahead } from 'react-bootstrap-typeahead';

const Select2 = ({ label,
                   link,
                   name,
                   options = [],
                   multiple,
                   button,
                   id,
                   required = false,
                   placeholder }) => {
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
        <Typeahead className='w-100' id={id} options={options} size='small' multiple={multiple} placeholder={placeholder} />
        {
          button && <Button name={button.name} type={button.type} href={button.href} icon={button.icon} format={button.format} />
        }
      </div>
    </div>
  )
}

export default Select2;