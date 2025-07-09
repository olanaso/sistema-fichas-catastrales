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
    getOneDirecciones,
    createDireccion,
    updateDireccion,
    deleteDireccion
} from "../api"

import {getEntidades} from "../../configuration/api"

const ModalEdit = (props) => {
    //Declarando los estados
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setObject, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre","idEntidad"
    ]);

    const resListaEntidades = useAsync(getEntidades, []);
    //Funcion que inicializa el compoente y obtiene el formularios
    useEffect(async () => {
        let result = await getOneDirecciones(id);
        setObject(result)
    }, []);

    //Funcion que envia el formulario
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateDireccion({...object, flgActivo: true})
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
                                    <Form.Label column><span className="labelrequired"> * </span>Entidad
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
                                        
                                        <Form.Select size="sm" required={true} id="idEntidad" name="idEntidad" 
                                        onChange={handleInputChange}
                                        value={object.idEntidad}
                                        >
                                        <option value="">--SELECCIONE--</option>
                                            {resListaEntidades.error ? (
                                                "Se produjo un error cargando las areas"
                                            ) : resListaEntidades.loading ? (
                                                "Cargando..."
                                            ) : (
                                                <ComboOptions
                                                data={resListaEntidades.result}
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
                                        tooltip: "Ingrese la denominacion de la entidad",
                                        label: "Denominación"
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el nombre de la Entidad",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "nombre",
                                        value: object.nombre,
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
