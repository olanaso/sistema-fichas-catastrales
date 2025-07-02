import React, {useState, useEffect} from "react";
import Tabs from "../Tabs";
import {Row as RowForm, Col, Form, Button, Row, Table} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import {Link, useLocation} from "react-router-dom";
import {Paths, formatPath} from "../paths";
import {useToasts} from "react-toast-notifications";
import {useTable} from "../../../hooks/useTable";
import {useForm} from "../../../hooks/useForm";
import ComboOptions from "../../../components/ComboOptions";
import Autocomplete from "../../../components/forms/Autocomplete";
import Check from "../component/Check";
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
    getContactos,
    productosEsperadosEspecificos, listarDepartamento, listarprovincia, listardistrito
} from "../api"


const EmergenciaEdit = () => {


    const [departamentos, setDepartamentos] = useState()
    const [provincias, setProvincias] = useState()
    const [distritos, setdistritos] = useState()
    const [contactos, setContactos] = useState([])


    //Para el cambio del ubigeo en los combos
    const handleProvincias = async (e) => {
        setProvincias(await listarprovincia(e.target.value))
    }

    const handleDistritos = async (e) => {
        setdistritos(await listardistrito(e.target.value))
    }

    const handleChangeAutocomplete = (callbackObjectSelect) => {
        if (callbackObjectSelect) {
            console.log(callbackObjectSelect)
            setObject({
                ...object,
                idContacto: callbackObjectSelect.id,
                cargo: callbackObjectSelect.cargo,
                telefono: callbackObjectSelect.telefono,
                correo: callbackObjectSelect.correo
            })

        }

    }

    const [state, setState] = useState({
        disabled: false,
        dropup: false,
        flip: false,
        highlightOnlyResult: false,
        minLength: 0,
        open: undefined,
    })


    //Variables de estado
    const [object, setObject, handleInputChange, reset] = useForm({nombre: "", descripcion: ""}, [
        "titulo"
    ]);

    const [
        activePage,
        changePage,
        limit,
        totalItemsCount,
        pageRangeDisplayed,
        items
    ] = useTable();


    const {addToast} = useToasts();
    //FUncion que se ejecuta al inicial la pagina

    useEffect(() => {
        async function init() {
            try {
                setDepartamentos(await listarDepartamento())
                setContactos(await getContactos())

            } catch (err) {
                addToast("Ocurrio un error al cargar los datos:" + err.message, {
                    appearance: "error",
                    autoDismiss: true
                });
            }
        }

        init();
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // await createProducto({...object,flgActivo:true})
            addToast("Se registro correctamente la emergencia", {
                appearance: "success",
                autoDismiss: true
            });
            //history.goBack();
        } catch (err) {
            addToast("Error: " + err.message, {
                appearance: "error",
                autoDismiss: true
            });
        } finally {
        }
    }

    const handleUbigeo = (e) => {
        let arrayvalues = e.target.value.split("|");
        setObject({...object, distrito: arrayvalues[0], ubigeo: arrayvalues[1]})
    }


    return (
        <>
            <FormsWrapper title="Editar de Emergencia">


                <Form className="form2" onSubmit={handleSubmit}>

                    <TitleForm>Denominación de la solicitud</TitleForm>
                    <Row className="mb-3">
                        <Col sm={4}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "SIMPAD", label: "SIMPAD"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "",
                                    type: "text",
                                    size: "sm",
                                    required: true,
                                    name: "asd",
                                    value: object.codSinpad,
                                    onChange: handleInputChange
                                }}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Titulo", label: "Titulo"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "",
                                    type: "text",
                                    size: "sm",
                                    required: true,
                                    name: "titulo",
                                    value: object.titulo,
                                    onChange: handleInputChange
                                }}
                            />
                        </Col>
                    </Row>

                    <TitleForm>Ubicación</TitleForm>
                    <Row className="mb-3">
                        <Col sm={6}>

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    Departamento
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Select size="sm" required={true} name={"departamento"}
                                                 onChange={e => {
                                                     handleInputChange(e);
                                                     handleProvincias(e)
                                                 }}>
                                        <option value="0">-- SELECCIONE --</option>
                                        {departamentos ?
                                            <ComboOptions data={departamentos} valorkey="id"
                                                          valornombre="denominacion"/>
                                            : "Cargando..."}
                                    </Form.Select>
                                </Col>
                            </Form.Group>


                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    Provincia
                                </Form.Label>
                                <Col sm={9}>

                                    <Form.Select size="sm" required={true} name={"provincia"}
                                                 onChange={e => {
                                                     handleInputChange(e);
                                                     handleDistritos(e)
                                                 }}>
                                        <option value="0">-- SELECCIONE --</option>
                                        {provincias ?
                                            <ComboOptions data={provincias} valorkey="id" valornombre="denominacion"/>
                                            : "Cargando..."}
                                    </Form.Select>

                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={6}>

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    Distrito
                                </Form.Label>
                                <Col sm={9}>

                                    <Form.Select size="sm" required={true} name={"distrito"} onChange={handleUbigeo}>
                                        <option value="0">-- SELECCIONE --</option>
                                        {distritos ?
                                            <ComboOptions data={distritos} valorkey="id" valornombre="denominacion"/>
                                            : "Cargando..."}
                                    </Form.Select>
                                </Col>
                            </Form.Group>


                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    Ubigeo
                                </Form.Label>
                                <Col sm={9}>

                                    <ControlInline
                                        propsLabel={{sm: 0, tooltip: "", label: ""}}
                                        propsInput={{
                                            sm: 12,
                                            placeholder: "",
                                            type: "text",
                                            size: "sm",
                                            required: false,
                                            value: object.ubigeo,
                                            onChange: handleInputChange
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={6}>

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3} name={object.ubigeo} onChange={handleInputChange}>
                                    Región
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Select size="sm">
                                        <option>COSTA</option>
                                        <option>SIERRA</option>
                                        <option>SELVA</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>


                        </Col>

                    </Row>
                    <hr/>
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

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    <span className={"labelrequired"}> * </span> Contactos
                                </Form.Label>
                                <Col sm={9}>
                                    <Autocomplete options={contactos}
                                                  callbackSelect={handleChangeAutocomplete}></Autocomplete>
                                </Col>
                            </Form.Group>


                        </Col>

                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Cargo", label: "Cargo"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "Cargo",
                                    size: "sm",
                                    required: true,
                                    value: object.cargo
                                }}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Telefono", label: "Telefono"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "Telefono",
                                    size: "sm",
                                    required: true,
                                    value: object.telefono
                                }}
                            />
                        </Col>
                        <Col sm={8}>
                            <ControlInline
                                propsLabel={{sm: 3, tooltip: "Correo electronico", label: "Correo electronico"}}
                                propsInput={{
                                    sm: 9,
                                    placeholder: "Correo electronico",
                                    size: "sm",
                                    required: true,
                                    value: object.correo
                                }}
                            />
                        </Col>

                    </Row>
                    <TitleForm>3. Tipo de emergencia o peligro inminente</TitleForm>
                    <Form.Group style={{marginTop: '20px'}}>
                        {tipoEmergenciaDesastre.map((props) => (
                            <Form.Check
                                label={props.label}
                                value={props.value}
                                id={state.name}
                                key={state.name}
                                onChange={handleInputChange}
                                type="radio"
                                name="idTipoEmergencia"
                                checked={props.value == object.idTipoEmergencia}

                            />
                        ))}
                    </Form.Group>

                    <TitleForm>4. Localización Geográfica</TitleForm>
                    <Map/>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Subir KML, Shp</Form.Label>
                        <Form.Control size="sm" type="file"/>
                    </Form.Group>
                    <TitleForm>5. Tipo de sensor remoto con el que se pueda atender el requerimiento de
                        solicitud</TitleForm>

                    <Form.Group style={{marginTop: '20px'}}>
                        {TipoSensorRemoto.map((props) => (
                            <Form.Check
                                {...props}
                                id={state.name}
                                key={state.name}
                                onChange={handleInputChange}
                                type="radio"
                                name="idTipoEmergencia"
                                checked={props.value == object.idTipoEmergencia}
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

                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>Prioridad</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Ortofotografía</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Video diferido</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Video tiempo real</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>DEM (Modelo digital de elevación)</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>DTM (Modelo digital de terreno)</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Modelamiento de inundación</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Curvas de nivel</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        </tbody>
                    </Table>


                    <Table striped bordered hover size="sm">
                        <thead>

                        <tr>
                            <th>Mapa y/o productos especificos</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>Prioridad</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Ubicación general</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Identificación de zona afectada y/o expuesta</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Cuantificación de elementos expuestos afectados y/o expuestos</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td>No requiere</td>
                        </tr>
                        <tr>
                            <td>Identificación de afectación en base a cambios</td>
                            <td><Check/></td>
                            <td><Check/></td>
                            <td><Check/></td>
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
                            <Form.Control size="sm" type="text"
                                          placeholder="Ingrese la entidad que recepcionara la emergencia"/>
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

export default EmergenciaEdit;
