import React from "react";
import {Link} from "react-router-dom";
import InputGroup from "../components/InputGroup";
import Switch from "../components/Switch";
import Button from "../components/Button";

const UsersPermisos = () => {
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
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/users/roles'>Asignación Roles</Link>
            </button>
            <button className="nav-link active" id="nav-permisos-tab" data-bs-toggle="tab" data-bs-target="#nav-permisos"
                    type="button" role="tab" aria-controls="nav-permisos" aria-selected="true">
              <Link to='/users/permisos'>Permisos</Link>
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-permisos" role="tabpanel" aria-labelledby="nav-permisos-tab">
            <div className="container-tab">
              <p>Búsqueda</p>
              <span>
                <InputGroup name='usuario' label='Usuario' required />
              </span>

              <div className="container-tab__buttons">
                <Button name='Buscar' />
                <Button name='Limpiar' type='add' />
              </div>

              <p>Asignación de Permisos a: <span>lmeza</span></p>
              <div className="group-switchs">
                <Switch name='acceso' label='Acceso al Análisis de Satélite' />
                <Switch name='registro' label='Registrp de Usuarios' />
                <Switch name='impresion' label='Impresión de Mapa' />
                <Switch name='edicion' label='Edición de Mapa' />
                <Switch name='exportar' label='Exportar Mapa' />
                <Switch name='compartir' label='Compartir Mapa' />
              </div>

              <div className="container-tab__footer">
                <Button name='Guardar' />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UsersPermisos;