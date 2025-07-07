import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../api/authService'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await authService.login(formData)

            if (result.success) {
                navigate('/dashboard')
            } else {
                setError(result.error || 'Error en el login')
            }
        } catch (err) {
            setError('Error inesperado al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" 
             style={{ 
                 backgroundColor: '#f8f9fa',
                 padding: '20px'
             }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="card shadow border-0">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark mb-3">Iniciar Sesión</h2>
                            <p className="text-muted">Ingresa a tu cuenta del sistema</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-start d-block">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="tu@email.com"
                                    autoComplete="username"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-start d-block">Contraseña</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control form-control-lg pe-5"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
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

                            <div className="mb-4 text-end">
                                <Link to="/forgot-password" className="text-decoration-none">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary btn-lg w-100 mb-3"
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>

                        <div className="text-center">
                            <Link to="/" className="text-decoration-none text-muted">
                                <i className="fas fa-arrow-left me-2"></i>
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 