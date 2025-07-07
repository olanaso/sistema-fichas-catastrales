import React, {useContext} from "react";
import Logo from '../assets/images/logo-2.svg';
import {Link, useLocation} from "react-router-dom";
import {ConfigContext} from "../context/ConfigContext";

const Header = ({setMenuVisible, menuVisible, alertVisible, setAlertVisible}) => {
    let location = useLocation();
   // alert(formatPath(Paths.calendar, {id:1}))

     // Get values from context
    const {
        loginFormPrincipal
    } = useContext(ConfigContext)
    


    console.log(loginFormPrincipal)
    return (
        <div className="header">
            <img className="header-logo" src={Logo} alt="Logo CONIDA"/>
            <div className="header__menu">
                <i onClick={() => setAlertVisible(!alertVisible)} className="fa fa-bell header-user__bell"/>
                <i onClick={() => setMenuVisible(!menuVisible)} className="fa fa-bars fa-2x"/>
            </div>
            <div className="header-user">


                <Link
                    to={{
                        pathname: "/config/events/calendar",
                        state: { background: location }
                    }}
                >
               Eventos
                </Link>

                <i onClick={() => setAlertVisible(!alertVisible)} className="fa fa-bell header-user__bell"/>
                <span>Luis Meza Espinoza</span>
                <div>
                    <a href="#" className="text-decoration-none dropdown-toggle" id="dropdownUser"
                       data-bs-toggle="dropdown">
                        <i className="fa fa-user fa-2x"/>
                    </a>
                    <ul className="dropdown-menu shadow" aria-labelledby="dropdownUser">
                        <li><Link className="dropdown-item" to="/settings/entidad">Configuración </Link></li>
                        <li><Link className="dropdown-item" to="/users">Cuenta</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="/login">Salir</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;