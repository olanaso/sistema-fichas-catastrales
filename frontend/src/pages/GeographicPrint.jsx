import React from "react";
import InputGroup from "../components/InputGroup";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import InputRadio from "../components/InputRadio";

import Map from '../assets/images/mapa.png';
import Logo from '../assets/images/logo-background.png';

const GeographicPrint = () => {
  return (
    <div className='dashboard-container container-print'>
      <section className="container-print-options">
        <h5 className="container-print-options__title">
          <span>Impresión de Mapa</span>
          <a href="/geographic-analysis"><span className="fa fa-times"></span></a>
        </h5>
        <span>
          Aqui podras configurar todas las opciones para la impresion del Mapa correctamente.
        </span>
        <p>Mapa Base</p>
        <div className="container-print-check">
          <InputRadio name='google' group='mapa-base' label='Google' />
          <InputRadio name='satelite' group='mapa-base' label='Satelite' />
          <InputRadio name='connida' group='mapa-base' label='Connida' />
          <InputRadio name='osm' group='mapa-base' label='OpenStreetMap' />
        </div>
        <p>Configuración del Papel</p>
        <Select label='Tamaño de la Hoja' options={[{label: 'A1', value: 'a1'},{label: 'A2', value: 'a2'},{label: 'A3', value: 'a3'},{label: 'A4', value: 'a4'}]} />
        <div className="input-group">
          <label className="form-label">Orientación</label>
          <div className="d-flex justify-content-evenly w-100">
            <InputRadio name='vert' group='orientacion' label='Vertical' />
            <InputRadio name='hori' group='orientacion' label='Horizontal' />
          </div>
        </div>
        <Select label='Resolución' options={[{label: '90 ppp', value: '90ppp'},{label: '150 ppp', value: '150ppp'},{label: '300 ppp', value: '300ppp'},{label: '600 ppp', value: '600ppp'}]} />
        <p>Otros</p>
        <InputGroup label='Título' name='titulo' />
        <TextArea label='Descripción' name='descripcion' rows='5' />
        <Button name='Imprimir' icon='print' className='container-print__print' />
      </section>

      <section className="container-print-preview">
        <div className="section-print" id="content-print">
          <img className="section-print__logo" src={Logo} alt="Logo print" />
          <img className="section-print__image" src={Map} alt="Mapa print" />
          <div className="section-print__legend">
            <p>Leyenda</p>
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    </div>
  )
}

export default GeographicPrint;