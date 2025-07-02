import React, { useState } from "react";
import { Switch, Route, Link, useRouteMatch, NavLink } from "react-router-dom";
import { Paths } from "./paths";
import { Nav, Row, Col } from "react-bootstrap";

const Contacto = () => {
  const { url } = useRouteMatch();
  return (
    <>
      <div style={{ height: "20px" }}></div>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
            <NavLink to={`${Paths.contacto_direccion}`} className={"nav-link "}>
                Direcciones de la entidad
            </NavLink>
        </Nav.Item>
        <Nav.Item>
            <NavLink to={`${Paths.contacto_contacto}`} className={"nav-link "}>
                Contactos
            </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Contacto;
