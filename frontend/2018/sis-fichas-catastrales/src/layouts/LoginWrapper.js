import React from "react";

import Logo from '../assets/images/logo.svg';
import Subtract from '../assets/images/Subtract.png';

const LoginWrapper = ({ children }) => {
  return (
    <div className='login'>
      <div className='login-side'>
        <img src={ Logo } alt="Logo CONIDA" className="login-side-logo" />
        <h2>Institución adscrita al Ministerio de Defensa del Perú, encargada de desarrollar ciencia y tecnología espacial en el país.</h2>
        <img src={ Subtract } alt="Subtract" className="login-side-subtract" />
      </div>
      <div className='login-form'>
        {
          children
        }
      </div>
    </div>
  )
}

export default LoginWrapper;