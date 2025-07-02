import { initAxiosInterceptors } from "../../config/axios";
import alasql from "alasql";
const Axios = initAxiosInterceptors();
//#region  -----> Gestion de los Direcciones

//Permite listar las direcciones de la entidad
export const getDirecciones = async (query,object) => {
  const { data } = await Axios.get(`/direccion?`+query, object);
  return alasql('SELECT id, nombre, Entidad->nombre as entidad FROM ? ',[data]);
};

export const getDireccionesCombo = async (id) => {
  const { data } = await Axios.get(`/direccion/load/`+id);
  return data;
};

//Permite listar las direcciones de la entidad
export const getOneDirecciones = async (id) => {
  const { data } = await Axios.get(`/direccion/`+id);
  return data;
};

//Permite la creacion de las direcciones de la entidad
export const createDireccion = async (object) => {
  const { data } = await Axios.post(`/direccion`, object);
  return data;
};

//Permite la actualizacion de las direcciones de la entidad
export const updateDireccion = async (object) => {
  const { data } = await Axios.put(`/direccion/`+object.id, object);
  return data;
};

//Permite la eliminacion de las direcciones de la entidad
export const deleteDireccion = async (object) => {
  const { data } = await Axios.delete(`/direccion/`+object.id, object);
  return data;
};

//#endregion

//#region  -----> Gestion de los Contactos

//Permite listar los contactos
export const getContactos = async (query,object) => {
    const { data } = await Axios.get(`/contacto?`+query, object);
    return alasql('SELECT id,nombres,apellidos,cargo,telefono,correo,Direccion->nombre as direccion,Direccion->Entidad->nombre as entidad FROM ? ',[data]);
};

//Permite listar los contactos
export const getOneContacto = async (id) => {
    const { data } = await Axios.get(`/contacto/`+id);
    return data;
};

//Permite la creacion de los contactos
export const createContacto = async (object) => {
    const { data } = await Axios.post(`/contacto`, object);
    return data;
};

//Permite la actualizacion de los contactos
export const updateContacto = async (object) => {
    const { data } = await Axios.put(`/contacto/`+object.id, object);
    return data;
};

//Permite la eliminacion de los contactos
export const deleteContacto = async (object) => {
    const { data } = await Axios.delete(`/contacto/`+object.id, object);
    return data;
};

//#endregion


