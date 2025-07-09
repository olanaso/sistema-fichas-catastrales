import React, { useReducer, useState, useContext } from "react";
import { setToken } from "../../config/axios";
import { Form, Alert, Spinner } from "react-bootstrap";
import LoginWrapper from "../../layouts/LoginWrapper";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import ButtonAria from "../../components/ButtonAria";
import { LoginReducer } from "../../reducers/LoginReducer";
import { loginUser } from "./api";
import { ConfigContext } from "../../context/ConfigContext";
import { types } from '../../type/types';

const Login = ({ }) => {

    // Get values from context
    const {
        dispatchLoginPrincipal
    } = useContext(ConfigContext)

    let history = useHistory();

    // Get values from context
    const [loginForm, dispatchLogin] = useReducer(LoginReducer, { error: '', loading: false, authentication: false });
    const [user, setUser, handleInputChange, reset] = useForm({}, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            dispatchLogin({ type: 'OnRequest', payload: {} })

            const lastPath = localStorage.getItem('lastPath') || '/';
            let resp = await loginUser(user);
            console.log(resp)
            /*Indica que el sistema esta logueado*/
            debugger
            dispatchLoginPrincipal({
                type: "OnSuccess",
                payload: resp
            });


            setToken(resp.token)

            history.replace("/config");


        } catch (err) {
            dispatchLogin({ type: 'OnFailure', payload: err.response.data })
        }
        finally {
            dispatchLogin({ type: 'Finally', payload: false })
        }
    }

    const HandleClose = () => {

        dispatchLogin({ type: 'OnSuccess', payload: {} })
    }
    return (
        <>
            <LoginWrapper>
                <Form className="form" onSubmit={handleSubmit}>
                    <h4>{'Iniciar Sesión'}</h4>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Ingrese el usuario" required value={user.email}
                        name={"email"} onChange={handleInputChange} />
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control size="sm" type="password" placeholder="Ingrese la contraseña" required
                        value={user.password} name={"password"} onChange={handleInputChange} />
                    <Form.Label> </Form.Label>
                    <ButtonAria type={"submit"} disabled={loginForm.loading}>{loginForm.loading ?
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        : ' Ingresar'}</ButtonAria>
                    <Form.Label> </Form.Label>
                    {
                        loginForm.error.length === 0 ? null : <Alert variant="danger" dismissible onClose={HandleClose}>
                            {loginForm.error}
                        </Alert>
                    }

                </Form>
                <p className="login-footer">
                    <span>&copy; 2021 Agencia Espacial del Perú - CONIDA | </span>
                    <a href="https://www.gob.pe/conida">www.gob.pe/conida</a>
                </p>
            </LoginWrapper>
        </>
    )
}

export default Login;