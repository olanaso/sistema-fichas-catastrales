import React from "react";
import { Form} from "react-bootstrap"
import ButtonAria from "./ButtonAria";


const FormLogin = ({ login = true }) => {
  return (
    <form action="#" className="form">
      <h4>{login ? 'Iniciar Sesión' : 'Registrate'}</h4>
        <Form.Label>Usuario</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Ingrese el usuario" />
        <Form.Label>Contraseña</Form.Label>
        <Form.Control size="sm" type="password" placeholder="Ingrese la contraseña" />
        <Form.Label> </Form.Label>
        <ButtonAria type={"submit"} onClick={()=>{alert(1)}} >Ingresar </ButtonAria>

    </form>
  )
}

export default FormLogin;