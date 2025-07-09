import React, { useState, useMemo } from 'react'
import { Table, Card, Button, Badge, Form, Row, Col } from 'react-bootstrap'

const DataTable = ({
    data = [],
    columns = [],
    loading = false,
    actions = [],
    onRowClick = null,
    responsive = true,
    hover = true,
    striped = true,
    className = "",
    emptyMessage = "No hay datos disponibles",
    emptyIcon = "fas fa-inbox",
    // Paginación
    pageSize = 10,
    showPagination = true,
    pageSizeOptions = [5, 10, 25, 50, 100],
    // Selección
    selectable = false,
    selectedRows = [],
    onSelectionChange = null,
    // Filtrar props personalizadas que no deben ir al DOM
    searchable,
    ...props
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(pageSize)

    // Calcular datos paginados
    const paginatedData = useMemo(() => {
        if (!showPagination) return data

        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return data.slice(startIndex, endIndex)
    }, [data, currentPage, itemsPerPage, showPagination])

    // Calcular información de paginación
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, data.length)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handlePageSizeChange = (newSize) => {
        setItemsPerPage(parseInt(newSize))
        setCurrentPage(1)
    }

    const handleSelectAll = (checked) => {
        if (onSelectionChange) {
            if (checked) {
                const allIds = data.map(item => item.id || item.dni)
                onSelectionChange([...new Set([...selectedRows, ...allIds])])
            } else {
                onSelectionChange([])
            }
        }
    }

    const handleSelectRow = (item, checked) => {
        if (onSelectionChange) {
            const itemId = item.id || item.dni
            if (checked) {
                onSelectionChange([...selectedRows, itemId])
            } else {
                onSelectionChange(selectedRows.filter(id => id !== itemId))
            }
        }
    }

    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item[column.key], item)
        }

        if (column.type === 'badge') {
            const variant = column.getVariant ? column.getVariant(item[column.key]) : 'primary'
            return <Badge bg={variant}>{item[column.key]}</Badge>
        }

        return item[column.key] || '-'
    }

    const renderPagination = () => {
        if (!showPagination || totalPages <= 1) return null

        const pages = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        // Botón Primera página
        if (startPage > 1) {
            pages.push(
                <Button
                    key="first"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    className="me-1"
                >
                    Primero
                </Button>
            )
        }

        // Botón Anterior
        if (currentPage > 1) {
            pages.push(
                <Button
                    key="prev"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="me-1"
                >
                    <i className="fas fa-chevron-left"></i>
                </Button>
            )
        }

        // Páginas numeradas
        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <Button
                    key={page}
                    variant={page === currentPage ? "primary" : "outline-secondary"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="me-1"
                >
                    {page}
                </Button>
            )
        }

        // Botón Siguiente
        if (currentPage < totalPages) {
            pages.push(
                <Button
                    key="next"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="me-1"
                >
                    <i className="fas fa-chevron-right"></i>
                </Button>
            )
        }

        // Botón Última página
        if (endPage < totalPages) {
            pages.push(
                <Button
                    key="last"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className="me-1"
                >
                    Último
                </Button>
            )
        }

        return pages
    }

    if (loading) {
        return (
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p className="text-muted">Cargando datos...</p>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    const allSelected = data.length > 0 && selectedRows.length === data.length
    const someSelected = selectedRows.length > 0 && selectedRows.length < data.length

    return (
        <Card className={`shadow-sm border-0 ${className}`} {...props}>
            <Card.Body className="p-0">
                {data.length > 0 ? (
                    <>
                        <Table
                            responsive={responsive}
                            hover={hover}
                            striped={striped}
                            className="mb-0"
                        >
                            <thead className="bg-light">
                                <tr>
                                    {/* Columna de Acciones */}
                                    {actions.length > 0 ? <th width="140" className="text-center">Acciones</th> : <></>}

                                    {/* Checkbox de selección si está habilitado */}
                                    {selectable && (
                                        <th width="50" className="text-center">
                                            <Form.Check
                                                type="checkbox"
                                                checked={allSelected}
                                                ref={input => {
                                                    if (input) input.indeterminate = someSelected
                                                }}
                                                onChange={(e) => handleSelectAll(e.target.checked)}
                                            />
                                        </th>
                                    )}

                                    {/* Columnas de datos */}
                                    {columns.map((column, index) => (
                                        <th key={index} width={column.width}>
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item, index) => {
                                    const itemId = item.id || item.dni
                                    const isSelected = selectedRows.includes(itemId)

                                    return (
                                        <tr
                                            key={itemId || index}
                                            onClick={() => onRowClick && onRowClick(item)}
                                            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                            className={isSelected ? 'table-primary' : ''}
                                        >
                                            {/* Columna de Acciones */}
                                            {actions.length > 0 && <td className="text-center">
                                                <div className="d-flex gap-1 justify-content-center">
                                                    {actions.map((action, actionIndex) => (
                                                        <Button
                                                            key={actionIndex}
                                                            variant={action.variant || 'outline-primary'}
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                action.onClick(item)
                                                            }}
                                                            title={action.title}
                                                            className="px-2"
                                                        >
                                                            <i className={action.icon || 'fas fa-question'}></i>
                                                        </Button>
                                                    ))}
                                                </div>
                                            </td>}

                                            {/* Checkbox de selección */}
                                            {selectable && (
                                                <td className="text-center">
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={(e) => {
                                                            e.stopPropagation()
                                                            handleSelectRow(item, e.target.checked)
                                                        }}
                                                    />
                                                </td>
                                            )}

                                            {/* Columnas de datos */}
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex}>
                                                    {renderCell(item, column)}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                        {/* Panel de Paginación */}
                        {showPagination && (
                            <div className="bg-light p-3 border-top">
                                <Row className="align-items-center">
                                    <Col sm={6}>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="text-muted small">Mostrar:</span>
                                            <Form.Select
                                                size="sm"
                                                value={itemsPerPage}
                                                onChange={(e) => handlePageSizeChange(e.target.value)}
                                                style={{ width: 'auto' }}
                                            >
                                                {pageSizeOptions.map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-muted small">
                                                registros de {data.length} total
                                            </span>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="d-flex justify-content-end align-items-center gap-2">
                                            <span className="text-muted small">
                                                {startItem}-{endItem} de {data.length}
                                            </span>
                                            <div className="d-flex">
                                                {renderPagination()}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-5">
                        <i className={`${emptyIcon} text-muted mb-3`} style={{ fontSize: '3rem' }}></i>
                        <h5 className="text-muted">{emptyMessage}</h5>
                        <p className="text-muted">No se encontraron registros para mostrar</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default DataTable 