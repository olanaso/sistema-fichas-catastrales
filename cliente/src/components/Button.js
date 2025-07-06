import React from "react";
import { Link } from "react-router-dom";

const Button = ({ href, name, type, icon, className, format = 'button', onClick  }) => {

  if (format === 'a') return (
    <a href={ href } className={`btn btn-${type} ${className}`} onClick={onClick}>
      <span>{ name } </span>
      <i className={`fa fa-${icon}`} />
    </a>
  )
  else if (format === 'link') return (
    <Link to={ href } className={`btn btn-${type} ${className}`}>
      <span>{ name } </span>
      <i className={`fa fa-${icon}`} />
    </Link>
  )
  return (
    <button className={`btn btn-${type} ${className}`} onClick={onClick} type='button'>
      <span>{ name } </span>
      <i className={`fa fa-${icon}`} />
    </button>
  )
}

export default Button;