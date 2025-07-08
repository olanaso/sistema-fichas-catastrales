import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { AdminLayout, PageContainer, DataTable, SearchFilters, LoadingState } from '../../../components'
import { useApi } from '../../../hooks/useApi'
import { fichasCatastralesService } from '../api/fichasCatastralesService'

const ListaFichas = () => {
    const [fichas, setFichas] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')

    // Hook para cargar fichas
    const { execute: loadFichas, loading: loadingFichas } = useApi(fichasCatastralesService.getAll)

    useEffect(() => {
        loadFichasData()
    }, [])

    const loadFichasData = async () => {
        try {
            setLoading(true)
            setError('')
            
            const result = await loadFichas()
            if (result.success) {
                setFichas(result.data || [])
            } else {
                setError(result.error || 'Error al cargar fichas')
                // Datos de respaldo para desarrollo
                setFichas([
                    {
                        id: 1,
                        codigo: 'FIC-001',
                        direccion: 'Av. Principal 123',
                        propietario: 'Juan Pérez',
                        tipo: 'Residencial',
                        estado: 'Activo',
                        fecha: '2024-01-15'
                    },
                    {
                        id: 2,
                        codigo: 'FIC-002',
                        direccion: 'Calle Secundaria 456',
                        propietario: 'María García',
                        tipo: 'Comercial',
                        estado: 'Pendiente',
                        fecha: '2024-01-20'
                    }
                ])
            }
        } catch (err) {
            setError('Error de conexión al servidor')
            console.error('Error al cargar fichas:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredFichas = fichas.filter(ficha =>
        ficha.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ficha.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ficha.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const breadcrumbItems = [
        {
            label: 'Inicio',
            href: '/inicio'
        },
        {
            label: 'Fichas Catastrales',
            href: '/fichas'
        },
        {
            label: 'Lista de Fichas'
        }
    ]

    const pageActions = (
        <Button variant="primary" href="/fichas/crear">
            <i className="fas fa-plus me-2"></i>
            Nueva Ficha
        </Button>
    )

    const columns = [
        {
            key: 'codigo',
            label: 'Código',
            render: (value) => <strong className="text-primary">{value}</strong>
        },
        {
            key: 'direccion',
            label: 'Dirección'
        },
        {
            key: 'propietario',
            label: 'Propietario'
        },
        {
            key: 'tipo',
            label: 'Tipo'
        },
        {
            key: 'estado',
            label: 'Estado',
            type: 'badge',
            getVariant: (value) => value === 'Activo' ? 'success' : 'warning'
        },
        {
            key: 'fecha',
            label: 'Fecha'
        }
    ]

    const tableActions = [
        {
            icon: 'fas fa-eye',
            variant: 'outline-primary',
            title: 'Ver',
            onClick: (item) => window.location.href = `/fichas/ver/${item.id}`
        },
        {
            icon: 'fas fa-edit',
            variant: 'outline-secondary',
            title: 'Editar',
            onClick: (item) => window.location.href = `/fichas/editar/${item.id}`
        },
        {
            icon: 'fas fa-trash',
            variant: 'outline-danger',
            title: 'Eliminar',
            onClick: (item) => {
                if (window.confirm('¿Está seguro de eliminar esta ficha?')) {
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
                    title="Lista de Fichas Catastrales"
                    breadcrumbItems={breadcrumbItems}
                    actions={pageActions}
                >
                    <LoadingState 
                        message="Cargando fichas catastrales..."
                        fullPage={true}
                    />
                </PageContainer>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <PageContainer 
                title="Lista de Fichas Catastrales"
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
                    searchPlaceholder="Buscar por código, dirección o propietario..."
                    actions={searchActions}
                />

                <DataTable
                    data={filteredFichas}
                    columns={columns}
                    actions={tableActions}
                    emptyMessage="No se encontraron fichas"
                    emptyIcon="fas fa-search"
                />
            </PageContainer>
        </AdminLayout>
    )
}

export default ListaFichas 