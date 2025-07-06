import React, {useState} from "react";
import {NavLink, Link} from "react-router-dom";
import {Paths} from "../routes/paths";

const Menu = ({menuVisible, setMenuVisible}) => {
    const [submenu, setSubmenu] = useState(true);


    return (<>
            <ul className="menu"
                style={{animation: menuVisible ? 'smenu-in .2s linear forwards' : 'smenu-out .2s linear forwards'}}>
                <li className="menu-section">
                    <a className="menu-section__item menu-section__item--activ" to="/dashboard">
                <span onClick={() => setMenuVisible(!menuVisible)}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2H0V0H12V2ZM12 6H0V4H12V6ZM0 10H12V8H0V10Z"
                          fill="black"/>
                </svg>
                </span>
                    </a>
                </li>

                {menuVisible ?
                    <>
                        <li className="menu-section">
                            <NavLink className="menu-section__item menu-section__item--activ" to="/dashboard">
                                <span><i className="fa fa-tachometer-alt"/> Dashboard</span>
                            </NavLink>
                        </li>
                        <h6 className="menu-section__title">Emergencias</h6>
                        <li className="menu-section">
                            <NavLink className="menu-section__item" to={Paths.emergencia}>
                                <span><i className="fa fa-bell"/> Emergencia</span>
                            </NavLink>
                        </li>


                        <h6 className="menu-section__title">Configuración</h6>
                        <li className="menu-section">
                            <NavLink className="menu-section__item" to={Paths.config}>
                                <span><i className="fa fa-cog"/> Configuración</span>
                            </NavLink>
                        </li>
                        <li className="menu-section">
                            <NavLink className="menu-section__item" to={Paths.contacto}>
                                <span><i className="fa fa-user" aria-hidden="true"></i> Contactos</span>
                            </NavLink>
                        </li>
                        <h6 className="menu-section__title">Gestión de ususarios</h6>
                        <li className="menu-section">
                            <NavLink className="menu-section__item" to="/users">
                                <span><i className="fa fa-users" aria-hidden="true"></i> Usuarios</span>
                            </NavLink>
                        </li>
                    </>
                    :
                    <>

                        <li className="menu-section">
                            <div className="btn-group dropend">
                                <NavLink className="menu-section__item" to={Paths.dashboard}>
                                    <button type="button" className="btn " data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                    <span><i className="fa fa-tachometer-alt"/> <br></br><span
                                        style={{fontSize: '11px'}}>&nbsp;&nbsp;Dashboard</span></span>
                                    </button>
                                </NavLink>

                            </div>
                        </li>

                        <li className="menu-section">
                            <div className="btn-group dropend">
                                <NavLink className="menu-section__item" to={Paths.emergencia}>
                                    <button type="button" className="btn center-parent" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <div className="center-child">
                                       <span><i className="fa fa-bell"/> <br></br><span
                                           style={{fontSize: '11px'}}>&nbsp;Emergencia</span></span>
                                        </div>

                                    </button>
                                </NavLink>

                            </div>
                        </li>
                        <li className="menu-section">
                            <div className="btn-group dropend">
                                <NavLink className="menu-section__item" to={Paths.config}>
                                    <button type="button" className="btn " data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                    <span><i className="fa fa-cog"/> <br></br>
                                        <span style={{fontSize: '11px'}}>Configuración</span></span>
                                    </button>
                                </NavLink>

                            </div>
                        </li>

                        <li className="menu-section">
                            <div className="btn-group dropend">
                                <NavLink className="menu-section__item" to={Paths.contacto}>
                                    <button type="button" className="btn " data-bs-toggle="dropdown"
                                            aria-expanded="false">

                                        <span><i className="fa fa-user" aria-hidden="true"></i> <br></br></span>
                                        <span style={{fontSize: '11px'}}>&nbsp;&nbsp;Contactos&nbsp;&nbsp;</span>
                                    </button>
                                </NavLink>

                            </div>
                        </li>

                        <li className="menu-section">
                            <div className="btn-group dropend">
                                <NavLink className="menu-section__item" to={Paths.usuarios}>
                                    <button type="button" className="btn " data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                    <span><i className="fa fa-users" aria-hidden="true"></i> <br></br><span
                                        style={{fontSize: '11px'}}>&nbsp;&nbsp;&nbsp;Usuarios&nbsp;&nbsp;</span></span>
                                    </button>
                                </NavLink>

                            </div>
                        </li>


                    </>
                }


            </ul>
        </>
    )
}

export default Menu;