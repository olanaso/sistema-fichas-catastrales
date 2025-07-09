import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import Table from "../components/Table";
import TableItem from "../components/TableItem";
import ButtonModal from "../components/ButtonModal";

const Users = () => {
  const lista = [
    {
      id: '1',
      item: '1',
      usuario: 'lmeza',
      nombres: 'Luis Meza Espinoza',
      rol: 'Administrador',
    },
    {
      id: '2',
      item: '2',
      usuario: 'lmeza',
      nombres: 'Luis Meza Espinoza',
      rol: 'Administrador',
    },
    {
      id: '3',
      item: '3',
      usuario: 'lmeza',
      nombres: 'Luis Meza Espinoza',
      rol: 'Administrador',
    }
  ];
  return (
    <div className='container-section container-section--max'>
      <div className="container-header dropstart">
        <span>Configuración de Usuarios</span>
        <ButtonModal icon='plus-circle' name='Agregar' type='add' id='modalUser'>
          <h6>Registro de Usuario</h6>
          <form>
            <InputGroup name='institu' label='Institución' required />
            <InputGroup name='direcc' label='Dirección' required />
            <InputGroup name='nombres' label='Nombres' required />
            <InputGroup name='apellidos' label='Apellidos' required />
            <InputGroup name='cargo' label='Cargo' required />
            <InputGroup name='tele' label='Teléfono' required type='tel' />
            <InputGroup name='correo' label='Correo' required type='email' />
            <div className="modal-content-footer">
              <Button name='Guardar' className='mx-1' />
              <Button name='Cerrar' type='cancel' />
            </div>
          </form>
        </ButtonModal>
      </div>
      <div className="container-tabs">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="nav-usuarios-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-usuarios" type="button" role="tab" aria-controls="nav-usuarios"
                    aria-selected="true">
              <Link to='/users'>Usuarios</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/users/roles'>Asignación Roles</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/users/permisos'>Permisos</Link>
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-usuarios" role="tabpanel"
               aria-labelledby="nav-usuarios-tab">
            <div className="container-tab">
              <p>Búsqueda</p>
              <span>
                <InputGroup name='dni' label='DNI' type='number' required />
              </span>

              <div className="container-tab__filter">
                <div>
                  <select name="" id="">
                    <option value="#">Filtros</option>
                  </select>
                </div>
                <div>
                  <select name="" id="">
                    <option value="#">Acciones</option>
                  </select>
                </div>
                <div>
                  <input type="checkbox" name="select-all" id="select-all"/>
                  <label htmlFor="select-all">Seleccionar Todos</label>
                </div>
              </div>

              <div className="container-tab__buttons">
                <Button name='Buscar' />
                <Button name='Limpiar' type='add' />
                <Button name='Excel' type='file' icon='file-excel' />
              </div>

              <div className="container-tab__table">
                <Table head={[ 'Item', 'Usuario', 'Nombres y Apellidos', 'Rol', 'Acciones' ]}>
                  {
                    lista.map((item, key) => <TableItem key={key} first={item.item}
                                                        items={[ item.usuario, item.nombres, item.rol ]}
                                                        pair={key % 2 === 0}
                                                        id={item.id} />)
                  }
                </Table>
              </div>

              <nav className="container-tab__footer">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true"><span
                      className="fa fa-angle-left"></span></a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item disabled">
                    <a className="page-link" href="#"><span className="fa fa-angle-right"></span></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-buttons d-none"></div>
    </div>
  )
}

export default Users;