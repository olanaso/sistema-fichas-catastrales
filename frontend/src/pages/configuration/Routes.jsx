import React, {lazy, Suspense} from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,
    useLocation
} from "react-router-dom";
import {Paths} from "./paths";


//Entidad
const Entidad = lazy(() => import("./entidad/Entidad"));
const ModalEntidadAdd = lazy(() => import("./entidad/ModalEntidadAdd"));
const ModalEntidadEdit = lazy(() => import("./entidad/ModalEntidadEdit"));
const ModalEntidadDel = lazy(() => import("./entidad/ModalEntidadDel"));

//Estado configuracion
const EstadoConfigList = lazy(() => import("./estado-config/Listado"));
const EstadoConfigAdd = lazy(() => import("./estado-config/ModalAdd"));
const EstadoConfigEdit = lazy(() => import("./estado-config/ModalEdit"));
const EstadoConfigDel = lazy(() => import("./estado-config/ModalDel"));

//producto
const ProductoList = lazy(() => import("./producto/Listado"));
const ProductoAdd = lazy(() => import("./producto/ModalAdd"));
const ProductoEdit = lazy(() => import("./producto/ModalEdit"));
const ProductoDel = lazy(() => import("./producto/ModalDel"));

//satelite
const SateliteList = lazy(() => import("./satelite/Listado"));
const SateliteAdd = lazy(() => import("./satelite/ModalAdd"));
const SateliteEdit = lazy(() => import("./satelite/ModalEdit"));
const SateliteDel = lazy(() => import("./satelite/ModalDel"));

//sensor
const SensorList = lazy(() => import("./sensor/Listado"));
const SensorAdd = lazy(() => import("./sensor/ModalAdd"));
const SensorEdit = lazy(() => import("./sensor/ModalEdit"));
const SensorDel = lazy(() => import("./sensor/ModalDel"));

//sensor remoto
const SensorRemotoList = lazy(() => import("./sensor-remoto/Listado"));
const SensorRemotoAdd = lazy(() => import("./sensor-remoto/ModalAdd"));
const SensorRemotoEdit = lazy(() => import("./sensor-remoto/ModalEdit"));
const SensorRemotoDel = lazy(() => import("./sensor-remoto/ModalDel"));

//Tipo emergencia
const TipoEmergenciaList = lazy(() => import("./tipo-emergencia/Listado"));
const TipoEmergenciaAdd = lazy(() => import("./tipo-emergencia/ModalAdd"));
const TipoEmergenciaEdit = lazy(() => import("./tipo-emergencia/ModalEdit"));
const TipoEmergenciaDel = lazy(() => import("./tipo-emergencia/ModalDel"));

//Envenst Calendar
const Calendar = lazy(() => import("../eventos/Calendar"));



