import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../api/authService'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
            const result = await authService.forgotPassword({ email })

            if (result.success) {
                setSuccess(true)
                setMessage('Se ha enviado un enlace de recuperación a tu email.')
            } else {
                setError(result.error || 'Error al enviar email de recuperación')
            }
        } catch (err) {
            setError('Error inesperado. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100"
            style={{
                backgroundColor: '#f8f9fa',
                padding: '20px'
            }}>
            <div className="w-100" style={{ maxWidth: '450px' }}>
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-dark mb-2">Recuperar Contraseña</h3>
                            <p className="text-muted small">Ingresa tu email para recibir instrucciones</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                {error}
                            </div>
                        )}

                        {success ? (
                            <div>
                                <div className="alert alert-success">
                                    <i className="fas fa-check-circle me-2"></i>
                                    {message}
                                </div>

                                <div className="text-center mt-3">
                                    <p className="text-muted small mb-3">Revisa tu bandeja de entrada y sigue las instrucciones.</p>
                                    <Link to="/login" className="btn btn-primary">
                                        Volver al Login
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="d-flex form-label fw-semibold m-1">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="tu@email.com"
                                        autoComplete="username"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100 mb-3"
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Enlace de Recuperación'
                                    )}
                                </button>
                            </form>
                        )}

                        <div className="text-center">
                            <Link to="/login" className="text-decoration-none text-muted small">
                                <i className="fas fa-arrow-left me-1"></i>
                                Volver al login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword 