import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Paths, formatPath } from "../paths";

const Acciones = ({ row }) => {
  let location = useLocation();

  return (
    <>

        <div className="dropdown">
            <button className="btn" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.5662" cy="20.0588" r="1.94118" transform="rotate(-90 11.5662 20.0588)" fill="#9592A6"/>
                    <circle cx="11.5662" cy="11.0002" r="1.94118" transform="rotate(-90 11.5662 11.0002)" fill="#9592A6"/>
                    <circle cx="11.5662" cy="1.94066" r="1.94118" transform="rotate(-90 11.5662 1.94066)" fill="#9592A6"/>
                </svg>

            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" to={`${formatPath(Paths.emergencia_programacion, {id: row.sinpad})}`}>
                    <i className="fa fa-map-o" aria-hidden="true"></i>
                    Programación
                </Link></li>
                <li><Link className="dropdown-item" to={`${formatPath(Paths.emergencia_seguimiento, {id: row.sinpad})}`}>
                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                    Seguimiento
                </Link></li>
                <li><Link className="dropdown-item" to={`${formatPath(Paths.emergencia_envio, {id: row.sinpad})}`}>
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    Envió
                </Link></li>
                <li><Link className="dropdown-item" to={`${formatPath(Paths.emergencia_edit, {id: row.sinpad})}`}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar
                </Link></li>
                <li><Link  className="dropdown-item" to={`${formatPath(Paths.emergencia_delete, {id: row.sinpad})}`}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar
                </Link></li>

            </ul>
        </div>


    </>
  );
};

export default Acciones;
