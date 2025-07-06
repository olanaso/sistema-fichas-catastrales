import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Importar estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Importar Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Importar librerías geoespaciales y exponerlas en window
import * as L from 'leaflet'
import shp from 'shpjs'

// Exposer librerías en el objeto window para que los componentes puedan acceder
window.L = L
window.shp = shp

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
