import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
    AdminLayout,
    PageContainer,
    DataTable,
    FilterPanel,
    LoadingState,
    AddButton,
    DeleteButton,
    ExportButton,
} from '../../../components'
import { useApi } from '../../../hooks/useApi'
import { usuariosService } from '../api/usuariosService'

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilters, setActiveFilters] = useState({})
    const [error, setError] = useState('')
    const [selectedRows, setSelectedRows] = useState([])

    // Hook para cargar usuarios
    const { execute: loadUsuarios, loading: loadingUsuarios } = useApi(usuariosService.getAll)

    useEffect(() => {
        loadUsuariosData()
    }, [])

    const loadUsuariosData = async () => {
        try {
            setLoading(true)
            setError('')

            const result = await loadUsuarios()
            if (result.success) {
                setUsuarios(result.data || [])
            } else {
                setError(result.error || 'Error al cargar usuarios')
                // Datos de respaldo para desarrollo
                setUsuarios([
                    {
                        id: 1,
                        dni: '70021894',
                        nombre: 'ERICK ESCALANTE OLANO',
                        email: 'ericka.escalantealano@gmail.com',
                        rol: 'ADMINISTRADOR',
                        estado: 'Activo',
                        ultimoAcceso: '2024-01-15 14:30',
                        fechaCreacion: '2024-01-01'
                    },
                    {
                        id: 2,
                        dni: '70021895',
                        nombre: 'MARÍA GARCÍA LÓPEZ',
                        email: 'maria.garcia@gmail.com',
                        rol: 'USUARIO',
                        estado: 'Activo',
                        ultimoAcceso: '2024-01-14 09:15',
                        fechaCreacion: '2024-01-05'
                    },
                    {
                        id: 3,
                        dni: '70021896',
                        nombre: 'CARLOS RODRIGUEZ PÉREZ',
                        email: 'carlos.rodriguez@gmail.com',
                        rol: 'USUARIO',
                        estado: 'Inactivo',
                        ultimoAcceso: '2024-01-10 16:45',
                        fechaCreacion: '2024-01-03'
                    }
                ])
            }
        } catch (err) {
            setError('Error de conexión al servidor')
            console.error('Error al cargar usuarios:', err)
        } finally {
            setLoading(false)
        }
    }

    // Filtrar usuarios basado en búsqueda y filtros
    const filteredUsuarios = usuarios.filter(usuario => {
        // Filtro de búsqueda
        const matchesSearch = !searchTerm ||
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.dni.includes(searchTerm) ||
            usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())

        // Filtros adicionales
        const matchesRol = !activeFilters.rol || usuario.rol === activeFilters.rol
        const matchesEstado = !activeFilters.estado || usuario.estado === activeFilters.estado

        return matchesSearch && matchesRol && matchesEstado
    })

    const breadcrumbItems = [
        {
            label: 'Inicio',
            href: '/inicio'
        },
        {
            label: 'Usuarios',
            href: '/usuarios'
        },
        {
            label: 'Lista de Usuarios'
        }
    ]

    // Configuración de filtros
    const filterConfig = [
        {
            key: 'rol',
            label: 'Rol',
            type: 'select',
            placeholder: 'Seleccionar rol...',
            options: [
                { value: 'ADMINISTRADOR', label: 'Administrador' },
                { value: 'USUARIO', label: 'Usuario' }
            ]
        },
        {
            key: 'estado',
            label: 'Estado',
            type: 'select',
            placeholder: 'Seleccionar estado...',
            options: [
                { value: 'Activo', label: 'Activo' },
                { value: 'Inactivo', label: 'Inactivo' }
            ]
        },
        {
            key: 'fechaCreacion',
            label: 'Fecha de Registro',
            type: 'dateRange'
        }
    ]

    // Acciones adicionales para el panel de filtros
    const filterActions = [
        {
            label: 'Exportar',
            icon: 'fas fa-download',
            variant: 'outline-success',
            onClick: () => console.log('Exportar usuarios:', filteredUsuarios)
        },
        {
            label: 'Actualizar',
            icon: 'fas fa-sync-alt',
            variant: 'outline-primary',
            onClick: loadUsuariosData,
            disabled: loading
        }
    ]

    // Configuración de columnas para la tabla
    const columns = [
        {
            key: 'dni',
            label: 'DNI',
            width: '100px',
            render: (value) => <strong className="text-primary">{value}</strong>
        },
        {
            key: 'nombre',
            label: 'Nombres',
            width: '200px'
        },
        {
            key: 'rol',
            label: 'Rol',
            width: '120px',
            type: 'badge',
            getVariant: (value) => value === 'ADMINISTRADOR' ? 'primary' : 'info',
            render: (value) => value === 'ADMINISTRADOR' ? 'Administrador' : 'Usuario'
        },
        {
            key: 'email',
            label: 'Correo',
            width: '200px'
        },
        {
            key: 'estado',
            label: 'Estado',
            width: '100px',
            type: 'badge',
            getVariant: (value) => value === 'Activo' ? 'success' : 'secondary'
        }
    ]

    // Acciones de la tabla
    const tableActions = [
        {
            icon: 'fas fa-eye',
            variant: 'outline-info',
            title: 'Ver Usuario',
            onClick: (item) => console.log('Ver usuario:', item)
        },
        {
            icon: 'fas fa-edit',
            variant: 'outline-primary',
            title: 'Editar Usuario',
            onClick: (item) => console.log('Editar usuario:', item)
        },
        {
            icon: 'fas fa-key',
            variant: 'outline-warning',
            title: 'Cambiar Contraseña',
            onClick: (item) => console.log('Cambiar contraseña:', item)
        },
        {
            icon: 'fas fa-trash',
            variant: 'outline-danger',
            title: 'Eliminar Usuario',
            onClick: (item) => {
                if (window.confirm(`¿Está seguro de eliminar a ${item.nombre}?`)) {
                    console.log('Eliminar usuario:', item)
                }
            }
        }
    ]

    const pageActions = (
        <AddButton onClick={() => console.log('Agregar nuevo usuario')}>
            Nuevo Usuario
        </AddButton>
    )

    if (loading) {
        return (
            <AdminLayout>
                <PageContainer
                    title="Lista de Usuarios"
                    breadcrumbItems={breadcrumbItems}
                    actions={pageActions}
                >
                    <LoadingState
                        message="Cargando usuarios..."
                        fullPage={true}
                    />
                </PageContainer>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <PageContainer
                title="Lista de Usuarios"
                breadcrumbItems={breadcrumbItems}
                actions={pageActions}
            >
                {/* Mensaje de error si existe */}
                {error && (
                    <div className="alert alert-warning mb-3">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error} - Mostrando datos de ejemplo
                    </div>
                )}

                {/* Panel de filtros */}
                <FilterPanel
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Buscar por DNI, nombre, email o rol..."
                    filters={filterConfig}
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
                    actions={filterActions}
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
                            <div className="d-flex gap-2">
                                <DeleteButton
                                    variant="danger"
                                    size="sm"
                                    onClick={() => console.log('Eliminar seleccionados:', selectedRows)}
                                    confirmMessage={`¿Eliminar ${selectedRows.length} usuario(s) seleccionado(s)?`}
                                >
                                    Eliminar Seleccionados
                                </DeleteButton>
                                <ExportButton
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => console.log('Exportar seleccionados:', selectedRows)}
                                >
                                    Exportar Seleccionados
                                </ExportButton>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabla mejorada */}
                <DataTable
                    data={filteredUsuarios}
                    columns={columns}
                    actions={tableActions}
                    loading={loading}
                    selectable={true}
                    selectedRows={selectedRows}
                    onSelectionChange={setSelectedRows}
                    pageSize={10}
                    showPagination={true}
                    pageSizeOptions={[5, 10, 25, 50]}
                    emptyMessage="No se encontraron usuarios"
                    emptyIcon="fas fa-users"
                    hover={true}
                    striped={true}
                />
            </PageContainer>
        </AdminLayout>
    )
}

export default ListaUsuarios 