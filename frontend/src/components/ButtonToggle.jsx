import React from "react";

const ButtonToggle = ({ name, type, icon, className, children }) => {
  return (
    <>
      <a href='#' className={`btn btn-${type} ${className} mx-1`} data-bs-toggle="dropdown">
        <span>{ name } </span>
        <i className={`fa fa-${icon}`} />
      </a>
      <div className='dropdown-menu p-2'>
        {
          children
        }
      </div>
    </>
  )
}

export default ButtonToggle;