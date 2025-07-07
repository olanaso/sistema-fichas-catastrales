import React from 'react'

function Contact() {
    return (
        <div className="container">
            <h1>Contacto</h1>
            <div className="row">
                <div className="col-md-8">
                    <h3>Información de Contacto</h3>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Centro de Soporte</h5>
                            <p className="card-text">
                                <i className="fas fa-phone"></i> <strong>Teléfono:</strong> +123 456 7890<br />
                                <i className="fas fa-envelope"></i> <strong>Email:</strong> soporte@sistema-catastral.com<br />
                                <i className="fas fa-map-marker-alt"></i> <strong>Dirección:</strong> Av. Principal 123, Ciudad<br />
                                <i className="fas fa-clock"></i> <strong>Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM
                            </p>
                        </div>
                    </div>

                    <h3 className="mt-4">Enviar Mensaje</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Asunto</label>
                            <input type="text" className="form-control" id="subject" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Mensaje</label>
                            <textarea className="form-control" id="message" rows="4"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
                    </form>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Soporte Técnico</h5>
                            <p className="card-text">
                                Para problemas técnicos o consultas sobre el sistema, contáctanos a través de:
                            </p>
                            <ul className="list-unstyled">
                                <li><i className="fas fa-bug"></i> Reporte de errores</li>
                                <li><i className="fas fa-question-circle"></i> Consultas técnicas</li>
                                <li><i className="fas fa-cogs"></i> Configuración del sistema</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact 