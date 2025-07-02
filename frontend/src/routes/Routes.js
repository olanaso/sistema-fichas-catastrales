import React, { lazy, Suspense, useContext } from "react";
import {Switch, Redirect, BrowserRouter,Route ,useLocation} from "react-router-dom";
import { Paths } from "./paths";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../components/loading/PageLoading";
//Modulos del Aplicativo

const Login = lazy(() => import("../pages/login/Login"));
const Config = lazy(() => import("../pages/configuration/Routes"));
const Events = lazy(() => import("../pages/eventos/Routes"));
const Emergencia = lazy(() => import("../pages/emergencia/Routes"));
const AnalisisGeografico = lazy(() => import("../pages/analisisgeografico/Routes"));
const Contacto = lazy(() => import("../pages/contacto/Routes"));

const Routes = () => {


    const routes = [
        { component: Login, path: Paths.login,  status:"public", exact: false},
        { component: Loading, path: Paths.loading,  status:"public", exact: false},
        { component: Config, path: Paths.config, status:"private", exact: false },
        { component: Emergencia, path: Paths.emergencia, status:"private", exact: false },
        { component: AnalisisGeografico, path: Paths.analisisgeografico, status:"private", exact: false },
        { component: Contacto, path: Paths.contacto, status:"private", exact: false },


        ];

    return (
        <BrowserRouter>
        <Suspense fallback={<Loading/>}>
            <Switch>
                {routes.map(({path, component,status, ...rest}, index) => (
                    (status=="private")?
                        <PrivateRoute  isAuthenticated={true} key={index} path={path} component={component} {...rest} />
                        :      <PublicRoute  key={index} path={path} component={component} {...rest} />


                ))}
                <Redirect from={Paths.base} to={Paths.login} exact />
                <Redirect  to={Paths.config} exact />
            </Switch>

        </Suspense>
        </BrowserRouter>
    );
};

export default Routes;