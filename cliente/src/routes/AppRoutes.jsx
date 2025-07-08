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
            <div className="text-center py-5">
                <h1 className="display-1 text-muted">404</h1>
                <p className="text-muted">La página que buscas no existe.</p>
            </div>
        </PageContainer>
    </AdminLayout>
)

// Componente para páginas en desarrollo
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
                {/* Rutas de autenticación (sin layout) */}
                <Route path={Paths.login} element={<Login />} />
                <Route path={Paths.forgotPassword} element={<ForgotPassword />} />
                <Route path={Paths.resetPassword} element={<ResetPassword />} />

                {/* Ruta principal - Inicio */}
                <Route path="/" element={<Inicio />} />
                <Route path={Paths.inicio} element={<Inicio />} />

                {/* Rutas de Fichas Catastrales */}
                <Route path={Paths.fichasList} element={<ListaFichas />} />
                <Route path={Paths.fichasCreate} element={
                    <ComingSoonPage 
                        title="Crear Ficha Catastral" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Fichas', href: '/fichas/lista' },
                            { label: 'Crear Ficha' }
                        ]}
                    />
                } />

                {/* Rutas de Usuarios */}
                <Route path={Paths.usuariosList} element={<ListaUsuarios />} />
                <Route path={Paths.usuariosCreate} element={
                    <ComingSoonPage 
                        title="Crear Usuario" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Usuarios', href: '/usuarios/lista' },
                            { label: 'Crear Usuario' }
                        ]}
                    />
                } />

                {/* Rutas de Reportes */}
                <Route path={Paths.reportesDashboard} element={
                    <ComingSoonPage 
                        title="Dashboard de Reportes" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Reportes' }
                        ]}
                    />
                } />

                {/* Rutas de Configuración */}
                <Route path={Paths.configSistema} element={
                    <ComingSoonPage 
                        title="Configuración del Sistema" 
                        breadcrumbItems={[
                            { label: 'Inicio', href: '/inicio' },
                            { label: 'Configuración' }
                        ]}
                    />
                } />

                {/* Página 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 