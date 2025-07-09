import React, {useState, useEffect} from "react";

import {Row as RowForm, Col, Form, Button, Row, Table} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import {Link, useLocation} from "react-router-dom";
import {Paths, formatPath} from "../paths";
import {useToasts} from "react-toast-notifications";
import {useTable} from "../../../hooks/useTable";
import {useForm} from "../../../hooks/useForm";
import Map from "./Map"

import Pagination from "react-js-pagination";

import queryString from 'query-string';
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
import FormsWrapper from "../../../layouts/FormsWrapper";

//Servicios para este formulario
import {
    sensorReq,
    tipoEmergenciaDesastre,
    TipoSensorRemoto,
    productosEsperados,
    productosEsperadosEspecificos
} from "../api"


const Emergencia = () => {


    const [state, setState] = useState({
        disabled: false,
        dropup: false,
        flip: false,
        highlightOnlyResult: false,
        minLength: 0,
        open: undefined,
    })

    const checkboxes = [
        {checked: state.disabled, label: 'Disable the input', name: 'disabled'},
        {checked: state.dropup, label: 'Dropup menu', name: 'dropup'},
        {
            checked: state.flip,
            label: 'Flip the menu position when it reaches the viewport bounds',
            name: 'flip',
        },
        {
            checked: !!state.minLength,
            label: 'Require minimum input before showing results (2 chars)',
            name: 'minLength',
        },
        {
            checked: state.highlightOnlyResult,
            label: 'Highlight the only result',
            name: 'highlightOnlyResult',
        },
        {checked: !!state.open, label: 'Force the menu to stay open', name: 'open'},
    ];

    //Variables de estado
    const [object, setObject, handleInputChange, reset] = useForm({nombre: "", descripcion: ""}, [
        "nombre"
    ]);
    const [tiposensor, setTipoSensor] = useState([]);

    let location = useLocation();
    const [
        activePage,
        changePage,
        limit,
        totalItemsCount,
        pageRangeDisplayed,
        items
    ] = useTable();

    const [list, setList] = useState([])
    const {addToast} = useToasts();
    //FUncion que se ejecuta al inicial la pagina
    useEffect(() => {
        async function init() {
            try {

            } catch (err) {
                addToast("Ocurrio un error al cargar los datos:" + err.message, {
                    appearance: "error",
                    autoDismiss: true
                });

            }
        }

        init();
    }, []);

    //Funciones del la Interface
    const handlePageChange = async (pageNumber) => {
        let resultList = [];
        changePage(pageNumber, resultList);
    };
//Funcion de la busqueda
    const handleSerch = async (e) => {
        e.preventDefault();
        try {
            let query = await queryString.stringify(object);
            //let result = await getProductos(query, {})
            //setList(result)
            addToast("Operacion Correcta", {
                appearance: "success",
                autoDismiss: true
            });
        } catch (err) {
            addToast("Ocurrio un error al cargar los datos:" + err.message, {
                appearance: "error",
                autoDismiss: true
            });
        }

    };


    //Datos para la configuracion de la ccabecera de la tabla
    let columns = [

        {label: "Nº", key: "id"},
        {label: "Nombre", key: "nombre"},
        {label: "Descripción", key: "descripcion"},
        {label: "Acciones", key: "acciones"},
    ];

    //Para el cambio de la datos
    const _handleChange = (e) => {
        const {checked, name} = e.target;
        const newState = {[name]: checked};

        switch (name) {
            case 'minLength':
                newState[name] = checked ? 2 : 0;
                break;
            case 'open':
                newState[name] = checked ? true : undefined;
                break;
            default:
                break;
        }

        setState(newState);
    };



    return (
        <>
            <FormsWrapper title="Registro de Emergencia">
                <Form className="form2">

                    <TitleForm>1. Fecha y hora de la solicitud</TitleForm>
                    <Row className="mb-3">
                        <Col sm={6}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Fecha", label: "Fecha"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "",
                                    type: "date",
                                    size: "sm",
                                    required: true,
                                    name: "asd"
                                }}
                            />
                        </Col>
                        <Col sm={6}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Hora", label: "Hora"}}
                                propsInput={{sm: 9, placeholder: "", type: "time", size: "sm", required: true}}
                            />
                        </Col>
                    </Row>

                    <TitleForm>2. Nombre y contacto del solicitante</TitleForm>
                    <Row className="mb-3">
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Institución", label: "Institución"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "Institución",
                                    size: "sm",
                                    required: true,
                                    name: "asd"
                                }}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Nombre completo", label: "Nombre completo"}}
                                propsInput={{sm: 9, placeholder: "Nombre completo", size: "sm", required: true}}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Cargo", label: "Cargo"}}
                                propsInput={{sm: 9, placeholder: "Cargo", size: "sm", required: true}}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Telefono", label: "Telefono"}}
                                propsInput={{sm: 9, placeholder: "Telefono", size: "sm", required: true}}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Correo electronico", label: "Correo electronico"}}
                                propsInput={{sm: 9, placeholder: "Correo electronico", size: "sm", required: true}}
                            />
                        </Col>

                    </Row>
                    <TitleForm>3. Tipo de emergencia o peligro inminente</TitleForm>
                    <Form.Group style={{marginTop: '20px'}}>
                        {tipoEmergenciaDesastre.map((props) => (
                            <Form.Check
                                {...props}
                                id={state.name}
                                key={state.name}
                                onChange={_handleChange}
                                type="checkbox"
                            />
                        ))}
                    </Form.Group>

                    <TitleForm>4. Localización Geográfica</TitleForm>
                    <Map/>
                    <TitleForm>5. Tipo de sensor remoto con el que se pueda atender el requerimiento de
                        solicitud</TitleForm>

                    <Form.Group style={{marginTop: '20px'}}>
                        {TipoSensorRemoto.map((props) => (
                            <Form.Check
                                {...props}
                                id={state.name}
                                key={state.name}
                                onChange={_handleChange}
                                type="checkbox"
                            />
                        ))}
                    </Form.Group>
                    <TitleForm>6. Selecionar los sensores con los que puede cubrirse el requerimiento</TitleForm>


                    <Form.Group>
                        {sensorReq.map((props) => (
                            <Form.Check
                                {...props}
                                id={state.name}
                                key={state.name}

                                type="checkbox"
                            />
                        ))}
                    </Form.Group>


                    <TitleForm>7. Seleccionar los productos esperados estableciendo un nivel de prioridad del 1 al 3,
                        donde: 1 es prioridad muy alta, 2 es prioridad alta y 3 es prioridad media</TitleForm>


                    <Table striped bordered hover size="sm">
                        <thead>

                        <tr>
                            <th>Producto esperados</th>

                            <th colSpan="4">Prioridad</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Ortofotografía</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Video diferido</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Video tiempo real</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>DEM (Modelo digital de elevación)</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>DTM (Modelo digital de terreno)</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Modelamiento de inundación</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Curvas de nivel</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        </tbody>
                    </Table>


                    <Table striped bordered hover size="sm">
                        <thead>

                        <tr>
                            <th>Mapa y/o productos especificos</th>

                            <th colSpan="4">Prioridad</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Ubicación general</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Identificación de zona afectada y/o expuesta</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Cuantificación de elementos expuestos afectados y/o expuestos</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Identificación de afectación en base a cambios</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>No requiere</td>
                        </tr>

                        </tbody>
                    </Table>

                    <Row className="mb-3">

                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Correo electronico", label: "Otros, especificar"}}
                                propsInput={{sm: 9, placeholder: "", size: "sm", required: true}}
                            />
                        </Col>

                    </Row>
                    <TitleForm>8. Entidad que recepcionará la data generada</TitleForm>

                    <Row className="mb-3">

                        <Col sm={8}>
                            <Form.Control size="sm" type="text" placeholder="Ingrese la entidad que recepcionara la emergencia"/>
                        </Col>


                    </Row>

                    <TitleForm>9. Instrucciones adicionales</TitleForm>
                    <Row className="mb-3">
                        <Col sm={8}>
                            <Form.Control size="sm" type="text" placeholder="Ingrese las instrucciones adicionales"/>
                        </Col>
                    </Row>

                    <ContainerButtons>
                        <Button variant="primary" type="submit">Guardar</Button>{' '}
                        <Button variant="secondary">Cancelar</Button>{' '}
                    </ContainerButtons>
                    <TitleForm></TitleForm>
                    <TitleForm></TitleForm>
                    <TitleForm></TitleForm><TitleForm></TitleForm><TitleForm></TitleForm><TitleForm></TitleForm>
                </Form>

            </FormsWrapper>
        </>
    );
};

export default Emergencia;
