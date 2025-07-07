import React from 'react'

function About() {
    return (
        <div className="container">
            <h1>Acerca del Sistema</h1>
            <div className="row">
                <div className="col-md-8">
                    <p>
                        El Sistema de Fichas Catastrales es una aplicación web desarrollada para la gestión
                        y consulta de información catastral de manera eficiente y moderna.
                    </p>
                    <h3>Características principales:</h3>
                    <ul>
                        <li>✅ Gestión de fichas catastrales</li>
                        <li>✅ Visualización de mapas interactivos</li>
                        <li>✅ Carga de archivos geoespaciales (SHP, KML, GPX)</li>
                        <li>✅ Interfaz responsive y moderna</li>
                        <li>✅ Integración con sistemas GIS</li>
                    </ul>
                    <h3>Tecnologías utilizadas:</h3>
                    <ul>
                        <li>React 19 + Vite</li>
                        <li>React Router DOM</li>
                        <li>Bootstrap 5</li>
                        <li>Leaflet para mapas</li>
                        <li>Librerías geoespaciales (shpjs, togeojson)</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Información del Sistema</h5>
                            <p className="card-text">
                                <strong>Versión:</strong> 1.0.0<br />
                                <strong>Desarrollado por:</strong> Equipo de Desarrollo<br />
                                <strong>Fecha:</strong> 2024
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About 