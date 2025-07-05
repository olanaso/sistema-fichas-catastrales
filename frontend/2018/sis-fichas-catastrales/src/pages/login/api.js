import { initAxiosInterceptors } from "../../config/axios";
const Axios = initAxiosInterceptors();

/*Permite realizar el login a un usuario*/
export const loginUser = async (user) => {
  const { data } = await Axios.post(`/login`, user);
  return data;
};

/*Permite realizar el login a un usuario*/
export const loginUserDemo = async (user) => {
  return { ...user, rol: "Administrador" };
};
