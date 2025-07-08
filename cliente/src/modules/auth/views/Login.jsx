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
                navigate('/inicio')
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
            <div className="w-100" style={{ maxWidth: '450px' }}>
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-dark mb-2">Iniciar Sesión</h3>
                            <p className="text-muted small">Accede al sistema catastral</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="d-flex form-label fw-semibold m-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="tu@email.com"
                                    autoComplete="username"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="d-flex form-label fw-semibold m-1">Contraseña</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control pe-5"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        autoComplete="current-password"
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

                            <div className="mb-3 text-end">
                                <Link to="/forgot-password" className="text-decoration-none small">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-100"
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 