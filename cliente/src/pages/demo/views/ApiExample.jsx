import React, { useState } from 'react'
import { useApi, usePagination, useForm } from '../../../hooks/useApi'
import { fichasCatastralesService } from '../../fichas/api/fichasCatastralesService'
import { usuariosService } from '../../usuarios/api/usuariosService'
import { authService } from '../../auth/api/authService'
import { demoService } from '../api/demoService'

function ApiExample() {
    const [selectedTab, setSelectedTab] = useState('demo')

    // Ejemplo de uso del hook useApi con servicio demo
    const { 
        data: demoData, 
        loading: loadingDemo, 
        error: errorDemo, 
        execute: loadDemo 
    } = useApi(demoService.getMockData)

    // Ejemplo de uso del hook useApi con fichas
    const { 
        data: fichas, 
        loading: loadingFichas, 
        error: errorFichas, 
        execute: loadFichas 
    } = useApi(fichasCatastralesService.getAll)

    // Ejemplo de uso del hook usePagination
    const {
        items: usuarios,
        loading: loadingUsuarios,
        error: errorUsuarios,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage
    } = usePagination(usuariosService.getAll)

    // Ejemplo de uso del hook useForm
    const {
        formData,
        loading: loadingForm,
        error: errorForm,
        success: successForm,
        handleChange,
        handleSubmit,
        reset
    } = useForm(
        { email: '', password: '' },
        authService.login
    )

    // Ejemplo de petición individual con demo service
    const handleTestConnection = async () => {
        const result = await demoService.testConnection()
        if (result.success) {
            console.log('✅ Conexión exitosa:', result.data)
        } else {
            console.error('❌ Error de conexión:', result.error)
        }
    }

    // Ejemplo de búsqueda de fichas
    const handleSearchFichas = async () => {
        const result = await fichasCatastralesService.search('ejemplo', { limit: 10 })
        if (result.success) {
            console.log('✅ Fichas encontradas:', result.data)
        } else {
            console.error('❌ Error en búsqueda:', result.error)
        }
    }

    return (
        <div className="container mt-4">
            <h1>Ejemplos de Uso de API</h1>
            <p className="text-muted">Ejemplos prácticos de cómo usar los servicios de API organizados por módulos</p>

            {/* Pestañas */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${selectedTab === 'demo' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('demo')}
                    >
                        🧪 Demo Service
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${selectedTab === 'fichas' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('fichas')}
                    >
                        📋 Fichas Catastrales
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${selectedTab === 'usuarios' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('usuarios')}
                    >
                        👥 Usuarios (Paginación)
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${selectedTab === 'login' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('login')}
                    >
                        🔐 Login (Formulario)
                    </button>
                </li>
            </ul>

            {/* Contenido de las pestañas */}
            {selectedTab === 'demo' && (
                <div className="tab-content">
                    <h3>Demo Service - /pages/demo/api/</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Acciones Demo</h5>
                                    <button 
                                        className="btn btn-primary me-2 mb-2" 
                                        onClick={loadDemo}
                                        disabled={loadingDemo}
                                    >
                                        {loadingDemo ? 'Cargando...' : 'Cargar Datos Mock'}
                                    </button>
                                    <br />
                                    <button 
                                        className="btn btn-info me-2" 
                                        onClick={handleTestConnection}
                                    >
                                        Probar Conexión API
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Estado</h5>
                                    {loadingDemo && <p className="text-info">🔄 Cargando datos demo...</p>}
                                    {errorDemo && <p className="text-danger">❌ Error: {errorDemo}</p>}
                                    {demoData && (
                                        <div>
                                            <p className="text-success">✅ Datos cargados exitosamente</p>
                                            <p>Total: {demoData.length || 0} elementos</p>
                                            <pre className="bg-light p-2 rounded small">
                                                {JSON.stringify(demoData, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'fichas' && (
                <div className="tab-content">
                    <h3>Fichas Catastrales - /pages/fichas/api/</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Acciones</h5>
                                    <button 
                                        className="btn btn-primary me-2" 
                                        onClick={loadFichas}
                                        disabled={loadingFichas}
                                    >
                                        {loadingFichas ? 'Cargando...' : 'Cargar Fichas'}
                                    </button>
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={handleSearchFichas}
                                    >
                                        Buscar Fichas
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Estado</h5>
                                    {loadingFichas && <p className="text-info">🔄 Cargando fichas...</p>}
                                    {errorFichas && <p className="text-danger">❌ Error: {errorFichas}</p>}
                                    {fichas && (
                                        <div>
                                            <p className="text-success">✅ Fichas cargadas exitosamente</p>
                                            <p>Total: {fichas.length || 0} fichas</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'usuarios' && (
                <div className="tab-content">
                    <h3>Usuarios - /pages/usuarios/api/</h3>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Lista de Usuarios</h5>
                                    
                                    {loadingUsuarios && <p className="text-info">🔄 Cargando usuarios...</p>}
                                    {errorUsuarios && <p className="text-danger">❌ Error: {errorUsuarios}</p>}
                                    
                                    {usuarios && usuarios.length > 0 && (
                                        <div>
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Nombre</th>
                                                            <th>Email</th>
                                                            <th>Estado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {usuarios.map(usuario => (
                                                            <tr key={usuario.id || Math.random()}>
                                                                <td>{usuario.id || 'N/A'}</td>
                                                                <td>{usuario.nombre || usuario.name || 'Sin nombre'}</td>
                                                                <td>{usuario.email || 'Sin email'}</td>
                                                                <td>
                                                                    <span className={`badge ${usuario.activo || usuario.active ? 'bg-success' : 'bg-secondary'}`}>
                                                                        {usuario.activo || usuario.active ? 'Activo' : 'Inactivo'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            
                                            {/* Paginación */}
                                            {totalPages > 1 && (
                                                <nav>
                                                    <ul className="pagination justify-content-center">
                                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                            <button className="page-link" onClick={prevPage}>
                                                                Anterior
                                                            </button>
                                                        </li>
                                                        
                                                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
                                                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                                <button className="page-link" onClick={() => goToPage(page)}>
                                                                    {page}
                                                                </button>
                                                            </li>
                                                        ))}
                                                        
                                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                            <button className="page-link" onClick={nextPage}>
                                                                Siguiente
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'login' && (
                <div className="tab-content">
                    <h3>Login - /pages/auth/api/</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Formulario de Login</h5>
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder="usuario@ejemplo.com"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Contraseña</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                value={formData.password}
                                                onChange={(e) => handleChange('password', e.target.value)}
                                                placeholder="Tu contraseña"
                                                required
                                            />
                                        </div>
                                        
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary me-2"
                                            disabled={loadingForm}
                                        >
                                            {loadingForm ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary"
                                            onClick={reset}
                                        >
                                            Limpiar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                                            
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Estado del Formulario</h5>
                                    
                                    {loadingForm && <p className="text-info">🔄 Procesando login...</p>}
                                    {errorForm && <p className="text-danger">❌ Error: {errorForm}</p>}
                                    {successForm && <p className="text-success">✅ Login exitoso!</p>}
                                    
                                    <h6>Datos del formulario:</h6>
                                    <pre className="bg-light p-2 rounded">
                                        {JSON.stringify(formData, null, 2)}
                                    </pre>
                                    
                                    <h6 className="mt-3">Estructura de carpetas:</h6>
                                    <pre className="bg-light p-2 rounded small">
{`src/pages/
├── demo/api/demoService.js
├── auth/api/authService.js  
├── usuarios/api/usuariosService.js
└── fichas/api/fichasCatastralesService.js`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ApiExample 