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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";

import {Modal, Button, Row, Col, Form} from "react-bootstrap";

import {
    getOneTipoemergencia,
    updateTipoemergencia,
} from "../api"

const ModalEdit = (props) => {
    //Declarando los estados
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setObject, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
    ]);
    //Funcion que inicializa el compoente y obtiene el formularios
    useEffect(async () => {
        let result = await getOneTipoemergencia(id);
        setObject(result)
    }, []);

    //Funcion que envia el formulario
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateTipoemergencia({...object, flgActivo: true})
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
                            Editar Tipo de Emergencia
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
                                        as: "textarea",
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
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEdit;
