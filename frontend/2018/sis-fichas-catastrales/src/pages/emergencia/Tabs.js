import React, { useState } from "react";
import { Switch, Route, Link, useRouteMatch, NavLink } from "react-router-dom";
import { Paths } from "./paths";
import { Nav, Row, Col } from "react-bootstrap";

const Entidad = () => {
  const { url } = useRouteMatch();
  return (
    <>
        <form id="msform">
        <ul id="progressbar">
            <li className="active" id="account"><strong>Datos de la Emergencia</strong></li>

            <li id="payment"><strong>Adicionales</strong></li>
            <li id="confirm"><strong>Finalizacion</strong></li>
        </ul>
        </form>
        <hr/>

     </>
  );
};

export default Entidad;
