import React, {useEffect, useState} from "react";
import AlertItem from "./Day";
import InputCheckbox from "./InputCheckbox";
import ButtonToggle from "./ButtonToggle";
import {useHistory} from "react-router-dom";
import {Modal, Col, Form, DropdownButton} from "react-bootstrap";
import {daysOfAnioMes} from "./utils";
import ClickOutside from 'react-click-outside';

const moment = require('moment');
const initialAnio=moment().format('YYYY')
const initialmes=moment().format('MM')

const obtenerDataMes = (anio=initialAnio,mes=initialmes) => {
    let daysArray = [];
    let {cantDaysMonth, initialDay, nameInitialDay, numberInitialDay, finishDay} = daysOfAnioMes(anio,mes)
    numberInitialDay = parseInt(numberInitialDay == "0" ? "7" : numberInitialDay)
    for (let i = 0; i < numberInitialDay - 1; i++) {
        daysArray.push({day: "", mes: mes, anio: anio, estado: false})
    }
    for (let j = numberInitialDay; j < numberInitialDay + cantDaysMonth; j++) {
        daysArray.push({day: j - numberInitialDay + 1, mes: mes, anio: anio, estado: true})
    }
    return daysArray;
}

const Calendar = (props) => {
    let history = useHistory();
    const [listDays, setListDays] = useState([]);
    const [mes, setmes] = useState(initialmes);
    const [anio, setAnio] = useState(initialAnio);
    const [editarParticipantes, seteditarParticipantes] = useState(false);
    let daysArray = [];
    useEffect(() => {
        async function init() {
            setListDays(obtenerDataMes())
        }
        init();
    }, []);


    const activarEditarParticipante = () => {
        seteditarParticipantes(true)
    }

    const desactivarEditarParticipante = () => {
        seteditarParticipantes(false)
        setListDays(obtenerDataMes(anio,mes))
    }

    let back = (e) => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <Modal
            show={true}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <div className="alerts">
                <button className="alerts__exit" onClick={back}><i className="fa fa-times fa-2x"/></button>
                <h2>Rol de Alertas</h2>
                <hr/>
                <div className="alerts-calendar">
                    {!editarParticipantes ?
                        <span onClick={activarEditarParticipante}>   <DropdownButton id="dropdown-basic-button"
                                                                                     title={`${mes} - ${anio}`}
                                                                                     variant={"light"}>       </DropdownButton> </span> :

                        <ClickOutside onClickOutside={desactivarEditarParticipante}>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Año</Form.Label>

                                <Form.Control onChange={(e) => setAnio(e.target.value)} value={anio}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Mes</Form.Label>
                                <Form.Select defaultValue="Choose..." onChange={(e) => setmes(e.target.value)}>
                                    <option value={"1"}>Enero</option>
                                    <option value={"2"}>Febrero</option>
                                    <option value={"3"}>Marzo</option>
                                    <option value={"4"}>Abril</option>
                                    <option value={"5"}>Mayo</option>
                                    <option value={"6"}>Junio</option>
                                    <option value={"7"}>Julio</option>
                                    <option value={"8"}>Agosto</option>
                                    <option value={"9"}>Setiembre</option>
                                    <option value={"10"}>Octubre</option>
                                    <option value={"11"}>Noviembre</option>
                                    <option value={"12"}>Diciembre</option>
                                </Form.Select>
                            </Form.Group>


                        </ClickOutside>

                    }

                </div>
                <hr/>
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
                            listDays.map(item => <AlertItem {...item} />)
                        }
                    </section>
                    <section className="alerts-filter">
                        <div className="alerts-filter-section">
                            <div>
                                <label htmlFor="coen">COEN</label>
                                <input type="checkbox" name="coen" id="coen"/>
                            </div>
                            <InputCheckbox name='auccahusi' label='Auccahusi'/>
                            <InputCheckbox name='mamani' label='Mamani'/>
                            <InputCheckbox name='osorio' label='Osorio'/>
                            <InputCheckbox name='angeles' label='Angeles'/>
                            <InputCheckbox name='leon' label='Leon'/>
                            <InputCheckbox name='ventura' label='Ventura'/>
                        </div>
                        <div className="alerts-filter-section">
                            <div>
                                <label htmlFor="digeo">DIGEO</label>
                                <input type="checkbox" name="digeo" id="digeo"/>
                            </div>
                            <InputCheckbox name='vilon' label='Villon'/>
                            <InputCheckbox name='quintanilla' label='Quintanilla'/>
                            <InputCheckbox name='caballero' label='Caballero'/>
                            <InputCheckbox name='angeles1' label='Angeles'/>
                            <InputCheckbox name='leon1' label='Leon'/>
                            <InputCheckbox name='zapata' label='Zapata'/>
                        </div>
                    </section>
                </div>
            </div>

        </Modal>
    )
}

export default Calendar;