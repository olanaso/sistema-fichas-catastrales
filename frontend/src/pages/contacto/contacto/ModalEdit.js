import React, {useState, useEffect} from "react";
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
import {useToasts} from "react-toast-notifications";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {useForm} from "../../../hooks/useForm";
import ComboOptions from "../../../components/ComboOptions";
import queryString from 'query-string';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";


import {Modal, Button, Row, Col, Form, Tooltip ,OverlayTrigger} from "react-bootstrap";

import { useAsync } from "react-async-hook";

import {
    getOneContacto,
    updateContacto,
    getDireccionesCombo
} from "../api"

import {getEntidades} from "../../configuration/api"

const ModalEdit = (props) => {
    //Declarando los estados
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setObject, handleInputChange, reset] = useForm({nombres: "",Direccion:{ idEntidad:0 }}, [
        "nombres","apellidos","cargo","telefono","correo","idDireccion"
    ]);

    const resListaEntidades = useAsync(getEntidades, []);

    const [dataDireccion, setDataDireccion] = useState(null);

    const handleSelectChange = async (e) => {
        e.preventDefault();
        if(e.target.value != ''){
            cargarDirecciones(e.target.value);
        }
    }

    const cargarDirecciones = async (id) => {
        let result = await getDireccionesCombo(id);
        setDataDireccion(result);
    }

    //Funcion que inicializa el compoente y obtiene el formularios
    useEffect(async () => {
        const getContacto=async (idContacto)=>{
            let contacto = await getOneContacto(idContacto);
            setObject(contacto)
            cargarDirecciones(contacto.Direccion.idEntidad)
         }
         getContacto(id);

        // let result = await getOneContacto(id);
        // setObject(result)
        // setDataEntidad(result["Direccion"]);
    }, []);

    //Funcion que envia el formulario
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateContacto({...object, flgActivo: true})
            addToast("Operación correctamente realizada", {
                appearance: "success",
                autoDismiss: false
            });
            history.goBack();
        } catch (err) {
            addToast("Error: " + err.message, {
                appearance: "error",
                autoDismiss: true
            });
        } finally {
        }
    }

    //Regresa a la pagina anterior
    let back = (e) => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <>
            <Modal
                show={true}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form className="form2" onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar Direccion
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row className="mb-3">
                            <Col sm={12}>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontal-a">
                                    <Form.Label column><span className="labelrequired"> * </span>Entidad&nbsp;
                                        <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-email`}>
                                            Seleccione una entidad
                                            </Tooltip>
                                        }
                                        >
                                        <i class="fas fa-info-circle"></i>
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Select size="sm" required={true} name={"idEntidad"} onChange={e=>handleSelectChange(e)}>
                                            <option value="">-- SELECCIONE --</option>
                                            {resListaEntidades.error ? (
                                                "Se produjo un error cargando las areas"
                                            ) : resListaEntidades.loading ? (
                                                "Cargando..."
                                            ) : (
                                                resListaEntidades.result.map(item => {
                                                    return <option key={item.id} value={item.id} selected={object.Direccion.idEntidad ? object.Direccion.idEntidad == item.id ? true : false : false}  >{item.nombre}</option>
                                                })
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={12}>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontal-a">
                                    <Form.Label column><span className="labelrequired"> * </span>Direccion&nbsp;
                                        <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-email`}>
                                            Seleccione una direccion
                                            </Tooltip>
                                        }
                                        >
                                        <i class="fas fa-info-circle"></i>
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Col sm={9}>
                                        
                                        <Form.Select size="sm" required={true} id="idDireccion" name="idDireccion" 
                                        onChange={handleInputChange}
                                        value={object.idDireccion}>
                                        <option value="">--SELECCIONE--</option>
                                        {dataDireccion && (
                                            <ComboOptions
                                            data={dataDireccion}
                                            valorkey="id"
                                            valornombre="nombre"
                                            />
                                        )}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese los nombres",
                                        label: "Nombres "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese los nombres",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "nombres",
                                        value: object.nombres,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese los apellidos",
                                        label: "Apellidos "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese los apellidos",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "apellidos",
                                        value: object.apellidos,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el cargo",
                                        label: "Cargo "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el cargo",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "cargo",
                                        value: object.cargo,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el telefono",
                                        label: "Telefono "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el telefono",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "telefono",
                                        value: object.telefono,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el correo electronico",
                                        label: "Correo Electronico "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el correo electronico",
                                        size: "sm",
                                        type: "email",
                                        required: true,
                                        name: "correo",
                                        value: object.correo,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type={"submit"}>Guardar</Button>
                        <Button onClick={back} variant="outline-primary">
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEdit;
