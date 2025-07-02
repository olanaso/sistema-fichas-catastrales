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
const ListadoEmergencia = lazy(() => import("./emergencia/ListadoEmergencias"));
const Emergencia = lazy(() => import("./emergencia/Emergencia"));
const ProgramacionEmergencia = lazy(() => import("./programacion/GeographicAnalysis"));
const EnvioEmergencia = lazy(() => import("../emergencia/envio/EnvioEmergencia"));
const SeguimientoEmergencia = lazy(() => import("../emergencia/seguimiento/SeguimientoEmergencia"));
const EmergenciaEdit = lazy(() => import("../emergencia/emergencia/EmergenciaEdit"));
const EmergenciaDel = lazy(() => import("../emergencia/emergencia/EmergenciaDel"));



const EmergenciaRoutes = () => {

    const {url} = useRouteMatch();
    let location = useLocation();

    let background = location.state && location.state.background;

    const routes = [
        //Entidades
        {component: Emergencia, path: Paths.emergencia_add, exact: true},
        {component: ListadoEmergencia, path: Paths.emergencia_listar, exact: true},
        {component: ProgramacionEmergencia, path: Paths.emergencia_programacion, exact: true},
        {component: EnvioEmergencia, path: Paths.emergencia_envio, exact: true},
        {component: SeguimientoEmergencia, path: Paths.emergencia_seguimiento, exact: true},
        {component: EmergenciaEdit, path: Paths.emergencia_edit, exact: true},
        {component: EmergenciaDel, path: Paths.emergencia_delete, exact: true},

    ];
    return (
        <>
            <Switch location={background || location}>
                {routes.map(({path, component, ...rest}, index) => (
                    <Route key={index} path={path} component={component} {...rest} />
                ))}
                <Redirect from={Paths.config} to={Paths.emergencia_listar} exact/>
            </Switch>

        </>
    );
};

export default EmergenciaRoutes;
