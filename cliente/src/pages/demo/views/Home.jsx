import React from 'react'

function Home() {
    return (
        <div className="container">
            <h1>Sistema Catastral - Inicio</h1>
            <p>Bienvenido al sistema de fichas catastrales</p>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Fichas Catastrales</h5>
                            <p className="card-text">Gestiona y consulta las fichas catastrales del sistema.</p>
                            <a href="#" className="btn btn-primary">Ir a Fichas</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Mapas</h5>
                            <p className="card-text">Visualiza la información geoespacial del sistema.</p>
                            <a href="#" className="btn btn-primary">Ver Mapas</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home 