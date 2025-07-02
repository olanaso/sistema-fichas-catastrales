import React from "react";
import {Form} from "react-bootstrap";
import ButtonAria from "../components/ButtonAria";

const Login = () => {
  return (
    <>
        <form action="#" className="form">
            <h4>{'Iniciar Sesión' }</h4>
            <Form.Label>Usuario</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Ingrese el usuario" />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control size="sm" type="password" placeholder="Ingrese la contraseña" />
            <Form.Label> </Form.Label>
            <ButtonAria type={"submit"} onClick={()=>{alert(1)}} >Ingresar </ButtonAria>

        </form>
      <p className="login-footer">
        <span>&copy; 2021 Agencia Espacial del Perú - CONIDA | </span>
        <a href="https://www.gob.pe/conida">www.gob.pe/conida</a>
      </p>
    </>
  )
}

export default Login;