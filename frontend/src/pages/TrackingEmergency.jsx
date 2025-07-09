import React from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import InputGroup from "../components/InputGroup";
import Switch from "../components/Switch";
import InputFile from "../components/InputFile";
import Table from "../components/Table";
import TableItemSimple from "../components/TableItemSimple";

const TrackingEmergency = () => {
  const lista = [
    {
      id: '1',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '2',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '3',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '4',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '5',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '6',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '7',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '8',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '10',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '11',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '12',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    },
    {
      id: '13',
      fecha: '02/08/2021 08:00',
      evento: 'Imagen Satelital descargada',
      usuario: 'Luis Meza Alania'
    }
  ];
  return (
    <div className='container-section'>
      <div className="container-header">
        <span>Seguimiento de la Emergencia Nro 235656</span>
        <Button name='Atrás' type='cancel' format='link' href='/emergency' />
      </div>
      <div className='register-container'>
        <section className='container-history'>
          <div className='container-history__title'>
            <h6><i className='fa fa-calendar-times'/> Historial de la Emergencia</h6>
            <Button name='.xls' type='add' className='btn-zoom' />
          </div>
          <Table head={[ 'Fecha', 'Evento', 'Usuario' ]}>
            {
              lista.map((item, key) => <TableItemSimple key={key} pair={key % 2 === 0}
                                                        items={[ item.fecha, item.evento, item.usuario ]} />)
            }
          </Table>
          <Button name='Mostrar Más' type='add' />
        </section>
        <section className='container-resume'>
          <h6><i className='fa fa-calendar-times'/> Resumen de la Emergencia</h6>
          <div>
            <strong>N° REPORTE</strong>
            <span>235656</span>
          </div>
          <div>
            <strong>FECHA</strong>
            <span>02/08/2021 08:00</span>
          </div>
          <div>
            <strong>TITULO</strong>
            <span>por deslizamiento en el distrito de torata - moquegua</span>
          </div>
          <div>
            <strong>HECHOS</strong>
            <span>El 25 de mayo de 2020, a las 14:00 horas, se produjo un deslizamiento de aproximadamente 40cm en la cima del talud (corona), que podría afectar a las viviendas, caminos rurales, canal de riego, áreas de cultivo y servicio básicos en el sector Labramane, distrito de Torata, provincia de Mariscal Nieto</span>
          </div>
          <Select name='seguimiento' label='ESTADO' options={[{ label: 'En seguimiento' }]} />
          <h6>COF</h6>
          <InputGroup name='nropedido' label='N° pedido COF' button={{ icon: 'sync', className: 'btn-zoom' }} placeholder='A-23351-1' />
          <Select name='estadocof' label='Estado en el COF' />
          <div>
            <strong>¿Descargado?</strong>
            <Switch name='descargado' label='Descargado' />
          </div>
          <InputGroup name='urlarchivo' label='URL del archivo ó' placeholder='https://drive.google.com/Ur5E333D' />
          <span>
            <strong>Archivo</strong>
            <InputFile name='file' />
          </span>
        </section>
      </div>
    </div>
  )
}

export default TrackingEmergency;