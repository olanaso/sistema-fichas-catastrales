import { useState } from "react";
import { initAxiosInterceptors } from "../config/axios";
const Axios = initAxiosInterceptors();

export const useAuthenticate = () => {

    const [login, setLogin] = useState({isAuth:false});
    const checkAuthenticate = async () => {
        try {
            const { data } = await Axios.get(`/checkAuth`, {});
            setLogin(data);
            return data.isAuth;
        } catch (error) {

        }

    };

    return [login, checkAuthenticate];
};