import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { AdminLayout, PageContainer, DataTable, SearchFilters, LoadingState } from '../../../components'
import { useApi } from '../../../hooks/useApi'
import { usuariosService } from '../api/usuariosService'

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')

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
                        nombre: 'Juan Pérez',
                        email: 'juan@example.com',
                        rol: 'admin',
                        estado: 'Activo',
                        ultimoAcceso: '2024-01-15 14:30',
                        fechaCreacion: '2024-01-01'
                    },
                    {
                        id: 2,
                        nombre: 'María García',
                        email: 'maria@example.com',
                        rol: 'user',
                        estado: 'Activo',
                        ultimoAcceso: '2024-01-14 09:15',
                        fechaCreacion: '2024-01-05'
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

    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
    )

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

    const pageActions = (
        <Button variant="primary" href="/usuarios/crear">
            <i className="fas fa-user-plus me-2"></i>
            Nuevo Usuario
        </Button>
    )

    const columns = [
        {
            key: 'usuario',
            label: 'Usuario',
            render: (value, item) => (
                <div className="d-flex align-items-center">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: '40px', height: '40px' }}>
                        <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <strong className="text-dark">{item.nombre}</strong>
                    </div>
                </div>
            )
        },
        {
            key: 'email',
            label: 'Email'
        },
        {
            key: 'rol',
            label: 'Rol',
            type: 'badge',
            getVariant: (value) => value === 'admin' ? 'primary' : 'info',
            render: (value) => value === 'admin' ? 'Administrador' : 'Usuario'
        },
        {
            key: 'estado',
            label: 'Estado',
            type: 'badge',
            getVariant: (value) => value === 'Activo' ? 'success' : 'secondary'
        },
        {
            key: 'ultimoAcceso',
            label: 'Último Acceso',
            render: (value) => <small className="text-muted">{value}</small>
        },
        {
            key: 'fechaCreacion',
            label: 'Fecha Creación',
            render: (value) => <small className="text-muted">{value}</small>
        }
    ]

    const tableActions = [
        {
            icon: 'fas fa-eye',
            variant: 'outline-primary',
            title: 'Ver',
            onClick: (item) => window.location.href = `/usuarios/ver/${item.id}`
        },
        {
            icon: 'fas fa-edit',
            variant: 'outline-secondary',
            title: 'Editar',
            onClick: (item) => window.location.href = `/usuarios/editar/${item.id}`
        },
        {
            icon: 'fas fa-trash',
            variant: 'outline-danger',
            title: 'Eliminar',
            onClick: (item) => {
                if (window.confirm('¿Está seguro de eliminar este usuario?')) {
                    console.log('Eliminar:', item)
                }
            }
        }
    ]

    const searchActions = [
        {
            label: 'Filtros',
            icon: 'fas fa-filter',
            onClick: () => console.log('Filtros')
        },
        {
            label: 'Exportar',
            icon: 'fas fa-download',
            variant: 'outline-primary',
            onClick: () => console.log('Exportar')
        }
    ]

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
                {error && (
                    <div className="alert alert-warning">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error} - Mostrando datos de ejemplo
                    </div>
                )}

                <SearchFilters
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Buscar por nombre, email o rol..."
                    actions={searchActions}
                />

                <DataTable
                    data={filteredUsuarios}
                    columns={columns}
                    actions={tableActions}
                    emptyMessage="No se encontraron usuarios"
                    emptyIcon="fas fa-users"
                />
            </PageContainer>
        </AdminLayout>
    )
}

export default ListaUsuarios 