import React from 'react';
import {Redirect} from "react-router-dom";
import {useAuthenticate} from "../hooks/useAuthenticate";
import { initAxiosInterceptors } from "../config/axios";
const Axios = initAxiosInterceptors();

const checkAuthenticate = async () => {
    try {
        const { data } = await Axios.get(`/checkAuth`, {});
        return data.isAuth;
    } catch (error) {
       return false;
    }
    
  };
  

const CheckAuthenticate = ({children}) => {
    //const [login]=useAuthenticate()
    return (
        <>
            {
                checkAuthenticate() ? {children}: <Redirect to="/login" />
            }
        </>
    );
};

export default CheckAuthenticate;