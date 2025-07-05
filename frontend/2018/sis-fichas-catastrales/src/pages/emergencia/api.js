import {initAxiosInterceptors} from "../../config/axios";
import alasql from "alasql";
import {ubigeo} from "./data/ubigeo"

const Axios = initAxiosInterceptors();
//#region  -----> Programacion
export const getSatelitesCombo = async () => {
    const { data } = await Axios.get(`/satelite`);
    return data;
  };

//Permite listar las direcciones de la entidad
export const getOneSatelite = async (id) => {
    const { data } = await Axios.get(`/satelite/`+id);
    return data;
};

export const getPrediccion10dias = async (said) => {
    const { data } = await Axios.get(`/programacion/prediccion10dias/`+said);
    return data;
};

//endregion

//#region  -----> Gestion de las entidades


//Permite listar departamentos
export const listarDepartamento = async () => {
    let data = await alasql('SELECT distinct nombdep id, nombdep denominacion FROM ? ', [ubigeo]);
    console.log(data)
    return data
};


//Permite listar provincias
export const listarprovincia = async (departamento) => {
    return alasql(`SELECT distinct nombprov id, nombprov denominacion FROM ? where upper(nombdep) like "%${departamento.toUpperCase()}"`, [ubigeo]);
};


//Permite listar distritos
export const listardistrito = async (provincia) => {
    return alasql(`SELECT distinct concat(nombdist,'|', iddist) id, nombdist denominacion FROM ? where upper(nombprov) LIKE "%${provincia.toUpperCase()}"`, [ubigeo]);
};


//Listar los contactos de sistema
//Permite listar los contactos
export const getContactos = async (query, object) => {
    const {data} = await Axios.get(`/contacto?` + query, object);
    return alasql('SELECT id,concat(nombres," ",apellidos) denominacion,cargo,telefono,correo,Direccion->nombre as direccion,Direccion->Entidad->nombre as entidad FROM ? ', [data]);
};


//Permite listar las entidades
export const saveEmergencia = async (query, object) => {
    const {data} = await Axios.get(`/entidad?` + query, object);
    return alasql('SELECT id, nombre FROM ? ', [data]);
};


//Obtiene los tipos de sensor remoto
export const tipoEmergenciaDesastre = [
    {label: 'Inundaciones', value: '1',},
    {label: 'Flujo de lodo y detritos', value: '2',},
    {

        label: 'Bajas temperatura y/o precipitaciones solidas',
        name: '3',
    },
    {label: 'Sismos y/o Tsunamis', value: '4',},
    {label: 'Actividad volcánica', value: '5',},
    {label: 'Incendios forestales', value: '6',},
    {

        label: 'Despizamientos, reptaciones y caídas de roca',
        value: '7',
    },

]

//Obtiene los tipos de sensor remoto
export const TipoSensorRemoto = [
    {label: 'Avion', value: '1',},
    {label: 'Helicoptero', value: '2',},
    {label: 'Satelite', value: '3',},
    {label: 'RPA', value: '4',},
    {label: 'Otro', value: '5',},

]

//Obtiene los ripos de requerimietno de sensores
export const sensorReq = [
    {id:1,label: 'Óptico', name: 'Óptico'},
    {id:2, label: 'Radar', name: 'Radar'},
    {id:3, label: 'Multiespectral', name: 'Multiespectral'},
    {id:4, label: 'Lidar', name: 'Lidar'},
    {id:5,label: 'Hiperespectral', name: 'Hiperespectral'},
    {id:6, label: 'Térmica', name: 'Térmica'},
    {id:7, label: 'Otros', name: 'Otros'},

]


//Obtiene los ripos de requerimietno de sensores
export const productosEsperados = [
    {producto: "Ortofotografía", prioridad: 1, estado: '',},
    {producto: "Video diferido", prioridad: 1, estado: '',},
    {producto: "Video tiempo real", prioridad: 1, estado: '',},
    {producto: "DEM (Modelo digital de elevación) ", prioridad: 1, estado: '',},
    {producto: "DTM (Modelo digital de terreno) ", prioridad: 1, estado: '',},
    {producto: "Modelamiento de inundación ", prioridad: 1, estado: '',},
    {producto: "Curvas de nivel ", prioridad: 1, estado: '',},


]

export const productosEsperadosEspecificos = [
    {producto: "Ubicación general", prioridad: 1, estado: '',},
    {producto: "Identificación de zona afectada y/o expuesta", prioridad: 1, estado: '',},
    {producto: "Cuantificación de elementos expuestos afectados y/o expuestos", prioridad: 1, estado: '',},
    {producto: "Identificación de afectación en base a cambios ", prioridad: 1, estado: '',},
    {producto: "Otros, espeficificar ", prioridad: 1, estado: '',},

]


//region listado de emergencias
export const ListEmergencias = async (query, object) => {
    //const {data} = await Axios.get(`/emergencias?` + query, object);
    //return alasql('SELECT id, nombre FROM ? ', [data]);
    let data = [
        {
            sinpad: "235656",
            titulo: "Delizamiento en el distrito de totora departamento de moquegua",
            tipoemergencia: "Climatologica",
            tiposolicitud: "Temporal"
        },
        {
            sinpad: "235657",
            titulo: "Huayco en el distrito de totora departamento de moquegua",
            tipoemergencia: "Climatologica",
            tiposolicitud: "Temporal"
        }
    ]
    return data;
};


//Verificar los EPSG de un shape file

async function getEPGRS(fileInput) {
    var myfile = fileInput.files[0];
    var formData = new FormData();
    formData.append("myfile", myfile);
    formData.append("filename", myfile.name);
    var contenttype = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };
    const {data} = await Axios.post("/detectarEPGSShape", formData, contenttype);
    return data

}

//endregion