const Configuracion = () => {
    const {url} = useRouteMatch();
    let location = useLocation();

    let background = location.state && location.state.background;

    const routes = [
        //Entidades
        {component: Entidad, path: Paths.config_entidad, exact: true},
        {component: ModalEntidadAdd, path: Paths.config_entidad_add, exact: true},
        {component: ModalEntidadEdit, path: Paths.config_entidad_edit, exact: true},
        {component: ModalEntidadDel, path: Paths.config_entidad_delete, exact: true},

        //Estado configuracion
        {component: EstadoConfigList, path: Paths.config_estado_config, exact: true},
        {component: EstadoConfigAdd, path: Paths.config_estado_config_add, exact: true},
        {component: EstadoConfigEdit, path: Paths.config_estado_config_edit, exact: true},
        {component: EstadoConfigDel, path: Paths.config_estado_config_delete, exact: true},

        //Producto
        {component: ProductoList, path: Paths.config_producto, exact: true},
        {component: ProductoAdd, path: Paths.config_producto_add, exact: true},
        {component: ProductoEdit, path: Paths.config_producto_edit, exact: true},
        {component: ProductoDel, path: Paths.config_producto_delete, exact: true},

        //Satelite
        {component: SateliteList, path: Paths.config_satelite, exact: true},
        {component: SateliteAdd, path: Paths.config_satelite_add, exact: true},
        {component: SateliteEdit, path: Paths.config_satelite_edit, exact: true},
        {component: SateliteDel, path: Paths.config_satelite_delete, exact: true},

        //Sensor
        {component: SensorList, path: Paths.config_sensor, exact: true},
        {component: SensorAdd, path: Paths.config_sensor_add, exact: true},
        {component: SensorEdit, path: Paths.config_sensor_edit, exact: true},
        {component: SensorDel, path: Paths.config_sensor_delete, exact: true},


        //Sensor Remoto
        {component: SensorRemotoList, path: Paths.config_sensor_remoto, exact: true},
        {component: SensorRemotoAdd, path: Paths.config_sensor_remoto_add, exact: true},
        {component: SensorRemotoEdit, path: Paths.config_sensor_remoto_edit, exact: true},
        {component: SensorRemotoDel, path: Paths.config_sensor_remoto_delete, exact: true},

        //Tipo Emergencia
        {component: TipoEmergenciaList, path: Paths.config_tipo_emergencia, exact: true},
        {component: TipoEmergenciaAdd, path: Paths.config_tipo_emergencia_add, exact: true},
        {component: TipoEmergenciaEdit, path: Paths.config_tipo_emergencia_edit, exact: true},
        {component: TipoEmergenciaDel, path: Paths.config_tipo_emergencia_delete, exact: true},
        //Calendar
        {component: Calendar, path: Paths.config_calendar, exact: true},

        {
            render: () => <Entidad/>,
            path: Paths.config_entidad,
            exact: false
        }
    ];
    return (
        <>
            <Switch location={background || location}>
                {routes.map(({path, component, ...rest}, index) => (
                    <Route key={index} path={path} component={component} {...rest} />
                ))}
                <Redirect from={Paths.config} to={Paths.config_entidad} exact/>
            </Switch>

            {background && <Route path={Paths.config_entidad_add} children={<ModalEntidadAdd/>}/>}
            {background && <Route path={Paths.config_entidad_edit} children={<ModalEntidadEdit/>}/>}
            {background && <Route path={Paths.config_entidad_delete} children={<ModalEntidadDel/>}/>}

            {/*Estado de congiguracion*/}
            {background && <Route path={Paths.config_estado_config_add} children={<EstadoConfigAdd/>}/>}
            {background && <Route path={Paths.config_estado_config_edit} children={<EstadoConfigEdit/>}/>}
            {background && <Route path={Paths.config_estado_config_delete} children={<EstadoConfigDel/>}/>}

            {/*Producto*/}
            {background && <Route path={Paths.config_producto_add} children={<ProductoAdd/>}/>}
            {background && <Route path={Paths.config_producto_edit} children={<ProductoEdit/>}/>}
            {background && <Route path={Paths.config_producto_delete} children={<ProductoDel/>}/>}

            {/*Satelite*/}
            {background && <Route path={Paths.config_satelite_add} children={<SateliteAdd/>}/>}
            {background && <Route path={Paths.config_satelite_edit} children={<SateliteEdit/>}/>}
            {background && <Route path={Paths.config_satelite_delete} children={<SateliteDel/>}/>}

            {/*Sensor*/}
            {background && <Route path={Paths.config_sensor_add} children={<SensorAdd/>}/>}
            {background && <Route path={Paths.config_sensor_edit} children={<SensorEdit/>}/>}
            {background && <Route path={Paths.config_sensor_delete} children={<SensorDel/>}/>}

            {/*Sensor Remoto*/}
            {background && <Route path={Paths.config_sensor_remoto_add} children={<SensorRemotoAdd/>}/>}
            {background && <Route path={Paths.config_sensor_remoto_edit} children={<SensorRemotoEdit/>}/>}
            {background && <Route path={Paths.config_sensor_remoto_delete} children={<SensorRemotoDel/>}/>}

            {/*Tipo emergencia*/}
            {background && <Route path={Paths.config_tipo_emergencia_add} children={<TipoEmergenciaAdd/>}/>}
            {background && <Route path={Paths.config_tipo_emergencia_edit} children={<TipoEmergenciaEdit/>}/>}
            {background && <Route path={Paths.config_tipo_emergencia_delete} children={<TipoEmergenciaDel/>}/>}

            {background && <Route path={Paths.config_calendar} children={<Calendar/>}/>}
        </>
    );
};

export default Configuracion;
