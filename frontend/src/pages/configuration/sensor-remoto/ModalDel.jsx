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

import {updateSensorRemoto,getOneSensorRemoto } from "../api"

const ModalDel = (props) => {
    let history = useHistory();
    let { id } = useParams();
    const {addToast} = useToasts();

    const [sensorremoto, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
    ]);

    useEffect(async () => {
        let result=await getOneSensorRemoto(id);
        // alert(JSON.stringify(result));
        setUser(result)
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateSensorRemoto({...sensorremoto,flgActivo:true})
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
                            ¿Desea eliminar el sensor remoto?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el nombre del sensor remoto",
                                        label: "Nombre "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el sensor remoto",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "nombre",
                                        value: sensorremoto.nombre,
                                        onChange: handleInputChange,
                                        disabled: "disabled"
                                    }}
                                />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type={"submit"}>Aceptar</Button>
                        <Button onClick={back} variant="outline-primary">
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalDel;
