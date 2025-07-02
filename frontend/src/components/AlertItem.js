import React from "react";

const AlertItem = ({ fecha, apellido1, apellido2 }) => {
  const hoy = Number(fecha) === new Date().getUTCDate();
  return (
    <div className={`alerts-content__item ${hoy && 'active'}`}>
      <span>{fecha}</span>
      <button className="btn btn-coen">{apellido1}</button>
      <button className="btn btn-digeo">{apellido2}</button>
    </div>
  )
}

export default AlertItem;