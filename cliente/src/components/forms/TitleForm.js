import React, { useState } from "react";
import { Tooltip , OverlayTrigger,Form ,Row} from "react-bootstrap";

const titleForm = ({ children }) => {
  return (
    <>
     <Row className="mb-3">
    <div style={{marginTop:"10px",color:"#002F59"}}> <b>{ children }</b></div>
    </Row>
    </>
  );
};

export default titleForm;