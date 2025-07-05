import React, {useState} from "react";
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

import {createEntidades} from "../api"

import {Modal, Button, Row, Col, Form} from "react-bootstrap";

/*confirmAlert({
      title: "¿ Desea eliminar el registro ?",
      message: "Estas Seguro de hacer esto.",
      buttons: [
        {
          label: "Si",
          onClick: () => guardar()
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });*/

const ModalEntidadAdd = (props) => {
    let history = useHistory();
    let {id} = useParams();
    const {addToast} = useToasts();
    const [entidad, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
    ]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function guardar() {
        try {
            addToast(entidad.nombre, {
                appearance: "success",
                autoDismiss: true
            });
        } catch (err) {
            alert(err.message);
        } finally {
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createEntidades({...entidad,flgActivo:true})
            addToast("Registro correcto", {
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
                            Agregar entidad
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

export default ModalEntidadAdd;
