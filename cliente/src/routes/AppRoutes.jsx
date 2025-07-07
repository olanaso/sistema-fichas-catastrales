import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Paths } from './paths'

// Layouts y componentes
import { AdminLayout, PageContainer, ComingSoon } from '../components'

// Vistas principales
import Inicio from '../modules/Inicio'

// Vistas de autenticación (sin layout)
import Login from '../modules/auth/views/Login'
import ForgotPassword from '../modules/auth/views/ForgotPassword'
import ResetPassword from '../modules/auth/views/ResetPassword'

// Vistas de módulos
import ListaFichas from '../modules/fichas/views/ListaFichas'
import ListaUsuarios from '../modules/usuarios/views/ListaUsuarios'

// Componente para páginas 404
const NotFoundPage = () => (
    <AdminLayout>
        <PageContainer 
            title="Página no encontrada"
            breadcrumbItems={[
                { label: 'Inicio', href: '/inicio' },
                { label: 'Error 404' }
            ]}
        >
            <div className="py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center py-5">
                                <div className="mb-4">
                                    <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                                </div>
                                <h2 className="text-warning mb-3">404 - Página no encontrada</h2>
                                <p className="text-muted mb-4">
                                    Lo sentimos, la página que estás buscando no existe.
                                </p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => window.location.href = Paths.inicio}
                                >
                                    <i className="fas fa-home me-2"></i>
                                    Ir al Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    </AdminLayout>
)

// Componente wrapper para vistas ComingSoon
const ComingSoonPage = ({ title, breadcrumbItems }) => (
    <AdminLayout>
        <PageContainer 
            title={title}
            breadcrumbItems={breadcrumbItems}
        >
            <ComingSoon title={title} />
        </PageContainer>
    </AdminLayout>
)

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Ruta principal - Inicio */}
                <Route path="/" element={<Inicio />} />
                <Route path={Paths.inicio} element={<Inicio />} />
                <Route path={Paths.dashboard} element={<Inicio />} />

                {/* Rutas de Fichas Catastrales */}
                <Route path={Paths.fichas} element={
                    <ComingSoonPage 
                        title="Fichas Catastrales" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Fichas Catastrales' }
                        ]}
                    />
                } />
                <Route path={Paths.fichasList} element={<ListaFichas />} />
                <Route path={Paths.fichasCreate} element={
                    <ComingSoonPage 
                        title="Crear Ficha" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Fichas Catastrales', href: '/fichas' },
                            { label: 'Crear Ficha' }
                        ]}
                    />
                } />
                <Route path={Paths.fichasSearch} element={
                    <ComingSoonPage 
                        title="Buscar Fichas" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Fichas Catastrales', href: '/fichas' },
                            { label: 'Buscar Fichas' }
                        ]}
                    />
                } />
                <Route path={Paths.fichasEdit} element={
                    <ComingSoonPage 
                        title="Editar Ficha" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Fichas Catastrales', href: '/fichas' },
                            { label: 'Editar Ficha' }
                        ]}
                    />
                } />
                <Route path={Paths.fichasView} element={
                    <ComingSoonPage 
                        title="Ver Ficha" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Fichas Catastrales', href: '/fichas' },
                            { label: 'Ver Ficha' }
                        ]}
                    />
                } />

                {/* Rutas de Usuarios */}
                <Route path={Paths.usuarios} element={
                    <ComingSoonPage 
                        title="Usuarios" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Usuarios' }
                        ]}
                    />
                } />
                <Route path={Paths.usuariosList} element={<ListaUsuarios />} />
                <Route path={Paths.usuariosCreate} element={
                    <ComingSoonPage 
                        title="Crear Usuario" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Usuarios', href: '/usuarios' },
                            { label: 'Crear Usuario' }
                        ]}
                    />
                } />
                <Route path={Paths.usuariosRoles} element={
                    <ComingSoonPage 
                        title="Gestión de Roles" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Usuarios', href: '/usuarios' },
                            { label: 'Gestión de Roles' }
                        ]}
                    />
                } />
                <Route path={Paths.usuariosEdit} element={
                    <ComingSoonPage 
                        title="Editar Usuario" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Usuarios', href: '/usuarios' },
                            { label: 'Editar Usuario' }
                        ]}
                    />
                } />
                <Route path={Paths.usuariosView} element={
                    <ComingSoonPage 
                        title="Ver Usuario" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Usuarios', href: '/usuarios' },
                            { label: 'Ver Usuario' }
                        ]}
                    />
                } />

                {/* Rutas de Reportes */}
                <Route path={Paths.reportes} element={
                    <ComingSoonPage 
                        title="Reportes" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Reportes' }
                        ]}
                    />
                } />
                <Route path={Paths.reportesDashboard} element={
                    <ComingSoonPage 
                        title="Dashboard de Reportes" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Reportes', href: '/reportes' },
                            { label: 'Dashboard' }
                        ]}
                    />
                } />
                <Route path={Paths.reportesFichas} element={
                    <ComingSoonPage 
                        title="Reporte de Fichas" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Reportes', href: '/reportes' },
                            { label: 'Reporte de Fichas' }
                        ]}
                    />
                } />
                <Route path={Paths.reportesActividad} element={
                    <ComingSoonPage 
                        title="Actividad del Sistema" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Reportes', href: '/reportes' },
                            { label: 'Actividad del Sistema' }
                        ]}
                    />
                } />

                {/* Rutas de Configuración */}
                <Route path={Paths.configuracion} element={
                    <ComingSoonPage 
                        title="Configuración" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Configuración' }
                        ]}
                    />
                } />
                <Route path={Paths.configSistema} element={
                    <ComingSoonPage 
                        title="Configuración del Sistema" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Configuración', href: '/configuracion' },
                            { label: 'Sistema' }
                        ]}
                    />
                } />
                <Route path={Paths.configBackup} element={
                    <ComingSoonPage 
                        title="Respaldos" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Configuración', href: '/configuracion' },
                            { label: 'Respaldos' }
                        ]}
                    />
                } />
                <Route path={Paths.configLogs} element={
                    <ComingSoonPage 
                        title="Logs del Sistema" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Configuración', href: '/configuracion' },
                            { label: 'Logs del Sistema' }
                        ]}
                    />
                } />

                {/* Rutas de autenticación (sin layout) */}
                <Route path={Paths.login} element={<Login />} />
                <Route path={Paths.forgotPassword} element={<ForgotPassword />} />
                <Route path={Paths.resetPassword} element={<ResetPassword />} />

                {/* Rutas adicionales */}
                <Route path={Paths.emergencia} element={
                    <ComingSoonPage 
                        title="Emergencia" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Emergencia' }
                        ]}
                    />
                } />
                <Route path={Paths.contacto} element={
                    <ComingSoonPage 
                        title="Contacto" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Contacto' }
                        ]}
                    />
                } />
                <Route path={Paths.calendar} element={
                    <ComingSoonPage 
                        title="Calendario" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Configuración', href: '/configuracion' },
                            { label: 'Calendario' }
                        ]}
                    />
                } />

                {/* Ruta 404 - Página no encontrada */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 