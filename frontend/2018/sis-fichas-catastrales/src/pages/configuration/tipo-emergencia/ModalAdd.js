import React, {useState} from "react";
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
import {useToasts} from "react-toast-notifications";
import "react-confirm-alert/src/react-confirm-alert.css";
import {useForm} from "../../../hooks/useForm";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";

import {createProducto, createTipoemergencia } from "../api";

import {Modal, Button, Row, Col, Form} from "react-bootstrap";

const ModalAdd = (props) => {
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
    ]);
    //Creacion del registro
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createTipoemergencia({...object,flgActivo:true})
            addToast("Registro correcto", {
                appearance: "success",
                autoDismiss: true
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
                            Agregar Tipo de Emergencia
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el tipo de emergencia",
                                        label: "Nombre "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el tipo de emergencia",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "nombre",

                                        value: object.nombre,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>

                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Describa el tipo de emergencia",
                                        label: "Descripción "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese la descripción",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "descripcion",
                                        as:"textarea",
                                        value: object.descripcion,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type={"submit"}>Guardar</Button>
                        <Button onClick={back} variant="outline-primary">
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAdd;
