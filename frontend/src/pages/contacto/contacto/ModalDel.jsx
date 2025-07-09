import React, {useState, useEffect} from "react";
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
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
//Importando las api a utilizar del modulo
import {getOneContacto, deleteContacto} from "../api"

const ModalDel = (props) => {
    //Declaraciones de los estado
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [object, setObject, handleInputChange, reset] = useForm({nombres: ""}, [
        "nombres","apellidos"
    ]);
//Inicializando el componente
    useEffect(async () => {
        let result = await getOneContacto(id);
        setObject(result)
    }, []);

//Generando el submit
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await deleteContacto(object)
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

//Retrocender
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
                            ¿Desea eliminar al contacto?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
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
                                        onChange: handleInputChange,
                                        disabled: "disabled"
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
