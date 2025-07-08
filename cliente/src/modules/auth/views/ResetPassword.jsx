import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { authService } from '../api/authService'

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [token, setToken] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token')
        if (tokenFromUrl) {
            setToken(tokenFromUrl)
        } else {
            setError('Token de recuperación no válido o ausente')
        }
    }, [searchParams])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validatePasswords = () => {
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!validatePasswords()) {
            return
        }

        setLoading(true)

        try {
            const result = await authService.resetPassword({
                token,
                password: formData.password
            })

            if (result.success) {
                setSuccess(true)
            } else {
                setError(result.error || 'Error al restablecer la contraseña')
            }
        } catch (err) {
            setError('Error inesperado. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100"
            style={{
                backgroundColor: '#f8f9fa',
                padding: '20px'
            }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-dark mb-2">Restablecer Contraseña</h3>
                            <p className="text-muted small">Ingresa tu nueva contraseña</p>
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
                                    Tu contraseña ha sido restablecida exitosamente.
                                </div>

                                <div className="text-center mt-3">
                                    <p className="text-muted small mb-3">Ya puedes iniciar sesión con tu nueva contraseña.</p>
                                    <Link to="/login" className="btn btn-primary">
                                        Ir al Login
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Nueva Contraseña</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control pe-5"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                                zIndex: 5
                                            }}
                                            onClick={togglePasswordVisibility}
                                            tabIndex="-1"
                                        >
                                            <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'} text-muted`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Confirmar Contraseña</label>
                                    <div className="position-relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            className="form-control pe-5"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                                zIndex: 5
                                            }}
                                            onClick={toggleConfirmPasswordVisibility}
                                            tabIndex="-1"
                                        >
                                            <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'} text-muted`}></i>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !token}
                                    className="btn btn-primary w-100 mb-3"
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Restableciendo...
                                        </>
                                    ) : (
                                        'Restablecer Contraseña'
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

export default ResetPassword 