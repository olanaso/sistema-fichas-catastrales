import React from 'react'

function About() {
    return (
        <div>
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card bg-info text-white shadow border-0">
                        <div className="card-body p-4 text-center">
                            <h2 className="fw-bold mb-2">
                                <i className="fas fa-info-circle me-2"></i>
                                Acerca del Sistema Catastral
                            </h2>
                            <p className="mb-0 opacity-75">
                                Sistema integral para gestión catastral moderna
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Content */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-4">
                            <h4 className="fw-bold text-dark mb-3">Descripción del Sistema</h4>
                            <p className="lead text-muted mb-4">
                                El Sistema de Fichas Catastrales es una aplicación web desarrollada para la gestión
                                y consulta de información catastral de manera eficiente y moderna.
                            </p>

                            <h5 className="fw-bold text-dark mb-3">
                                <i className="fas fa-star text-warning me-2"></i>
                                Características principales:
                            </h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Gestión de fichas catastrales</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Visualización de mapas interactivos</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Carga de archivos geoespaciales</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Interfaz responsive y moderna</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Integración con sistemas GIS</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Sistema de autenticación seguro</span>
                                    </div>
                                </div>
                            </div>

                            <h5 className="fw-bold text-dark mb-3">
                                <i className="fas fa-code text-primary me-2"></i>
                                Tecnologías utilizadas:
                            </h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="bg-light p-3 rounded">
                                        <strong>Frontend:</strong><br />
                                        React 19 + Vite<br />
                                        React Router DOM<br />
                                        Bootstrap 5
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bg-light p-3 rounded">
                                        <strong>Mapas & GIS:</strong><br />
                                        Leaflet<br />
                                        shpjs, togeojson<br />
                                        Font Awesome Icons
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-lg-4">
                    <div className="row g-4">
                        {/* System Info Card */}
                        <div className="col-12">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-primary text-white">
                                    <h6 className="mb-0 fw-semibold">
                                        <i className="fas fa-info me-2"></i>
                                        Información del Sistema
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <strong className="text-primary">Versión:</strong><br />
                                        <span className="text-muted">1.0.0</span>
                                    </div>
                                    <div className="mb-3">
                                        <strong className="text-primary">Desarrollado por:</strong><br />
                                        <span className="text-muted">Equipo de Desarrollo</span>
                                    </div>
                                    <div className="mb-0">
                                        <strong className="text-primary">Fecha:</strong><br />
                                        <span className="text-muted">2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Card */}
                        <div className="col-12">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-success text-white">
                                    <h6 className="mb-0 fw-semibold">
                                        <i className="fas fa-link me-2"></i>
                                        Enlaces Útiles
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-outline-primary btn-sm">
                                            <i className="fas fa-book me-2"></i>
                                            Documentación
                                        </button>
                                        <button className="btn btn-outline-success btn-sm">
                                            <i className="fas fa-question-circle me-2"></i>
                                            Soporte
                                        </button>
                                        <button className="btn btn-outline-info btn-sm">
                                            <i className="fas fa-download me-2"></i>
                                            Descargas
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About 