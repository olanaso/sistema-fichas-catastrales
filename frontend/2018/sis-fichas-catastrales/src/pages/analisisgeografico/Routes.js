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
const Analisis = lazy(() => import("./mapa/Analisis"));




const EmergenciaRoutes = () => {

    const {url} = useRouteMatch();
    let location = useLocation();

    let background = location.state && location.state.background;

    const routes = [
        //Entidades
        {component: Analisis, path: Paths.analisis_geografico, exact: true},

    ];
    return (
        <>
            <Switch location={background || location}>
                {routes.map(({path, component, ...rest}, index) => (
                    <Route key={index} path={path} component={component} {...rest} />
                ))}
                <Redirect from={Paths.config} to={Paths.config_entidad} exact/>
            </Switch>

        </>
    );
};

export default EmergenciaRoutes;
