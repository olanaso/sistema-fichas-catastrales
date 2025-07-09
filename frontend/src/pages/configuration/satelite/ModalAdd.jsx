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

import {createSatelite } from "../api";

import {Modal, Button, Row, Col, Form} from "react-bootstrap";

const ModalAdd = (props) => {
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "satelite", "noradid"
    ]);
    //Creacion del registro
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createSatelite({...object,flgActivo:true})
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
                            Agregar Satelite
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese la nombre del satelite",
                                        label: "Satelite "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el Satelite",
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
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAdd;
