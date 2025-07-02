import { initAxiosInterceptors } from "../../config/axios";
import alasql from "alasql";
const Axios = initAxiosInterceptors();
//#region  -----> Gestion de las entidades

//Permite listar las entidades
export const saveEmergencia = async (query,object) => {
  const { data } = await Axios.get(`/entidad?`+query, object);
  return alasql('SELECT id, nombre FROM ? ',[data]);
};


//Obtiene los tipos de sensor remoto
export const tipoEmergenciaDesastre = [
    { checked:false,  label: 'Inundaciones',name: 'Inundaciones',},
    { checked:false,  label: 'Flujo de lodo y detritos',name: 'Flujo de lodo y detritos', },
    { checked:false,  label: 'Bajas temperatura y/o precipitaciones solidas',name: 'Bajas temperatura y/o precipitaciones solidas',},
    { checked:false,  label: 'Sismos y/o Tsunamis',name: 'Sismos y/o Tsunamis',  },
    { checked:false,  label: 'Actividad volcánica',name: 'Actividad volcánica', },
    { checked:false,  label: 'Incendios forestales',name: 'Incendios forestales',  },
    { checked:false,  label: 'Despizamientos, reptaciones y caídas de roca',name: 'Despizamientos, reptaciones y caídas de roca',  },

]

//Obtiene los tipos de sensor remoto
export const TipoSensorRemoto = [
        {  checked:false,  label: 'Avion',name: 'Avion',  },
        { checked:false,  label: 'Helicoptero',name: 'Helicoptero', },
        { checked:false,  label: 'Satelite',name: 'Satelite', },
        { checked:false,  label: 'RPA',name: 'RPA', },
        { checked:false,  label: 'Otro', name: 'Otro',},

    ]

//Obtiene los ripos de requerimietno de sensores
export const sensorReq = [
        { checked:false,  label: 'Óptico',name: 'Óptico', },
        { checked:false,  label: 'Radar',name: 'Radar',},
        { checked:false,  label: 'Multiespectral',name: 'Multiespectral'},
        { checked:false,  label: 'Lidar',name: 'Lidar'},
        { checked:false,  label: 'Hiperespectral',name: 'Hiperespectral' },
        { checked:false,  label: 'Térmica',name: 'Térmica'},
        {checked:false,  label: 'Otros',  name: 'Otros' },

    ]


//Obtiene los ripos de requerimietno de sensores
export const productosEsperados = [
    { producto:"Ortofotografía",  prioridad: 1,estado: '', },
    { producto:"Video diferido",  prioridad: 1,estado: '', },
    { producto:"Video tiempo real",  prioridad: 1,estado: '', },
    { producto:"DEM (Modelo digital de elevación) ",  prioridad: 1,estado: '', },
    { producto:"DTM (Modelo digital de terreno) ",  prioridad: 1,estado: '', },
    { producto:"Modelamiento de inundación ",  prioridad: 1,estado: '', },
    { producto:"Curvas de nivel ",  prioridad: 1,estado: '', },


]

export const productosEsperadosEspecificos = [
    { producto:"Ubicación general",  prioridad: 1,estado: '', },
    { producto:"Identificación de zona afectada y/o expuesta",  prioridad: 1,estado: '', },
    { producto:"Cuantificación de elementos expuestos afectados y/o expuestos",  prioridad: 1,estado: '', },
    { producto:"Identificación de afectación en base a cambios ",  prioridad: 1,estado: '', },
    { producto:"Otros, espeficificar ",  prioridad: 1,estado: '', },

]