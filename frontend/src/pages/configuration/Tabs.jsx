import React, { useState } from "react";
import { Switch, Route, Link, useRouteMatch, NavLink } from "react-router-dom";
import { Paths } from "./paths";
import { Nav, Row, Col } from "react-bootstrap";

const Entidad = () => {
  const { url } = useRouteMatch();
  return (
    <>
      <div style={{ height: "20px" }}></div>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <NavLink to={`${Paths.config_entidad}`} className={"nav-link "}>
            Entidad
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to={`${Paths.config_estado_config}`}
            className={"nav-link "}
          >
            Estado COF
          </NavLink>
        </Nav.Item>

          <Nav.Item>
              <NavLink
                  to={`${Paths.config_producto}`}
                  className={"nav-link "}
              >
                  Producto
              </NavLink>
          </Nav.Item>
          <Nav.Item>
              <NavLink
                  to={`${Paths.config_satelite}`}
                  className={"nav-link "}
              >
                  Satelite
              </NavLink>
          </Nav.Item>


          <Nav.Item>
              <NavLink
                  to={`${Paths.config_sensor}`}
                  className={"nav-link "}
              >
                  Sensor
              </NavLink>
          </Nav.Item>
          <Nav.Item>
              <NavLink
                  to={`${Paths.config_sensor_remoto}`}
                  className={"nav-link "}
              >
                  Sensor Remoto
              </NavLink>
          </Nav.Item>



        <Nav.Item>
          <NavLink
            to={`${Paths.config_tipo_emergencia}`}
            className={"nav-link "}
          >
            Tipo Emergencia INDECI
          </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Entidad;
