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
    getOneSatelite,
    updateSatelite,
} from "../api"

const ModalEdit = (props) => {
    //Declarando los estados
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setObject, handleInputChange, reset] = useForm({nombre: ""}, [
        "satelite", "noradid"
    ]);
    //Funcion que inicializa el compoente y obtiene el formularios
    useEffect(async () => {
        let result = await getOneSatelite(id);
        setObject(result)
    }, []);

    //Funcion que envia el formulario
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateSatelite({...object, flgActivo: true})
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
                            Editar Satelite
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el nombre del satelite",
                                        label: "Denominación"
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el satelite",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "satelite",
                                        value: object.satelite,
                                        onChange: handleInputChange
                                    }}
                                />
                            </Col>

                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el código noradid según n2yo",
                                        label: "noradid "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el código noradid",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "noradid",
                                        as: "textarea",
                                        value: object.noradid,
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
