import React,{useState} from 'react';
import Login from "../../pages/login/Login"

const SegureComponent = ({children}) => {

const [authenticated, setAuthenticated]=useState();

    return (
       {
        authenticated ? <Login/> {children} : 
          }
      
          return <p>Initializing...</p>;
       }
    );
};

export default SegureComponent;