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
const Calendar = lazy(() => import("./Calendar"));

const CalendarioEventos = () => {
    const {url} = useRouteMatch();
    let location = useLocation();
    let background = location.state && location.state.background;
    const routes = [
        //Calendario
        {component: Calendar, path: Paths.events_calendar, exact: true},
    ];
    return (
        <>
            <Switch location={background || location}>
                {routes.map(({path, component, ...rest}, index) => (
                    <Route key={index} path={path} component={component} {...rest} />
                ))}
            </Switch>
            {background && <Route path={Paths.events_calendar} children={<Calendar/>}/>}

        </>
    );
};

export default CalendarioEventos;
