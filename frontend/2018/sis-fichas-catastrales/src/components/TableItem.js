import React from "react";
import { Link } from "react-router-dom";

const TableItem = ({ first, items = [], pair = true, id }) => {
  return (
    <tr className={`table-item ${pair && 'table-item--i'}`}>
      <td>
        <input type="checkbox" id={id}/>
        <label htmlFor={id}>{first}</label>
      </td>
      {
        items.map(item => <td key={item}>{item}</td>)
      }
      <td>
        <a href={`/emergency/editar/${id}`} title="Editar"><i className="fa fa-edit" /></a>
        <div>
          <a href='#' data-bs-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
          <ul className="dropdown-menu shadow">
            <li><Link className="dropdown-item" to="/geographic-analysis"><i className="fa fa-map-marked-alt" /> Programación</Link></li>
            <li><button className="dropdown-item"><i className="fa fa-trash" /> Eliminar</button></li>
            <li><button className="dropdown-item"><i className="fa fa-sync" /> Actualizar</button></li>
            <li><Link className="dropdown-item" to="/tracking-emergency"><i className="fa fa-chart-line" /> Seguimiento</Link>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  )
}

export default TableItem;