import React from "react";
import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import Switch from "../components/Switch";

const UsersRoles = () => {
  return (
    <div className='container-section container-section--max'>
      <div className="container-header">
        <span>Configuración de Usuarios</span>
      </div>
      <div className="container-tabs">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/users'>Usuarios</Link>
            </button>
            <button className="nav-link active" id="nav-roles-tab" data-bs-toggle="tab" data-bs-target="#nav-roles"
                    type="button" role="tab" aria-controls="nav-roles" aria-selected="true">
              <Link to='/users/roles'>Asignación Roles</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/users/permisos'>Permisos</Link>
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-roles" role="tabpanel" aria-labelledby="nav-roles-tab">
            <div className="container-tab">
              <p>Búsqueda</p>
              <span>
                <InputGroup name='usuario' label='Usuario' required />
              </span>

              <div className="container-tab__buttons">
                <Button name='Buscar' />
                <Button name='Limpiar' type='add' />
              </div>

              <p>Asignación de Roles a: <span>lmeza</span></p>
              <div className="group-switchs">
                <Switch name='administra' label='Administrador' />
                <Switch name='editor' label='Editor' />
                <Switch name='publico' label='Público' />
              </div>

              <div className="container-tab__footer">
                <Button name='Guardar' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-buttons d-none"></div>
    </div>
  )
}

export default UsersRoles;