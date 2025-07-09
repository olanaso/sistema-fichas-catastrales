import React from "react";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import ButtonToggle from "../components/ButtonToggle";
import InputRadio from "../components/InputRadio";
import InputCheckbox from "../components/InputCheckbox";
import ButtonModal from "../components/ButtonModal";

import Map1 from '../assets/images/map1.png';
import Map2 from '../assets/images/map2.png';
import Map3 from '../assets/images/map3.png';

const GeographicAnalysis = () => {

  const [map, setMap] = React.useState(Map1);
  
  return (
    <>
      <div className="container-maps">
        <section>
          <div className="container-maps__options">
            <div>
              <ButtonModal icon='search' name='search' type='light' id='modalSearch'>
                <h6>Búsqueda de Localidad</h6>
                <form>
                  <InputGroup name='departamento' label='Departamento' />
                  <InputGroup name='provincia' label='Provincia' />
                  <InputGroup name='distrito' label='Distrito' />
                  <div className="mt-3">
                    <Button name='Buscar' className='mx-1' />
                    <Button name='Cerrar' type='cancel' />
                  </div>
                </form>
              </ButtonModal>
              <ButtonModal name='Agregar SHP, KML' type='light' id='modalSHP'>
                <h6>Búsqueda de Localidad</h6>
                <form>
                  <InputGroup name='departamento' label='Departamento' />
                  <InputGroup name='provincia' label='Provincia' />
                  <InputGroup name='distrito' label='Distrito' />
                  <div className="mt-3">
                    <Button name='Buscar' className='mx-1' />
                    <Button name='Cerrar' type='cancel' />
                  </div>
                </form>
              </ButtonModal>
            </div>
            <div>
              <Button format='link' href="/geographic-print" className="mx-1" icon='print' name='Imprimir' type='light' />
              <ButtonToggle icon='angle-down' type='light' name='Capas'>
                <InputCheckbox name='depar' label='Departamento' />
                <InputCheckbox name='prov' label='Provincia' />
                <InputCheckbox name='distri' label='Distrito' />
                <InputCheckbox name='centro' label='Centro Pob.' />
              </ButtonToggle>
            </div>
          </div>

          <img src={Map1} alt="Mapa 1" />
          <div className="container-maps__options container-maps__options--bottom">
            <span className="buffer"><span>Buffer:</span><span>14 km</span></span>
            <div>
              <ButtonToggle icon='angle-down' name='Mapa Base' type='light'>
                <InputRadio name='google' group='mapa-base' label='Google' />
                <InputRadio name='satelite' group='mapa-base' label='Satelite' />
                <InputRadio name='connida' group='mapa-base' label='Connida' />
                <InputRadio name='osm' group='mapa-base' label='OpenStreetMap' />
              </ButtonToggle>

              <Button icon='plus' className='btn-zoom' type='light'/>
              <Button icon='minus' className='btn-zoom' type='light mx-1'/>
            </div>
          </div>
        </section>
        <div className="container-submaps">
          <section>
            <div className="container-maps__options">
              <ButtonToggle name='Mapas del CLima' type='light'>
                <InputCheckbox name='depar1' label='Departamento' />
                <InputCheckbox name='prov1' label='Provincia' />
                <InputCheckbox name='distri1' label='Distrito' />
                <InputCheckbox name='centro1' label='Centro Pob.' />
              </ButtonToggle>
            </div>
            <img src={Map2} alt="Mapa 2" />
          </section>
          <section>
            <div className="container-maps__options">
              <ButtonToggle name='Mapa de Probabilidad' type='light'>
                <InputCheckbox name='depar2' label='Departamento' />
                <InputCheckbox name='prov2' label='Provincia' />
                <InputCheckbox name='distri2' label='Distrito' />
                <InputCheckbox name='centro2' label='Centro Pob.' />
              </ButtonToggle>

              <ButtonToggle icon='angle-down' name='Capas' type='light'>
                <InputCheckbox name='nub' label='Prob. Nubosidad Aqua 2002-2020' />
                <div className="mx-4">
                  <InputCheckbox name='enero' label='Enero' />
                  <InputCheckbox name='febrero' label='Febrero' />
                  <InputCheckbox name='marzo' label='Marzo' />
                  <InputCheckbox name='abril' label='Abril' />
                  <InputCheckbox name='mayo' label='Mayo' />
                  <InputCheckbox name='junio' label='Junio' />
                  <InputCheckbox name='julio' label='Julio' />
                </div>
                <InputCheckbox name='terra' label='Prob. Nubosidad Terra 2003-2020' />
              </ButtonToggle>
            </div>
            <img src={Map3} alt="Mapa 3" />
          </section>
        </div>
      </div>
    </>
  )
}

export default GeographicAnalysis;