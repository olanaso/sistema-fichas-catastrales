import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerSection from "../components/contents/ContainerSection";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import {Form} from "react-bootstrap";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Select2 from "../components/Select2";
import InputRadio from "../components/InputRadio";

const RegisterActivity = () => {
  const personal = [
    { label: "Paucar Toribio Carly", value: "1" },
    { label: "Luis Meza", value: "2" },
    { label: "Pedro Fernandez Hinostroza", value: "3" }
  ];

  return (
    <>
      <ContainerSection title={"Registro de Actividades de Trabajo"}>
          <Form >
              <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control size="sm" type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control size="sm" type="password" placeholder="Password" />
                  </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control size="sm" placeholder="1234 Main St" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control size="sm" placeholder="Apartment, studio, or floor" />
              </Form.Group>
              <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control size="sm" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>State</Form.Label>
                      <Form.Select defaultValue="Choose..." size="sm"  className="form-control-sm w-100">
                          <option>Choose...</option>
                          <option>...</option>
                      </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control size="sm" />
                  </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                  asdasd
              </Button>
          </Form>

      </ContainerSection>
      <div className="container-buttons">
        <Button
          format="link"
          href="/activities"
          type="cancel"
          name="Cancelar"
          className="mx-1"
        />
        <Button name="Guardar" />
      </div>
    </>
  );
};

export default RegisterActivity;
