import React, { useState, useEffect } from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import {
    AdminLayout,
    PageContainer,
    DataTable,
    FilterPanel,
    LoadingState,
    CreateModal,
    EditModal,
    DeleteModal,
    PasswordModal,
    AddButton,
} from '../../../components'
import { useApi } from '../../../hooks/useApi'
import { useToast } from '../../../components/feedback/ToastSystem'
import { usuariosService } from '../api/usuariosService'
import { rolesService } from '../api/rolesService'
import {
    getUsuariosTableActions,
    getUsuariosTableColumns,
    getUsuariosFilterConfig,
    getUsuariosFilterActions,
    getRolesTableColumns,
    validateUsuarioForm,
    validatePasswordChange,
    getUsuariosModalFields
} from '../components'

const RolesYUsuarios = () => {
    const [activeTab, setActiveTab] = useState('usuarios')
    const [usuarios, setUsuarios] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilters, setActiveFilters] = useState({})
    const [error, setError] = useState('')
    const [selectedRows, setSelectedRows] = useState([])

    // Estados para modales
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [selectedUsuario, setSelectedUsuario] = useState(null)

    const { showSuccess, showError } = useToast()

    // Hooks para cargar datos
    const { execute: loadUsuarios, loading: loadingUsuarios } = useApi(usuariosService.getAll)
    const { execute: loadRoles, loading: loadingRoles } = useApi(rolesService.getAll)

    useEffect(() => {
        loadInitialData()
    }, [])

    const loadInitialData = async () => {
        try {
            setLoading(true)
            setError('')

            const [usuariosResult, rolesResult] = await Promise.all([
                loadUsuarios(),
                loadRoles()
            ])

            if (usuariosResult.success) {
                setUsuarios(usuariosResult.data?.data || [])
            } else {
                setError(usuariosResult.error || 'Error al cargar usuarios')
                // Datos de respaldo para desarrollo
                setUsuarios([
                    {
                        id: 1,
                        dni: '12345678',
                        nombres: 'Juan Carlos',
                        apellidos: 'Pérez Gómez',
                        email: 'juan.perez@example.com',
                        activo: true,
                        rol: [{ id: 1, codigo: 'ADMIN', rol: 'Administrador' }]
                    },
                    {
                        id: 2,
                        dni: '87654321',
                        nombres: 'María Elena',
                        apellidos: 'García López',
                        email: 'maria.garcia@example.com',
                        activo: false,
                        rol: [{ id: 2, codigo: 'SUPERVISOR', rol: 'Supervisor' }]
                    }
                ])
            }

            if (rolesResult.success) {
                setRoles(rolesResult.data || [])
            } else {
                // Datos de respaldo para desarrollo
                setRoles([
                    { id: 1, codigo: 'ADMIN', rol: 'Administrador' },
                    { id: 2, codigo: 'SUPERVISOR', rol: 'Supervisor' },
                    { id: 3, codigo: 'INSPECTOR', rol: 'Inspector' }
                ])
            }
        } catch (err) {
            setError('Error de conexión al servidor')
            console.error('Error al cargar datos:', err)
        } finally {
            setLoading(false)
        }
    }

    // Filtrar usuarios basado en búsqueda y filtros
    const filteredUsuarios = usuarios.filter(usuario => {
        // Filtro de búsqueda
        const matchesSearch = !searchTerm ||
            usuario.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase())

        // Filtros adicionales
        const matchesRol = !activeFilters.rolId || usuario.rol?.[0]?.id === parseInt(activeFilters.rolId)
        const matchesEstado = activeFilters.estado === '' || activeFilters.estado === undefined ||
            usuario.activo === activeFilters.estado

        return matchesSearch && matchesRol && matchesEstado
    })

    // Handlers para usuarios
    const handleCreateUsuario = async (data) => {
        try {
            const validation = validateUsuarioForm(data, false)
            if (!validation.isValid) {
                return { success: false, errors: validation.errors }
            }

            // Formatear datos para la API de creación
            const formattedData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                email: data.email,
                password: data.password,
                dni: data.dni,
                idRol: parseInt(data.idRol),
                activo: data.activo !== undefined ? data.activo : true
            }

            const result = await usuariosService.create(formattedData)
            if (result.success) {
                showSuccess('Usuario creado exitosamente')
                loadInitialData()
                setShowCreateModal(false)
                return { success: true }
            } else {
                return { success: false, message: result.error }
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const handleEditUsuario = async (data) => {
        try {
            const validation = validateUsuarioForm(data, true)
            if (!validation.isValid) {
                return { success: false, errors: validation.errors }
            }

            // Formatear datos para la API de actualización (sin idRol y password)
            const formattedData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                email: data.email,
                dni: data.dni,
                activo: data.activo !== undefined ? data.activo : true
            }

            const result = await usuariosService.update(selectedUsuario.id, formattedData)
            if (result.success) {
                showSuccess('Usuario actualizado exitosamente')
                loadInitialData()
                setShowEditModal(false)
                setSelectedUsuario(null)
                return { success: true }
            } else {
                return { success: false, message: result.error }
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const handleChangePassword = async (data) => {
        try {
            const validation = validatePasswordChange(data)
            if (!validation.isValid) {
                return { success: false, errors: validation.errors }
            }

            const result = await usuariosService.changePassword(selectedUsuario.id, data)
            if (result.success) {
                showSuccess('Contraseña cambiada exitosamente')
                setShowPasswordModal(false)
                setSelectedUsuario(null)
                return { success: true }
            } else {
                return { success: false, message: result.error }
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // Funciones de validación wrapper siguiendo el patrón exitoso
    const validateCreateUsuarioForm = (data) => {
        return validateUsuarioForm(data, false)
    }

    const validateEditUsuarioForm = (data) => {
        return validateUsuarioForm(data, true)
    }

    const handleToggleActive = async (usuario) => {
        try {
            const result = await usuariosService.toggleActivo(usuario.id)
            if (result.success) {
                showSuccess(`Usuario ${usuario.activo ? 'desactivado' : 'activado'} exitosamente`)
                loadInitialData()
            } else {
                showError(result.error)
            }
        } catch (error) {
            showError('Error al cambiar estado: ' + error.message)
        }
    }

    const breadcrumbItems = [
        {
            label: 'Inicio',
            href: '/inicio'
        },
        {
            label: 'Configuración',
            href: '/configuracion'
        },
        {
            label: 'Roles y Usuarios'
        }
    ]

    // Configuraciones importadas desde componentes separados
    const usuariosFilterConfig = getUsuariosFilterConfig(roles)
    const usuariosFilterActions = getUsuariosFilterActions(loadInitialData, loading, filteredUsuarios)
    const usuariosColumns = getUsuariosTableColumns(handleToggleActive)
    const usuariosTableActions = getUsuariosTableActions(
        (usuario) => {
            setSelectedUsuario(usuario)
            setShowEditModal(true)
        },
        (usuario) => {
            setSelectedUsuario(usuario)
            setShowPasswordModal(true)
        },
        handleToggleActive
    )

    const rolesColumns = getRolesTableColumns()

    // Configuración de campos para modales
    const modalFields = getUsuariosModalFields(roles)

    if (loading) {
        return (
            <AdminLayout>
                <PageContainer
                    title="Roles y Usuarios"
                    breadcrumbItems={breadcrumbItems}
                >
                    <LoadingState
                        message="Cargando datos..."
                        fullPage={true}
                    />
                </PageContainer>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <PageContainer
                title="Roles y Usuarios"
                breadcrumbItems={breadcrumbItems}
            >
                {/* Mensaje de error si existe */}
                {error && (
                    <div className="alert alert-warning mb-3">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error} - Mostrando datos de ejemplo
                    </div>
                )}

                {/* Tabs */}
                <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                    <Nav variant="tabs" className="mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="usuarios">
                                <i className="fas fa-users me-2"></i>
                                Usuarios
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="roles">
                                <i className="fas fa-user-tag me-2"></i>
                                Roles
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* Tab Usuarios */}
                        <Tab.Pane eventKey="usuarios">
                            {/* Panel de filtros */}
                            <FilterPanel
                                searchValue={searchTerm}
                                onSearchChange={setSearchTerm}
                                searchPlaceholder="Buscar por DNI, nombres, apellidos o email..."
                                filters={usuariosFilterConfig}
                                activeFilters={activeFilters}
                                onFilterChange={setActiveFilters}
                                actions={usuariosFilterActions}
                                collapsible={true}
                                defaultExpanded={false}
                            />

                            {/* Información de selección */}
                            {selectedRows.length > 0 && (
                                <div className="alert alert-info mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <i className="fas fa-info-circle me-2"></i>
                                            {selectedRows.length} usuario(s) seleccionado(s)
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Card con tabla y botón agregar */}
                            <Card className="shadow-sm border-0">
                                {/* Header del card con botón agregar */}
                                <Card.Header className="bg-white border-bottom">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">
                                            <i className="fas fa-users me-2 text-primary"></i>
                                            Lista de Usuarios ({filteredUsuarios.length})
                                        </h6>
                                        <AddButton
                                            onClick={() => setShowCreateModal(true)}
                                            disabled={loading}
                                        >
                                            Agregar Usuario
                                        </AddButton>
                                    </div>
                                </Card.Header>

                                {/* Tabla de usuarios */}
                                <Card.Body >
                                    <DataTable
                                        data={filteredUsuarios}
                                        columns={usuariosColumns}
                                        actions={usuariosTableActions}
                                        loading={loadingUsuarios}
                                        searchable={false}
                                        selectedRows={selectedRows}
                                        onSelectionChange={setSelectedRows}
                                        emptyMessage="No hay usuarios registrados"
                                    />
                                </Card.Body>
                            </Card>
                        </Tab.Pane>

                        {/* Tab Roles */}
                        <Tab.Pane eventKey="roles">
                            {/* Card con tabla de roles */}
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white border-bottom">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">
                                            <i className="fas fa-user-tag me-2 text-primary"></i>
                                            Lista de Roles ({roles.length})
                                        </h6>
                                    </div>
                                </Card.Header>

                                <Card.Body >
                                    <DataTable
                                        data={roles}
                                        columns={rolesColumns}
                                        loading={loadingRoles}
                                        searchable={false}
                                        emptyMessage="No hay roles registrados"
                                    />
                                </Card.Body>
                            </Card>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                {/* Modales - siguiendo exactamente el patrón exitoso del PasswordModal */}
                <CreateModal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    title="Crear Usuario"
                    fields={modalFields.create}
                    onSave={handleCreateUsuario}
                    loading={loading}
                    validateField={null}
                    validateForm={validateCreateUsuarioForm}
                />

                <EditModal
                    show={showEditModal && selectedUsuario}
                    onHide={() => {
                        setShowEditModal(false)
                        setSelectedUsuario(null)
                    }}
                    title="Editar Usuario"
                    fields={modalFields.edit}
                    initialData={selectedUsuario}
                    onSave={handleEditUsuario}
                    loading={loading}
                    validateField={null}
                    validateForm={validateEditUsuarioForm}
                />

                <PasswordModal
                    show={showPasswordModal && selectedUsuario}
                    onHide={() => {
                        setShowPasswordModal(false)
                        setSelectedUsuario(null)
                    }}
                    title={`Cambiar Contraseña - ${selectedUsuario?.nombres} ${selectedUsuario?.apellidos}`}
                    user={selectedUsuario}
                    onSave={handleChangePassword}
                    loading={loading}
                    validateField={null}
                    validateForm={validatePasswordChange}
                />
            </PageContainer>
        </AdminLayout>
    )
}

export default RolesYUsuarios 