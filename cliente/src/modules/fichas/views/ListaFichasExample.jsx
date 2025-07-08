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
    CreateModal,
    EditModal,
    DeleteModal,
    useToast
} from '../../../components'
import { useApi } from '../../../hooks/useApi'
import { fichasCatastralesService } from '../api/fichasCatastralesService'
import {
    getFichasTableActions,
    getFichasTableColumns,
    getFichasFilterConfig,
    getFichasFilterActions,
    fichasValidationSchema,
    validateFichaField,
    validateFichaForm,
    getFichasModalFields
} from '../components'

const ListaFichasExample = () => {
    const [fichas, setFichas] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilters, setActiveFilters] = useState({})
    const [error, setError] = useState('')
    const [selectedRows, setSelectedRows] = useState([])

    // Estados para modales
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

    // Hook para alertas
    const { showSuccess, showError, showInfo } = useToast()

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
                showInfo('Fichas cargadas correctamente')
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
                showInfo('Usando datos de ejemplo')
            }
        } catch (err) {
            setError('Error de conexión al servidor')
            showError('No se pudo conectar al servidor')
            console.error('Error al cargar fichas:', err)
        } finally {
            setLoading(false)
        }
    }

    // Filtrar fichas basado en búsqueda y filtros
    const filteredFichas = fichas.filter(ficha => {
        const matchesSearch = !searchTerm ||
            ficha.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ficha.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ficha.propietario.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesTipo = !activeFilters.tipo || ficha.tipo === activeFilters.tipo
        const matchesEstado = !activeFilters.estado || ficha.estado === activeFilters.estado

        return matchesSearch && matchesTipo && matchesEstado
    })

    // Manejar creación de ficha
    const handleCreateSave = async (formData) => {
        setModalLoading(true)
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Agregar nueva ficha a la lista
            const newFicha = {
                ...formData,
                id: Date.now(),
                fecha: formData.fecha || new Date().toISOString().split('T')[0]
            }

            setFichas(prev => [...prev, newFicha])
            return true // Éxito
        } catch (error) {
            throw error
        } finally {
            setModalLoading(false)
        }
    }

    // Manejar edición de ficha
    const handleEditSave = async (changedData, fullData) => {
        setModalLoading(true)
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Actualizar ficha en la lista
            setFichas(prev => prev.map(ficha =>
                ficha.id === fullData.id ? { ...ficha, ...changedData } : ficha
            ))

            return true // Éxito
        } catch (error) {
            throw error
        } finally {
            setModalLoading(false)
        }
    }

    // Manejar eliminación de ficha
    const handleDelete = async () => {
        setModalLoading(true)
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Eliminar ficha de la lista
            setFichas(prev => prev.filter(ficha => ficha.id !== selectedItem.id))
            setShowDeleteModal(false)
            setSelectedItem(null)
            showSuccess('Ficha eliminada correctamente')
        } catch (error) {
            showError('Error al eliminar la ficha')
        } finally {
            setModalLoading(false)
        }
    }

    // Configurar acciones de tabla con funciones reales
    const tableActions = [
        {
            icon: 'fas fa-eye',
            variant: 'outline-info',
            title: 'Ver Ficha',
            onClick: (item) => {
                showInfo(`Visualizando ficha: ${item.codigo}`)
            }
        },
        {
            icon: 'fas fa-edit',
            variant: 'outline-primary',
            title: 'Editar Ficha',
            onClick: (item) => {
                setSelectedItem(item)
                setShowEditModal(true)
            }
        },
        {
            icon: 'fas fa-file-pdf',
            variant: 'outline-danger',
            title: 'Generar PDF',
            onClick: (item) => {
                showInfo(`Generando PDF para: ${item.codigo}`)
            }
        },
        {
            icon: 'fas fa-map-marker-alt',
            variant: 'outline-success',
            title: 'Ver en Mapa',
            onClick: (item) => {
                showInfo(`Mostrando en mapa: ${item.direccion}`)
            }
        },
        {
            icon: 'fas fa-trash',
            variant: 'outline-danger',
            title: 'Eliminar Ficha',
            onClick: (item) => {
                setSelectedItem(item)
                setShowDeleteModal(true)
            }
        }
    ]

    const breadcrumbItems = [
        { label: 'Inicio', href: '/inicio' },
        { label: 'Fichas Catastrales', href: '/fichas' },
        { label: 'Lista de Fichas' }
    ]

    // Configuraciones importadas desde componentes separados
    const filterConfig = getFichasFilterConfig()
    const filterActions = getFichasFilterActions(loadFichasData, loading, filteredFichas)
    const columns = getFichasTableColumns()
    const modalFields = getFichasModalFields()

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
                                    onClick={() => showInfo('Exportando fichas seleccionadas')}
                                >
                                    Exportar Seleccionadas
                                </ExportButton>
                                <DeleteButton
                                    variant="danger"
                                    size="sm"
                                    onClick={() => showInfo('Eliminando fichas seleccionadas')}
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
                    <Card.Header className="bg-white border-bottom">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 text-muted">
                                <i className="fas fa-file-alt me-2"></i>
                                Fichas Catastrales ({filteredFichas.length})
                            </h6>
                            <AddButton
                                size="sm"
                                onClick={() => setShowCreateModal(true)}
                            >
                                Agregar
                            </AddButton>
                        </div>
                    </Card.Header>

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

                {/* Modal de Crear Ficha */}
                <CreateModal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    onSave={handleCreateSave}
                    title="Crear Nueva Ficha Catastral"
                    fields={modalFields}
                    loading={modalLoading}
                    validationSchema={fichasValidationSchema}
                    validateField={validateFichaField}
                    validateForm={validateFichaForm}
                    size="lg"
                />

                {/* Modal de Editar Ficha */}
                <EditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    onSave={handleEditSave}
                    title="Editar Ficha Catastral"
                    fields={modalFields.map(field => 
                        field.key === 'codigo' 
                            ? { ...field, readOnly: true }
                            : field
                    )}
                    loading={modalLoading}
                    initialData={selectedItem}
                    validationSchema={fichasValidationSchema}
                    validateField={validateFichaField}
                    validateForm={validateFichaForm}
                    size="lg"
                />

                {/* Modal de Eliminar Ficha */}
                <DeleteModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    title="Eliminar Ficha Catastral"
                    message="¿Está seguro de que desea eliminar esta ficha catastral?"
                    itemName={`${selectedItem?.codigo} - ${selectedItem?.direccion}`}
                    details={[
                        `Propietario: ${selectedItem?.propietario}`,
                        `Tipo: ${selectedItem?.tipo}`,
                        `Estado: ${selectedItem?.estado}`,
                        `Superficie: ${selectedItem?.superficie} m²`
                    ]}
                    loading={modalLoading}
                />
            </PageContainer>
        </AdminLayout>
    )
}

export default ListaFichasExample 