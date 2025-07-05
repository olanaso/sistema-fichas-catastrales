import React, {useEffect, useState, useMemo} from 'react';
import Tabs from "../Tabs";
import {useToasts} from "react-toast-notifications";
import {Row as RowForm, Col, Form, Button, Row, Table} from "react-bootstrap";
import L from 'leaflet';
import { MapContainer, TileLayer} from 'react-leaflet';

import {useTable} from "../../../hooks/useTable";
import {useForm} from "../../../hooks/useForm";
import ComboOptions from "../../../components/ComboOptions";
import UploadGeo from "../../../components/uploadgeo/UploadGeo";
import Autocomplete from "../../../components/forms/Autocomplete";
import Check from "../component/Check";

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

//Declarando los parametros iniciales de las Mapas
const center = [51.505, -0.09]
const position3 = [-9.96885060854611, -75.37277604889371];
const zoom = 13

const Emergencia = () => {

    //Hooks de ubigeo
    const [departamentos, setDepartamentos] = useState()
    const [provincias, setProvincias] = useState()
    const [distritos, setdistritos] = useState()
    const [contactos, setContactos] = useState([])
    //la geometria de que es subida de archivo shape file
    const [geometria, setGeometria] = useState(null);
    //hook que viene de otro lado de aviso
    const [predio, setPredio] = useState({geojson:null});
    //Stado del Mapa
    const [map, setMap] = useState(null);
    //Es un Hook de estado
    const [state, setState] = useState({
        disabled: false,
        dropup: false,
        flip: false,
        highlightOnlyResult: false,
        minLength: 0,
        open: undefined,
    })
    //Hook de formulario para el registro de la emeergencia
    const [object, setObject, handleInputChange, reset] = useForm({nombre: "", descripcion: ""}, [
        "titulo"
    ]);
    //Hook para la gestion de la tabla y el paginado
    const [
        activePage,
        changePage,
        limit,
        totalItemsCount,
        pageRangeDisplayed,
        items
    ] = useTable();
    //Hook para mostrar los toast
    const {addToast} = useToasts();

    //Funcion que se ejecuta al inicial la pagina
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

    //Para el cambio del ubigeo en los combos
    const handleProvincias = async (e) => {
        setProvincias(await listarprovincia(e.target.value))
    }
    //para el cambio del distrito
    const handleDistritos = async (e) => {
        setdistritos(await listardistrito(e.target.value))
    }

    //Permite realizar el cambio de autocompletado de un input
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
    //Pernmite mostrar el ubigeo
    const handleUbigeo = (e) => {
        let arrayvalues = e.target.value.split("|");
        setObject({...object, distrito: arrayvalues[0], ubigeo: arrayvalues[1]})
    }

    //para el cambio del distrito
    const selectSensores = (e) => {
        let allCheckBox = document.getElementsByName(e.target.name)
        for (e = 0; e < allCheckBox.length; e++) {
            if(allCheckBox[e].checked == true){
                console.log(allCheckBox[e].id)
            }else{
            }
        }
    }

    //muestra el poligono que se ah subido al en el mapa
    function DisplayPosition({ map,geojson,setGeom }) {
            let geojsonLayer= L.geoJson(geojson,{
                onEachFeature: function (feature, layer) {
                    if (feature.properties) {
                        layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                            return k + ": " + feature.properties[k];
                        }).join("<br />"), {
                            maxHeight: 200
                        });
                    }
                }
            }).addTo(map);
            map.fitBounds(geojsonLayer.getBounds());
            let geometria=geojson.features[0].geometry;
            setGeom(geometria);
            return null
       /* }*/
    }

    //Pemite la creaccion de un mapa mediante react-leaflet
    const displayMap = useMemo(
        () => (
            <MapContainer
                style={{width: "500px", height:"400px"}}
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ),
        [],
    )


    return (
        <>
            <FormsWrapper title="Registro de Emergencia">

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
                    {object.geojson ? <DisplayPosition setGeom={setGeometria} geojson={object.geojson} map={map} /> : null}
                    {displayMap}

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Subir KML, Shp</Form.Label>
                        <UploadGeo form={object} setForm={setObject} nameUpload={"geojson"} funcionObtenerInfo = {null}></UploadGeo>
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
                                name="idTiposensor"
                                checked={props.value == object.idTiposensor}
                            />
                        ))}
                    </Form.Group>
                    <TitleForm>6. Selecionar los sensores con los que puede cubrirse el requerimiento</TitleForm>


                    <Form.Group>
                        {sensorReq.map((props) => (
                            <>
                                <div className="form-check">
                                    <input name="sensores"  id={props.id} type="checkbox" className="form-check-input"   onChange={selectSensores}/>
                                        <label title="" className="form-check-label">{props.label}</label>
                                </div>
                            </>

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

export default Emergencia;
