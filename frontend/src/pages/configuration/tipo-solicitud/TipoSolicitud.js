import React, { useState } from "react";
import Tabs from "../Tabs";
import { Row, Col, Form, Alert, Spinner, Button, Nav } from "react-bootstrap";
import {
  Control,
  ControlInline,
  TitleForm,
  ContainerButtons
} from "../../../components/forms";
import FormsWrapper from "../../../layouts/FormsWrapper";

const TipoSolicitud = () => {
  return (
    <>
      <FormsWrapper title="Tipo de Solicitud">
        <Tabs />
        <Form className="form2">
          <TitleForm>Tipo solicitudss</TitleForm>
        </Form>
      </FormsWrapper>
    </>
  );
};

export default TipoSolicitud;
