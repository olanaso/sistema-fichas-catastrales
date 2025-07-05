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

import {deleteEntidades,getOneEntidades } from "../api"

const EntidadModal = (props) => {

    let history = useHistory();
    let { id } = useParams();
    const {addToast} = useToasts();

    const [entidad, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
    ]);

    useEffect(async () => {
        let result=await getOneEntidades(id);
        // alert(JSON.stringify(result));
        setUser(result)
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await deleteEntidades(entidad)
            addToast("Operación correctamente realizada", {
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
                            ¿Desea eliminar la Entidad?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese la denominacion de la entidad",
                                        label: "Denominacion "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el nombre de la Entidad",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "nombre",
                                        value: entidad.nombre,
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

export default EntidadModal;
