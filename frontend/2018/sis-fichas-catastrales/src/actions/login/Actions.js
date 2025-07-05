import { initAxiosInterceptors } from "../../config/axios";
const axios = initAxiosInterceptors();

export const buscarPartida = (busqueda) => async (dispatch) => {
  let respuesta;
  respuesta = await axios.get(`/login`);
  dispatch({
    type: "LOGIN",
    payload: respuesta.data,
  });
  
};
