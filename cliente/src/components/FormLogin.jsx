import React from "react";
import { Form, Button } from "react-bootstrap"


const FormLogin = ({ login = true }) => {
  return (
    <form action="#" className="form">
      <h4>{login ? 'Iniciar Sesión' : 'Registrate'}</h4>
      <Form.Label>Usuario</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Ingrese el usuario" />
      <Form.Label>Contraseña</Form.Label>
      <Form.Control size="sm" type="password" placeholder="Ingrese la contraseña" />
      <Form.Label> </Form.Label>
      <Button variant="primary" type="submit" onClick={() => { alert(1) }}>Ingresar</Button>

    </form>
  )
}

export default FormLogin;