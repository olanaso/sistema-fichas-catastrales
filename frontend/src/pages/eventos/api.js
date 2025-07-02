import { initAxiosInterceptors } from "../../config/axios";
import alasql from "alasql";
const Axios = initAxiosInterceptors();
//#region  -----> Gestion de las entidades

//Rol del mes
export const getRolMes = async (query) => {
  const { data } = await Axios.get(`/rol/mes?`+query);
  return data;
};

export const getTipoSensorRemoto = async () => {
  const data=  [
      { name: 'Avion', population: 4780127, capital: 'Montgomery', region: 'South' },
      { name: 'Helicoptero', population: 710249, capital: 'Juneau', region: 'West' },
      { name: 'Satelite', population: 710249, capital: 'Juneau', region: 'West' },
      { name: 'RPA', population: 710249, capital: 'Juneau', region: 'West' },
      { name: 'Otro', population: 710249, capital: 'Juneau', region: 'West' },

  ]
  return data;
};

export const getSensorReq = async () => {
    const data=  [
        { name: 'Óptico', population: 4780127, capital: 'Montgomery', region: 'South' },
        { name: 'Radar', population: 710249, capital: 'Juneau', region: 'West' },
        { name: 'Multiespectral', population: 710249, capital: 'Juneau', region: 'West' },
        { name: 'Lidar', population: 710249, capital: 'Juneau', region: 'West' },
        { name: 'Hiperespectral', population: 710249, capital: 'Juneau', region: 'West' },
        { name: 'Térmica', population: 710249, capital: 'Juneau', region: 'West' },
        { name: 'Otros', population: 710249, capital: 'Juneau', region: 'West' },

    ]
    return data;
};


