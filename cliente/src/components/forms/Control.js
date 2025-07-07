import React, { useState } from "react";
import { Tooltip , OverlayTrigger,Form } from "react-bootstrap";

const Control = ({propsInput,propsLabel= {placement:"top"} }) => {
  return (
   <>
    <Form.Label>    {propsLabel.label + " "}  
    
 
    { propsLabel.Tooltip.length!==0 ? <OverlayTrigger
      key={propsLabel.placement}
      placement={propsLabel.placement}
      overlay={
        <Tooltip id={`tooltip-${propsInput.name}`}>
        {propsLabel.Tooltip}
        </Tooltip>
      }
    >
       <i class="fas fa-question-circle"></i>
    </OverlayTrigger>: null }
    { propsInput.required ? <span className={"labelrequired"}> * </span>  : "" }
    </Form.Label>
      <Form.Control {...propsInput} />
   </>
  )
}

export default Control;


