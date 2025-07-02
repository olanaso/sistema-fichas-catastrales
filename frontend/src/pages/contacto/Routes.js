import React, {lazy, Suspense} from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,
    useLocation
} from "react-router-dom";
import {Paths} from "./paths";



//Contacto
const Contacto = lazy(() => import("./contacto/Listado"));
const ModalContactoAdd = lazy(() => import("./contacto/ModalAdd"));
const ModalContactoEdit = lazy(() => import("./contacto/ModalEdit"));
const ModalContactoDel = lazy(() => import("./contacto/ModalDel"));

//Direccion
const Direccion = lazy(() => import("./direccion/Listado"));
const ModalDireccionAdd = lazy(() => import("./direccion/ModalAdd"));
const ModalDireccionEdit = lazy(() => import("./direccion/ModalEdit"));
const ModalDireccionDel = lazy(() => import("./direccion/ModalDel"));



const Configuracion = () => {

    const {url} = useRouteMatch();
    let location = useLocation();
    let background = location.state && location.state.background;

    const routes = [
        //Contactos
        {component: Contacto, path: Paths.contacto_contacto, exact: true},
        {component: ModalContactoAdd, path: Paths.contacto_contacto_add, exact: true},
        {component: ModalContactoEdit, path: Paths.contacto_contacto_edit, exact: true},
        {component: ModalContactoDel, path: Paths.contacto_contacto_delete, exact: true},
        //Direcciones
        {component: Direccion, path: Paths.contacto_direccion, exact: true},
        {component: ModalDireccionAdd, path: Paths.contacto_direccion_add, exact: true},
        {component: ModalDireccionEdit, path: Paths.contacto_direccion_edit, exact: true},
        {component: ModalDireccionDel, path: Paths.contacto_direccion_delete, exact: true},

        {
            render: () => <Contacto/>,
            path: Paths.contacto_contacto,
            exact: false
        }

    ];
    return (
        <>
            <Switch location={background || location}>
                {routes.map(({path, component, ...rest}, index) => (
                    <Route key={index} path={path} component={component} {...rest} />
                ))}
                <Redirect from={Paths.contacto} to={Paths.contacto_contacto} exact/>
            </Switch>
            {background && <Route path={Paths.contacto_contacto_add} children={<ModalContactoAdd/>}/>}
            {background && <Route path={Paths.contacto_contacto_edit} children={<ModalContactoEdit/>}/>}
            {background && <Route path={Paths.contacto_contacto_delete} children={<ModalContactoDel/>}/>}
            {background && <Route path={Paths.contacto_direccion_add} children={<ModalDireccionAdd/>}/>}
            {background && <Route path={Paths.contacto_direccion_edit} children={<ModalDireccionEdit/>}/>}
            {background && <Route path={Paths.contacto_direccion_delete} children={<ModalDireccionDel/>}/>}
        </>
    );
};

export default Configuracion;
