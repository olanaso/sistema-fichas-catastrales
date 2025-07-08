import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
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
import { fichasCatastralesService } from '../api/fichasCatastralesService'
import {
    getFichasTableActions,
    getFichasTableColumns,
    getFichasFilterConfig,
    getFichasFilterActions
} from '../components'

const ListaFichas = () => {
    const [fichas, setFichas] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilters, setActiveFilters] = useState({})
    const [error, setError] = useState('')
    const [selectedRows, setSelectedRows] = useState([])

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
                        fecha: '2024-01-15',
                        superficie: '120.50'
                    },
                    {
                        id: 2,
                        codigo: 'FIC-002',
                        direccion: 'Calle Secundaria 456',
                        propietario: 'María García',
                        tipo: 'Comercial',
                        estado: 'Pendiente',
                        fecha: '2024-01-20',
                        superficie: '85.75'
                    },
                    {
                        id: 3,
                        codigo: 'FIC-003',
                        direccion: 'Jr. Los Olivos 789',
                        propietario: 'Carlos López',
                        tipo: 'Industrial',
                        estado: 'Verificado',
                        fecha: '2024-01-10',
                        superficie: '250.00'
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

    // Filtrar fichas basado en búsqueda y filtros
    const filteredFichas = fichas.filter(ficha => {
        // Filtro de búsqueda
        const matchesSearch = !searchTerm ||
            ficha.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ficha.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ficha.propietario.toLowerCase().includes(searchTerm.toLowerCase())

        // Filtros adicionales
        const matchesTipo = !activeFilters.tipo || ficha.tipo === activeFilters.tipo
        const matchesEstado = !activeFilters.estado || ficha.estado === activeFilters.estado

        return matchesSearch && matchesTipo && matchesEstado
    })

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

    // Configuraciones importadas desde componentes separados
    const filterConfig = getFichasFilterConfig()
    const filterActions = getFichasFilterActions(loadFichasData, loading, filteredFichas)
    const columns = getFichasTableColumns()
    const tableActions = getFichasTableActions()

    if (loading) {
        return (
            <AdminLayout>
                <PageContainer
                    title="Lista de Fichas Catastrales"
                    breadcrumbItems={breadcrumbItems}
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
                    searchPlaceholder="Buscar por código, dirección o propietario..."
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
                                {selectedRows.length} ficha(s) seleccionada(s)
                            </span>
                            <div className="d-flex gap-2">
                                <ExportButton
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => console.log('Exportar seleccionadas:', selectedRows)}
                                >
                                    Exportar Seleccionadas
                                </ExportButton>
                                <DeleteButton
                                    variant="danger"
                                    size="sm"
                                    onClick={() => console.log('Eliminar seleccionadas:', selectedRows)}
                                    confirmMessage={`¿Eliminar ${selectedRows.length} ficha(s) seleccionada(s)?`}
                                >
                                    Eliminar Seleccionadas
                                </DeleteButton>
                            </div>
                        </div>
                    </div>
                )}

                {/* Card con tabla y botón agregar */}
                <Card className="shadow-sm border-0">
                    {/* Header del card con botón agregar */}
                    <Card.Header className="bg-white border-bottom">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 text-muted">
                                <i className="fas fa-file-alt me-2"></i>
                                Listado ({filteredFichas.length})
                            </h6>
                            <AddButton
                                size="sm"
                                onClick={() => console.log('Crear nueva ficha')}
                            >
                                Agregar
                            </AddButton>
                        </div>
                    </Card.Header>

                    {/* Cuerpo del card con la tabla */}
                    <Card.Body className="p-0">
                        <DataTable
                            data={filteredFichas}
                            columns={columns}
                            actions={tableActions}
                            loading={loading}
                            selectable={true}
                            selectedRows={selectedRows}
                            onSelectionChange={setSelectedRows}
                            pageSize={10}
                            showPagination={true}
                            pageSizeOptions={[5, 10, 25, 50]}
                            emptyMessage="No se encontraron fichas catastrales"
                            emptyIcon="fas fa-file-alt"
                            hover={true}
                            striped={true}
                        />
                    </Card.Body>
                </Card>
            </PageContainer>
        </AdminLayout>
    )
}

export default ListaFichas 