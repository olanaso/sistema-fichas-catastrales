import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import BreadCrumb from "../components/BreadCrumb";
import Alerts from "../components/Alerts";
import { ConfigContext } from "../context/ConfigContext";
import CheckAuthenticate from "./CheckAuthenticate";



const FormsWrapper = ({ children, title }) => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  const { isLogin } = useContext(ConfigContext);

  return (
    <>
      {/*<CheckAuthenticate>*/}
        {alertVisible && (
          <Alerts
            alertVisible={alertVisible}
            setAlertVisible={setAlertVisible}
          />
        )}
        <Header
          setMenuVisible={setMenuVisible}
          menuVisible={menuVisible}
          alertVisible={alertVisible}
          setAlertVisible={setAlertVisible}
        />
        <div className="dashboard">
          <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>
          <div style={{ animation: menuVisible ? 'container-in .2s linear forwards' : 'container-out .2s linear forwards' }}>
            <BreadCrumb />
            <div className="container-section">
              <div className="container-header">
                <h4>{title}</h4>
              </div>
              <div className="container2 container-fluid">{children}</div>
            </div>
          </div>
        </div>
      {/*</CheckAuthenticate>*/}
    </>
  );
};

export default FormsWrapper;
