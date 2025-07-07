import React from "react";
import { NavLink } from "react-router-dom";
const BreadCrumb = ({ paths = [] }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb crumb">
        <li className="breadcrumb-item"><i className="fa fa-home" /></li>
        {
          paths.map(path => <li key={path.url} className="breadcrumb-item" aria-current="page">
            <NavLink to={`${path.url}`}>
              {path.name}
            </NavLink>
          </li>)
        }
      </ol>
    </nav>
  )
}

export default BreadCrumb;