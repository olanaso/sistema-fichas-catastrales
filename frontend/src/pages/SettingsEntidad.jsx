import React from "react";
import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import ButtonModal from "../components/ButtonModal";
import Table from "../components/Table";
import TableItem from "../components/TableItem";
import Tags from "../components/Tags";

const SettingsEntidad = () => {
  const lista = [
    {
      id: '1',
      item: 'FD235',
      denominacion: 'Ministerio de Agricultura y Riesgo'
    },
    {
      id: '2',
      item: 'FD235',
      denominacion: 'Ministerio de Agricultura y Riesgo'
    },
    {
      id: '3',
      item: 'FD235',
      denominacion: 'Ministerio de Agricultura y Riesgo'
    }
  ];

  return (
    <div className='container-section container-section--max'>
      <div className="container-header dropstart">
        <span>Configuración de Parámetros</span>
        <ButtonModal icon='plus-circle' name='Agregar' type='add' id='modalEntidad'>
          <h6>Registro de Entidad</h6>
          <form>
            <InputGroup name='denomina' label='Denominación' required />
            <InputGroup name='direcc' label='Dirección' button={{ icon: 'plus' }} />

            <Tags tags={[ 'Municipalidad de Cañete', 'Subregión de Cañete' ]} />

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
            <button className="nav-link active" id="nav-entidad-tab" data-bs-toggle="tab" data-bs-target="#nav-entidad"
                    type="button" role="tab" aria-controls="nav-entidad" aria-selected="true">
              <Link to='/settings/entidad'>Entidad</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/settings/tipo-solicitud'>Tipo Solicitud</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/settings/contacto'>Contacto Solicitud</Link>
            </button>
            <button className="nav-link" data-bs-toggle="tab"
                    role="tab" aria-selected="false">
              <Link to='/settings/tipo-emergencia'>Tipo Emergencia</Link>
            </button>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-entidad" role="tabpanel"
               aria-labelledby="nav-entidad-tab">
            <div className="container-tab">
              <p>Búsqueda</p>
              <span>
                <InputGroup name='denomi' label='Denominación' required />
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
              </div>

              <div className="container-tab__table">
                <Table head={[ 'Item', 'Denominación', 'Acciones' ]}>
                  {
                  lista.map((item, key) => <TableItem key={key} first={item.item}
                                                      items={[ item.denominacion ]}
                                                      id={item.id}
                                                      pair={key % 2 === 0} />)
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
    </div>
  )
}

export default SettingsEntidad;