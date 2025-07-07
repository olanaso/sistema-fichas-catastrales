import React, { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar el formulario
        alert('Mensaje enviado correctamente')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div>
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card bg-success text-white shadow border-0">
                        <div className="card-body p-4 text-center">
                            <h2 className="fw-bold mb-2">
                                <i className="fas fa-envelope me-2"></i>
                                Contacto y Soporte
                            </h2>
                            <p className="mb-0 opacity-75">
                                Estamos aquí para ayudarte con cualquier consulta
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Contact Form */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white border-bottom">
                            <h5 className="mb-0 fw-bold">
                                <i className="fas fa-paper-plane me-2 text-primary"></i>
                                Enviar Mensaje
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label fw-semibold">Nombre completo</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="subject" className="form-label fw-semibold">Asunto</label>
                                    <select 
                                        className="form-select"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona un asunto</option>
                                        <option value="soporte-tecnico">Soporte Técnico</option>
                                        <option value="consulta-general">Consulta General</option>
                                        <option value="reporte-error">Reporte de Error</option>
                                        <option value="solicitud-feature">Solicitud de Funcionalidad</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label fw-semibold">Mensaje</label>
                                    <textarea 
                                        className="form-control" 
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Describe tu consulta o problema..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg">
                                    <i className="fas fa-paper-plane me-2"></i>
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Contact Info Sidebar */}
                <div className="col-lg-4">
                    <div className="row g-4">
                        {/* Contact Info Card */}
                        <div className="col-12">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-primary text-white">
                                    <h6 className="mb-0 fw-semibold">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Información de Contacto
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fas fa-phone text-primary me-3"></i>
                                            <div>
                                                <strong>Teléfono</strong><br />
                                                <span className="text-muted">+123 456 7890</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fas fa-envelope text-primary me-3"></i>
                                            <div>
                                                <strong>Email</strong><br />
                                                <span className="text-muted">soporte@sistema-catastral.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fas fa-map-marker-alt text-primary me-3"></i>
                                            <div>
                                                <strong>Dirección</strong><br />
                                                <span className="text-muted">Av. Principal 123, Ciudad</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-clock text-primary me-3"></i>
                                            <div>
                                                <strong>Horario</strong><br />
                                                <span className="text-muted">Lunes a Viernes<br />8:00 AM - 6:00 PM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Types Card */}
                        <div className="col-12">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-warning text-dark">
                                    <h6 className="mb-0 fw-semibold">
                                        <i className="fas fa-headset me-2"></i>
                                        Tipos de Soporte
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="list-group list-group-flush">
                                        <div className="list-group-item border-0 px-0">
                                            <i className="fas fa-bug text-danger me-2"></i>
                                            <strong>Reporte de errores</strong>
                                        </div>
                                        <div className="list-group-item border-0 px-0">
                                            <i className="fas fa-question-circle text-info me-2"></i>
                                            <strong>Consultas técnicas</strong>
                                        </div>
                                        <div className="list-group-item border-0 px-0">
                                            <i className="fas fa-cogs text-success me-2"></i>
                                            <strong>Configuración del sistema</strong>
                                        </div>
                                        <div className="list-group-item border-0 px-0">
                                            <i className="fas fa-graduation-cap text-primary me-2"></i>
                                            <strong>Capacitación</strong>
                                        </div>
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

export default Contact 