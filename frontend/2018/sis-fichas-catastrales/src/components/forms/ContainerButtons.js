import React, { useState } from "react";
import { Tooltip, OverlayTrigger, Form, Row , Button} from "react-bootstrap";

const ContainerButtons = ({ children }) => {
  return (
    <>
      <footer class="footerproce" >
        <div className="container-buttons">
       {children}
      </div>
       
      </footer>
    </>
  );
};

export default ContainerButtons;
