import { initAxiosInterceptors } from "../../config/axios";
import alasql from "alasql";
const Axios = initAxiosInterceptors();
//#region  -----> Gestion de las entidades

//Permite listar las entidades
export const getEntidades = async (query,object) => {
  const { data } = await Axios.get(`/entidad?`+query, object);
  return alasql('SELECT id, nombre FROM ? ',[data]);
};

//Permite listar las entidades
export const getOneEntidades = async (id) => {
  const { data } = await Axios.get(`/one-entidad/`+id);
  return data;
};

//Permite la creacion de las entidades
export const createEntidades = async (object) => {
  const { data } = await Axios.post(`/entidad`, object);
  return data;
};

//Permite la actualizacio de las entidades
export const updateEntidades = async (object) => {
  const { data } = await Axios.put(`/entidad/`+object.id, object);
  return data;
};

//Permite la eliminacion de las entidades
export const deleteEntidades = async (object) => {
  const { data } = await Axios.delete(`/entidad/`+object.id, object);
  return data;
};


//#endregion

//#region-----> Estado Configuracion

//Permite listar los estados de configuracion
export const getEstadoConfiguracion = async (query,object) => {
    const { data } = await Axios.get(`/estadocof?`+query, object);
    return alasql('SELECT id, nombre,descripcion FROM ? ',[data]);
};

//Permite listar los estados de configuracion
export const getOneEstadoConfiguracion = async (id) => {
    const { data } = await Axios.get(`/estadocof/`+id);
    return data;
};

//Permite la creacion de los estados de configuracion
export const createEstadoConfiguracion = async (object) => {
    const { data } = await Axios.post(`/estadocof`, object);
    return data;
};

//Permite la actualizacio de los estados de configuracion
export const updateEstadoConfiguracion = async (object) => {
    const { data } = await Axios.put(`/estadocof/`+object.id, object);
    return data;
};

//Permite la eliminacion de los estados de configuracion
export const deleteEstadoConfiguracion = async (object) => {
    const { data } = await Axios.delete(`/estadocof/`+object.id, object);
    return data;
};


//#endregion

//#region------> Productos

//Permite listar los Productos
export const getProductos = async (query,object) => {
    const { data } = await Axios.get(`/producto?`+query, object);
    return alasql('SELECT id, nombre, descripcion FROM ? ',[data]);
};

//Permite listar los Productos
export const getOneProducto = async (id) => {
    const { data } = await Axios.get(`/producto/`+id);
    return data;
};

//Permite la creacion de los Productos
export const createProducto = async (object) => {
    const { data } = await Axios.post(`/producto`, object);
    return data;
};

//Permite la actualizacio de los Productos
export const updateProducto = async (object) => {
    const { data } = await Axios.put(`/producto/`+object.id, object);
    return data;
};

//Permite la eliminacion de los Productos
export const deleteProducto = async (object) => {
    const { data } = await Axios.delete(`/producto/`+object.id, object);
    return data;
};
//#endregion


//#region-----> Satelite

//Permite listar los satelites
export const getSatelites = async (query,object) => {
    const { data } = await Axios.get(`/satelite?`+query, object);
    return alasql('SELECT id, satelite, noradid  FROM ? ',[data]);

};

//Permite listar los satelites
export const getOneSatelite = async (id) => {
    const { data } = await Axios.get(`/satelite/`+id);
    return data;
};

//Permite la creacion de los satelites
export const createSatelite = async (object) => {
    const { data } = await Axios.post(`/satelite`, object);
    return data;
};

//Permite la actualizacio de los satelites
export const updateSatelite = async (object) => {
    const { data } = await Axios.put(`/satelite/`+object.id, object);
    return data;
};

//Permite la eliminacion de los satelites
export const deleteSatelite = async (object) => {
    const { data } = await Axios.delete(`/satelite/`+object.id, object);
    return data;
};
//#endregion


//#region-----> Sensores

//Permite listar los sensores
export const getSensors = async (query,object) => {
    const { data } = await Axios.get(`/sensor?`+query, object);
    return alasql('SELECT id, nombre FROM ? ',[data]);
};

//Permite listar los sensores
export const getOneSensor = async (id) => {
    const { data } = await Axios.get(`/one-sensor/`+id);
    return data;
};

//Permite la creacion de los sensores
export const createSensor = async (object) => {
    const { data } = await Axios.post(`/sensor`, object);
    return data;
};

//Permite la actualizacio de los sensores
export const updateSensor = async (object) => {
    const { data } = await Axios.put(`/sensor/`+object.id, object);
    return data;
};

//Permite la eliminacion de los sensores
export const deleteSensor = async (object) => {
    const { data } = await Axios.delete(`/sensor/`+object.id, object);
    return data;
};
//#endregion

//#region-----> Sensores Remotos

//Permite listar los sensores remotos
export const getSensorRemotos = async (query,object) => {
    const { data } = await Axios.get(`/sensorremoto?`+query, object);
    return alasql('SELECT id, nombre  FROM ? ',[data]);
};

//Permite listar los sensores remotos
export const getOneSensorRemoto = async (id) => {
    const { data } = await Axios.get(`/sensorremoto/`+id);
    return data;
};

//Permite la creacion de los sensores remotos
export const createSensorRemoto = async (object) => {
    const { data } = await Axios.post(`/sensorremoto`, object);
    return data;
};

//Permite la actualizacio de los sensores remotos
export const updateSensorRemoto = async (object) => {
    const { data } = await Axios.put(`/sensorremoto/`+object.id, object);
    return data;
};

//Permite la eliminacion de los sensores remotos
export const deleteSensorRemoto = async (object) => {
    const { data } = await Axios.delete(`/sensorremoto/`+object.id, object);
    return data;
};
//#endregion


//#region-----> Sensores Tipo Emergencia Indeci

//Permite listar los tipos de emergencia
export const getTipoemergencia = async (query,object) => {
    const { data } = await Axios.get(`/tipoemergencia?`+query, object);
    return alasql('SELECT id, nombre, descripcion FROM ? ',[data]);
};

//Permite listar los tipos de emergencia
export const getOneTipoemergencia = async (id) => {
    const { data } = await Axios.get(`/tipoemergencia/`+id);
    return data;
};

//Permite la creacion de los tipos de emergencia
export const createTipoemergencia = async (object) => {
    const { data } = await Axios.post(`/tipoemergencia`, object);
    return data;
};

//Permite la actualizacio de los tipos de emergencia
export const updateTipoemergencia = async (object) => {
    const { data } = await Axios.put(`/tipoemergencia/`+object.id, object);
    return data;
};

//Permite la eliminacion de los tipos de emergencia
export const deleteTipoemergencia = async (object) => {
    const { data } = await Axios.delete(`/tipoemergencia/`+object.id, object);
    return data;
};
//#endregion

