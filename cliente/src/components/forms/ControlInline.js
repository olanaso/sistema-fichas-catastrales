import React, { useState } from "react";
import { Tooltip , OverlayTrigger,Form,Row,Col } from "react-bootstrap";

const ControlInline = ({children, propsLabel = {tooltip:"asdasd",label:"default", placement: "top",sm:2 ,column:true}, propsInput={type:"text",sm:10,name:"default",required:false}}) => {
        
  return (
    <>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId={`formHorizontal-${propsInput.name}`}
      >
        <Form.Label column {...propsLabel}> 
        
        {propsInput.required ? (
            <span className={"labelrequired"}> * </span>
          ) : (
            ""
          )}

         {propsLabel.label + " "}  
          {propsLabel.tooltip.length !== 0 ? (
            <OverlayTrigger
              key={propsLabel.placement}
              placement={propsLabel.placement}
              overlay={
                <Tooltip id={`tooltip-${propsInput.name}`}>
                  {propsLabel.tooltip}
                </Tooltip>
              }
            >
              <i class="fas fa-info-circle"></i>
            </OverlayTrigger>
          ) : null}

         
        </Form.Label>
        <Col sm={propsInput.sm}>
          <Form.Control {...propsInput} />
        </Col>
        {children}
      </Form.Group>

      
    </>
  );
};

export default ControlInline;


