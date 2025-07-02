import React, {createContext, useReducer, useState} from 'react'
import {countryReducer} from '../reducers/countryReducer'
import {LoginReducer, initialState} from "../reducers/LoginReducer";
import config from '../config'
import {ubigeo} from "../config/data/ubigeo"
export const ConfigContext = createContext();


// Create context provider
const ConfigContextProvider = (props) => {

    //Decarar los reductores a utlizar a lo largo de toda las paginas de la aplicacion
    // Estos se comportan como getter y seftter
    const [loginFormPrincipal, dispatchLoginPrincipal ] = useReducer(LoginReducer);

    //Poner en el contexto de la Aplicacion en el value
    return (
        <ConfigContext.Provider
            value={{
                loginFormPrincipal,
                dispatchLoginPrincipal,
                ubigeo
            }}
        >
            {props.children}
        </ConfigContext.Provider>
    )
}

export default ConfigContextProvider
