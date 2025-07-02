import React from "react";
import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import ButtonModal from "../components/ButtonModal";
import Table from "../components/Table";
import TableItem from "../components/TableItem";

const SettingsContacto = () => {
  const lista = [
    {
      id: '1',
      dni: '72325676',
      nombres: 'Luis Meza Espinoza',
      correo: 'lmeza@connida.gob.pe'
    },
    {
      id: '2',
      dni: '72325676',
      nombres: 'Luis Meza Espinoza',
      correo: 'lmeza@connida.gob.pe'
    },
    {
      id: '3',
      dni: '72325676',
      nombres: 'Luis Meza Espinoza',
      correo: 'lmeza@connida.gob.pe'
    }
  ];

  return (
    <div className='container-section container-section--max'>
      <div className="container-header dropstart">
        <span>Configuración de Parámetros</span>
        <ButtonModal icon='plus-circle' name='Agregar' type='add' id='modalContacto'>
          <h6>Registro de Contacto</h6>
          <form>
            <InputGroup name='institu' label='Institución' required />
            <InputGroup name='direcc' label='Dirección' required />
            <InputGroup name='nombres' label='Nombres' required />
            <InputGroup name='apellidos' label='Apellidos' required />
            <InputGroup name='cargo' label='Cargo' required />
            <InputGroup name='tele' label='Teléfono' type='tel' required />
            <InputGroup name='correo' label='Correo' type='email' required />
            <div className="modal-content-footer">
              <Button name='Guardar' />
              <Button name='Cerrar' type='cancel' />
            </div>
          </form>
        </ButtonModal>
      </div>
      <div className="container-tabs">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/settings/entidad'>Entidad</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/settings/tipo-solicitud'>Tipo Solicitud</Link>
            </button>
            <button className="nav-link active" id="nav-contacto-tab" data-bs-toggle="tab" data-bs-target="#nav-contacto"
                    type="button" role="tab" aria-controls="nav-contacto" aria-selected="true">
              <Link to='/settings/contacto'>Contacto Solicitud</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/settings/tipo-emergencia'>Tipo Emergencia</Link>
            </button>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-contacto" role="tabpanel" aria-labelledby="nav-contacto-tab">
            <div className="container-tab">
              <p>Búsqueda</p>
              <InputGroup name='entidad' label='Entidad' type='text' required />
              <InputGroup name='address' label='Dirección' type='text' required />
              <InputGroup name='names' label='Nombres/Apellidos' type='text' required />
              <div/>
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
                <Table head={[ 'DNI', 'Nombres y Apellidos', 'Correo', 'Acciones' ]}>
                  {
                    lista.map((item, key) => <TableItem key={key} first={item.dni}
                                                        id={item.id}
                                                        items={[ item.nombres, item.correo ]}
                                                        pair={key % 2 === 0} />)
                  }
                </Table>
              </div>

              <nav className="container-tab__footer">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true"><i className="fa fa-angle-left" /></a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item disabled">
                    <a className="page-link" href="#"><i className="fa fa-angle-right" /></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsContacto;