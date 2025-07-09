import React from "react";
import AlertItem from "./AlertItem";
import InputCheckbox from "./InputCheckbox";
import ButtonToggle from "./ButtonToggle";

const Calendar = ({ alertVisible, setAlertVisible }) => {
  const calendar = [
    {
      fecha: '01', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '02', apellido1: 'Mamani', apellido2: 'Caballero'
    },
    {
      fecha: '03', apellido1: 'Chinini', apellido2: 'Coello'
    },
    {
      fecha: '04', apellido1: 'Osorio', apellido2: 'Quintanilla'
    },
    {
      fecha: '05', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '06', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '07', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '08', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '09', apellido1: 'Mamani', apellido2: 'Caballero'
    },
    {
      fecha: '10', apellido1: 'Chinini', apellido2: 'Coello'
    },
    {
      fecha: '11', apellido1: 'Osorio', apellido2: 'Quintanilla'
    },
    {
      fecha: '12', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '13', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '14', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '15', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '16', apellido1: 'Mamani', apellido2: 'Caballero'
    },
    {
      fecha: '17', apellido1: 'Chinini', apellido2: 'Coello'
    },
    {
      fecha: '18', apellido1: 'Osorio', apellido2: 'Quintanilla'
    },
    {
      fecha: '19', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '20', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '21', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '22', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '23', apellido1: 'Mamani', apellido2: 'Caballero'
    },
    {
      fecha: '24', apellido1: 'Chinini', apellido2: 'Coello'
    },
    {
      fecha: '25', apellido1: 'Osorio', apellido2: 'Quintanilla'
    },
    {
      fecha: '26', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '27', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '28', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '29', apellido1: 'Auccahusi', apellido2: 'Chavez'
    },
    {
      fecha: '30', apellido1: 'Mamani', apellido2: 'Caballero'
    },
    {
      fecha: '31', apellido1: 'Chinini', apellido2: 'Coello'
    }
  ]
  return (
    <div className="container-alerts">
      <div className="alerts">
        <button className="alerts__exit" onClick={() => setAlertVisible(!alertVisible)} ><i className="fa fa-times fa-2x" /></button>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><i className="fa fa-home" /></li>
            <li className="breadcrumb-item active" aria-current="page">Alertas</li>
          </ol>
        </nav>
        <h6>Rol de Alertas</h6>
        <div className="alerts-calendar">
          <span>Agosto 2021</span>
          <ButtonToggle icon='angle-down' type='light' className='btn-zoom'>
            <div className='alerts-calendar-content'>
              <h6>2021</h6>
              <span>Junio - 2021</span>
              <span>Julio - 2021</span>
              <span>Agosto - 2021</span>
              <span>Septiembre - 2021</span>
              <span>Octubre - 2021</span>
            </div>
          </ButtonToggle>
        </div>
        <div className="alerts-table">
          <section className="alerts-header">
            <span>LUNES</span>
            <span>MARTES</span>
            <span>MIERCOLES</span>
            <span>JUEVES</span>
            <span>VIERNES</span>
            <span>SABADO</span>
            <span>DOMINGO</span>
          </section>
          <section className="alerts-content">
            {
              calendar.map(item => <AlertItem {...item} />)
            }
          </section>
          <section className="alerts-filter">
            <div className="alerts-filter-section">
              <div>
                <label htmlFor="coen">COEN</label>
                <input type="checkbox" name="coen" id="coen"/>
              </div>
              <InputCheckbox name='auccahusi' label='Auccahusi' />
              <InputCheckbox name='mamani' label='Mamani' />
              <InputCheckbox name='osorio' label='Osorio' />
              <InputCheckbox name='angeles' label='Angeles' />
              <InputCheckbox name='leon' label='Leon' />
              <InputCheckbox name='ventura' label='Ventura' />
            </div>
            <div className="alerts-filter-section">
              <div>
                <label htmlFor="digeo">DIGEO</label>
                <input type="checkbox" name="digeo" id="digeo"/>
              </div>
              <InputCheckbox name='vilon' label='Villon' />
              <InputCheckbox name='quintanilla' label='Quintanilla' />
              <InputCheckbox name='caballero' label='Caballero' />
              <InputCheckbox name='angeles1' label='Angeles' />
              <InputCheckbox name='leon1' label='Leon' />
              <InputCheckbox name='zapata' label='Zapata' />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Calendar;