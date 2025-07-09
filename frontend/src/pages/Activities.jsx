import React from "react";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import TableItem from "../components/TableItem";
import Table from "../components/Table";
import Select2 from "../components/Select2";

const Activities = () => {
  const personal = [
    { label: 'Paucar Toribio Carly', value: '1' },
    { label: 'Luis Meza', value: '2' },
    { label: 'Pedro Fernandez Hinostroza', value: '3' }
  ];

  const lista = [
    {
      id: '1',
      fecha: '2021-08-09',
      hora: '09:36',
      servicio: 'Alerta Coen',
      personal: 'Pauzar Toribio Carly',
      actividad: 'Se da inicio al servicio'
    },
    {
      id: '2',
      fecha: '2021-08-09',
      hora: '10:44',
      servicio: 'Alerta Coen',
      personal: 'Luis Meza',
      actividad: 'Se expuso a las entidades integrantes del COEN'
    },
    {
      id: '3',
      fecha: '2021-08-09',
      hora: '15:30',
      servicio: 'Alerta Coen',
      personal: 'Pedro Fernandez Hinostroza',
      actividad: 'Se finalizo exitosamente la carga de imagenes sa...'
    }
  ];

  return (
    <div className='container-section container-section--max'>
      <div className="container-header">
        <span>Actividades de Trabajo</span>
        <Button name='Registrar' icon='plus-circle' href='/register-activity' format='link' type='add' />
      </div>
      <div className="register-container register-container--activities">
        <div className="container-tab">
          <p>Búsqueda</p>
          <span>
            <Select2 required name='personal' label='Personal' placeholder='Ingrese el nombre o apellido del personal' options={personal} />
          </span>
          <InputGroup name='fechainicio' label='Fecha Inicio' placeholder='dd/mm/yyyy' />
          <InputGroup name='fechafin' label='Fecha Fin' placeholder='dd/mm/yyyy' />

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

          <div className='container-tab__table'>
            <Table head={['Fecha', 'Hora', 'Servicio', 'Personal', 'Actividad Realizada', 'Acciones']}>
              {
                lista.map((item, key) => <TableItem key={key} first={item.fecha}
                                             id={item.id}
                                             items={[ item.hora, item.servicio, item.personal, item.actividad ]} pair={key % 2 === 0} />)
              }
            </Table>
          </div>

          <nav className="container-tab__footer">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true"><span className="fa fa-angle-left" /></a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item disabled">
                <a className="page-link" href="#"><span className="fa fa-angle-right" /></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Activities;