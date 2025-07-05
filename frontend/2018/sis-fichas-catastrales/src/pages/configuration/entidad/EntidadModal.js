import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import { Modal, Button } from "react-bootstrap";

const EntidadModal = (props) => {
  let history = useHistory();
  let { id } = useParams();
 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let back = e => {
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
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading {id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={back}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default EntidadModal;
