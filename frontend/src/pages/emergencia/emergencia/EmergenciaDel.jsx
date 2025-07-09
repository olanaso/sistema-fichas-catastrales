import React from 'react';
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
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
import FormsWrapper from "../../../layouts/FormsWrapper";

const EmergenciaDel = () => {

    let history = useHistory();

    let back = (e) => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <>
            <Modal
                show={true}

                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form className="form2" >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            ¿Desea eliminar la Emergencia?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <ControlInline
                                    propsLabel={{
                                        sm: 3,
                                        tooltip: "Ingrese el codigo",
                                        label: "Codigo SINPAD "
                                    }}
                                    propsInput={{
                                        sm: 9,
                                        placeholder: "Ingrese el codigo SINPAD",
                                        size: "sm",
                                        type: "text",
                                        required: true,
                                        name: "nombres",
                                        value: null,
                                        onChange: null,
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

export default EmergenciaDel;