import React, { useState } from "react";
import { Row, Col, Form, Alert, Spinner,Button } from "react-bootstrap";

import InputGroup from "../components/InputGroup";
import { Control, ControlInline, TitleForm,ContainerButtons } from "../components/forms";
import ButtonAria from "../components/ButtonAria";
import Select from "../components/Select";
import ContainerSection from "../components/contents/ContainerSection";
import FormsWrapper from "../layouts/FormsWrapper";
import InputFile from "../components/InputFile";

import { Toast } from "react-bootstrap";

const RegisterEmergency = () => {
 

  return (
    <>
      <FormsWrapper title="Registro de Actividad">
        <Form className="form2">
         
          <TitleForm>Denominación de la Solicitud</TitleForm>
          <Row className="mb-3">
            <Col sm={6}>
              <ControlInline
                propsLabel={{ sm:3, tooltip: "Codigo de registro del Sistema SIMPAD", label: "Codigo SIMPAD" }}
                propsInput={{ sm:9, placeholder: "Ingrese el codigo SIMPAD",size: "sm", required: true , name:"asd"}}
              />
            </Col>
            <Col sm={6}>
            <ControlInline
                propsLabel={{ sm:3, tooltip: "Titulo", label: "Titulo" }}
                propsInput={{ sm:9, placeholder: "Titulo de la emergencia",size: "sm", required: true }}
              />
            </Col>
          </Row>

          <TitleForm>Ubicación</TitleForm>
          <Row className="mb-3">
            <Col sm={6}>
              <ControlInline
                propsLabel={{ sm:3, tooltip: "Codigo de registro del Sistema SIMPAD", label: "Codigo SIMPAD" }}
                propsInput={{ sm:9, placeholder: "Ingrese el codigo SIMPAD",size: "sm", required: true , name:"asd"}}
              />
            </Col>
            <Col sm={6}>
            <ControlInline
                propsLabel={{ sm:3, tooltip: "Titulo", label: "Titulo" }}
                propsInput={{ sm:9, placeholder: "Titulo de la emergencia",size: "sm", required: true }}
              />
            </Col>
          </Row>


          <ContainerButtons>
            <Button variant="primary" type="submit">Guardar</Button>{' '}
            <Button variant="secondary">Cancelar</Button>{' '}
          </ContainerButtons>

         </Form>

      </FormsWrapper>
    </>
  );
};

export default RegisterEmergency;
