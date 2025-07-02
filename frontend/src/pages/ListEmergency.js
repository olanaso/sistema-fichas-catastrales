import React from "react";
import Table from "../components/Table";
import TableItem from "../components/TableItem";
import { Link } from "react-router-dom";

const ListEmergency = () => {
  const lista = [
    {
      id: '0046566',
      codigo: '0046566',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046567',
      codigo: '0046567',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046568',
      codigo: '0046568',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046569',
      codigo: '0046569',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046570',
      codigo: '0046570',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046571',
      codigo: '0046571',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046572',
      codigo: '0046572',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046573',
      codigo: '0046573',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046574',
      codigo: '0046574',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    },
    {
      id: '0046575',
      codigo: '0046575',
      titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
      fechaRegistro: '18/08/2021',
      tipoEmergencia: 'Climatológico',
      tipoSolicitud: 'Temporal'
    }
  ];

  return (

    <div className='container-section'>
      <div className="container-header">
        <span className="container-header__title">Listado de emergencia</span>
        <Link to="/emergency/register" className="btn btn-add">
          Agregar <i className="fa fa-plus-circle" />
        </Link>
      </div>
      <div className="list-container">
        <div className="list-container-filter">
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
        <Table head={['Código SIMPAD', 'Título', 'Fecha de Emergencia', 'Tipo de Emergencia','Tipo de Solicitud', 'Acciones']}>
          {
            lista.map((item, key) => <TableItem key={key} first={item.codigo}
                                                id={item.id}
                                                items={[ item.titulo, item.fechaRegistro, item.tipoEmergencia, item.tipoSolicitud ]}
                                                pair={key % 2 === 0} />)
          }
        </Table>
      </div>
      <div className="container-buttons">
        <nav>
          <ul className="pagination">
            <li className="page-item disabled"><a className="page-link" href="#" tabIndex="-1" aria-disabled="true"><i className="fa fa-angle-left" /></a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">...</a></li>
            <li className="page-item"><a className="page-link" href="#">9</a></li>
            <li className="page-item"><a className="page-link" href="#">10</a></li>
            <li className="page-item">
              <a className="page-link" href="#"><i className="fa fa-angle-right" /></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ListEmergency;