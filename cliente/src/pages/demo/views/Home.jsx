import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card bg-primary text-white shadow border-0">
                        <div className="card-body p-5 text-center">
                            <h1 className="display-5 fw-bold mb-3">
                                <i className="fas fa-building me-3"></i>
                                Sistema Catastral
                            </h1>
                            <p className="lead mb-4">
                                Gestión integral de fichas catastrales y propiedades inmobiliarias
                            </p>
                            <Link to="/dashboard" className="btn btn-light btn-lg">
                                <i className="fas fa-sign-in-alt me-2"></i>
                                Acceder al Sistema
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="row g-4 mb-4">
                <div className="col-md-6 col-lg-3">
                    <div className="card h-100 shadow-sm border-0">
                        <div className="card-body text-center p-4">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-file-alt text-primary fs-4"></i>
                            </div>
                            <h5 className="card-title fw-bold">Fichas Catastrales</h5>
                            <p className="card-text text-muted">
                                Gestiona y consulta todas las fichas catastrales del sistema de manera eficiente.
                            </p>
                            <button className="btn btn-outline-primary">
                                <i className="fas fa-arrow-right me-2"></i>
                                Ver Fichas
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="card h-100 shadow-sm border-0">
                        <div className="card-body text-center p-4">
                            <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-map text-success fs-4"></i>
                            </div>
                            <h5 className="card-title fw-bold">Mapas Interactivos</h5>
                            <p className="card-text text-muted">
                                Visualiza la información geoespacial con mapas interactivos y modernos.
                            </p>
                            <button className="btn btn-outline-success">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                Ver Mapas
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="card h-100 shadow-sm border-0">
                        <div className="card-body text-center p-4">
                            <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-chart-bar text-warning fs-4"></i>
                            </div>
                            <h5 className="card-title fw-bold">Reportes</h5>
                            <p className="card-text text-muted">
                                Genera reportes detallados y estadísticas del sistema catastral.
                            </p>
                            <button className="btn btn-outline-warning">
                                <i className="fas fa-chart-line me-2"></i>
                                Ver Reportes
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="card h-100 shadow-sm border-0">
                        <div className="card-body text-center p-4">
                            <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-users text-info fs-4"></i>
                            </div>
                            <h5 className="card-title fw-bold">Gestión Usuarios</h5>
                            <p className="card-text text-muted">
                                Administra usuarios, roles y permisos del sistema de manera segura.
                            </p>
                            <button className="btn btn-outline-info">
                                <i className="fas fa-user-cog me-2"></i>
                                Gestionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card bg-light border-0">
                        <div className="card-body text-center p-4">
                            <h3 className="text-primary fw-bold mb-1">1,234</h3>
                            <p className="text-muted mb-0">Fichas Registradas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light border-0">
                        <div className="card-body text-center p-4">
                            <h3 className="text-success fw-bold mb-1">567</h3>
                            <p className="text-muted mb-0">Propiedades Activas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light border-0">
                        <div className="card-body text-center p-4">
                            <h3 className="text-warning fw-bold mb-1">89</h3>
                            <p className="text-muted mb-0">Usuarios Activos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home 