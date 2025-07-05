import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import InputGroup from "../components/InputGroup";
import Select from "../components/Select";
//import Button from "../components/Button";
import InputWeather from "../components/InputWeather";
import TableItemAnalysis from "../components/TableItemAnalysis";
import Alerts from "../components/Alerts";

import Nubo from '../assets/icons/cloud.svg';
import Alta from '../assets/icons/altas.svg';
import Media from '../assets/icons/medias.svg';
import Baja from '../assets/icons/bajas.svg';
import Despe from '../assets/icons/despejado.svg';
import Gota from '../assets/icons/waterdrop.svg';


import { useAsync } from "react-async-hook";
import { Modal, Button,Col,Tooltip ,OverlayTrigger,Form,Row } from "react-bootstrap";
import ComboOptions from "../components/ComboOptions";

import {getSatelitesCombo, getPrediccion10dias, getOneSatelite} from "../pages/emergencia/api"

const Dashboard = ({ children }) => {

  const resListaSatelites = useAsync(getSatelitesCombo, []);


  const [dataSatelite, setDataSatelite] = useState(null);
  const [dataPrediccion, setDataPrediccion] = useState([]);

  const [ menuVisible, setMenuVisible ]= useState(true);
  const [ optionsVisible, setOptionsVisible ]= useState(false);
  const [ alertVisible, setAlertVisible ]= useState(false);


  const handleSelectChange = async (e) => {
    e.preventDefault();
    if(e.target.value != ''){
        let satelite = await getOneSatelite(e.target.value);
        setDataSatelite(satelite);
    }
  }

  const onClickPrediccion = async(e) => {
    let result = await getPrediccion10dias(dataSatelite.noradid);
    console.log(result);
    setDataPrediccion(result.passes);
  };



  return (
    <>
      {
        alertVisible && <Alerts alertVisible={alertVisible} setAlertVisible={setAlertVisible} />
      }
      <Header setMenuVisible={setMenuVisible} menuVisible={menuVisible} alertVisible={alertVisible} setAlertVisible={setAlertVisible} />
      <div className="dashboard">
        <Menu menuVisible={menuVisible} />
        <div className='dashboard-container' style={{ animation: true ? 'options-in .2s linear forwards' : 'options-out .2s linear forwards' }}>
          <div className="crumb">
            <div className="crumb-analysis">
              <span>235656</span>
              <span>POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA</span>
              <span>Climatológico</span>
              <span>Temporal</span>
            </div>
          </div>
          <section className='container-section'>
            {
              children
            }
          </section>
          <div className="container-options">
              {/*
                 <i onClick={() => setOptionsVisible(!optionsVisible)} className={`fa fa-${optionsVisible ? 'angle-right' : 'angle-left'} more-options-analysis`} />
              */}


            <div className="options">

              <p>Elegir constelación de Satélites</p>
              <span>
              <Form.Select size="sm" required={true} id="idSatelite" name="idSatelite" onChange={handleSelectChange}>
              <option value="">--SELECCIONE--</option>
                  {resListaSatelites.error ? (
                      "Se produjo un error cargando las areas"
                  ) : resListaSatelites.loading ? (
                      "Cargando..."
                  ) : (
                      <ComboOptions
                      data={resListaSatelites.result}
                      valorkey="id"
                      valornombre="satelite"
                      />
                  )}
              </Form.Select>
              </span>

              <p>Predecir el paso de satélite en los próximos 10 días</p>
              <span><Button onClick={onClickPrediccion}>Generar</Button></span>

              <span className="options-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th colSpan="2" className="text-center">Inicio</th>
                      <th colSpan="3" className="text-center">Final</th>
                    </tr>
                    <tr>
                      <th>Fecha</th>
                      <th>Azimut</th>
                      <th>Fecha</th>
                      <th>Azimut</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className='options-table__body'>
                    {
                      dataPrediccion.map((item, i) =>
                        <TableItemAnalysis key={i} id={i} items={[ item.startDate, item.startAz, item.endDate, item.endAz ]} />)
                    }
                  </tbody>
                </table>
              </span>

              <p>Antecedentes</p>
              <InputGroup name='codigocof' label='Código COF' placeholder='Ejm: 200200222224' />
              <InputGroup name='idimage' label='ID Imagen' placeholder='Ejm: image_454545' />

              <p>Generar polinomio de interes</p>
              <span><Button name='Generar' /></span>

              <p>Analizar Clima</p>
              <span><Button name='Generar' /></span>
              <span>
                <InputWeather name='Nubosidad' value='50%' icon={Nubo} />
                <InputWeather name='Nubes Altas' value='60%' icon={Alta} />
                <InputWeather name='Nubes Medias' value='55%' icon={Media} />
                <InputWeather name='Nubes Bajas' value='12%' icon={Baja} />
                <InputWeather name='Humedad' value='10%' icon={Gota} />
                <InputWeather name='Cielo Despejado' value='65%' icon={Despe} />
              </span>

              <span className="options-buttons">
                <label htmlFor="file" className="btn btn-add"><i className="fa fa-cloud-upload-alt" /></label>
                <label htmlFor="file" className="btn btn-add"><i className="fa fa-save" /></label>
                <a href="/geographic-print" className="btn btn-add"><i className="fa fa-print" /></a>
                <a href="#" className="btn btn-add"><i className="fa fa-camera" /></a>
                <input className="d-none" type="file" name="file" id="file"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;