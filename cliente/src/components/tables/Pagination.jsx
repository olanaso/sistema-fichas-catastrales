import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'

const Pagination = ({
    currentPage = 1,
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 25, 50, 100],
    showPageSize = true,
    showInfo = true,
    maxVisiblePages = 5,
    className = '',
    size = 'sm',
    variant = 'outline-secondary',
    activeVariant = 'primary',
    ...props
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange && onPageChange(page)
        }
    }

    const handlePageSizeChange = (newSize) => {
        onPageSizeChange && onPageSizeChange(parseInt(newSize))
    }

    const renderPaginationButtons = () => {
        if (totalPages <= 1) return null

        const buttons = []
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        // Botón Primera página
        if (startPage > 1) {
            buttons.push(
                <Button
                    key="first"
                    variant={variant}
                    size={size}
                    onClick={() => handlePageChange(1)}
                    className="me-1"
                    disabled={currentPage === 1}
                >
                    <i className="fas fa-angle-double-left"></i>
                </Button>
            )
        }

        // Botón Anterior
        buttons.push(
            <Button
                key="prev"
                variant={variant}
                size={size}
                onClick={() => handlePageChange(currentPage - 1)}
                className="me-1"
                disabled={currentPage === 1}
            >
                <i className="fas fa-angle-left"></i>
            </Button>
        )

        // Páginas numeradas
        for (let page = startPage; page <= endPage; page++) {
            buttons.push(
                <Button
                    key={page}
                    variant={page === currentPage ? activeVariant : variant}
                    size={size}
                    onClick={() => handlePageChange(page)}
                    className="me-1"
                >
                    {page}
                </Button>
            )
        }

        // Botón Siguiente
        buttons.push(
            <Button
                key="next"
                variant={variant}
                size={size}
                onClick={() => handlePageChange(currentPage + 1)}
                className="me-1"
                disabled={currentPage === totalPages}
            >
                <i className="fas fa-angle-right"></i>
            </Button>
        )

        // Botón Última página
        if (endPage < totalPages) {
            buttons.push(
                <Button
                    key="last"
                    variant={variant}
                    size={size}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <i className="fas fa-angle-double-right"></i>
                </Button>
            )
        }

        return buttons
    }

    // No mostrar paginación si no hay elementos
    if (totalItems === 0) return null

    return (
        <div className={`d-flex justify-content-between align-items-center ${className}`} {...props}>
            {/* Información y selector de tamaño de página */}
            <div className="d-flex align-items-center gap-3">
                {showPageSize && (
                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">Mostrar:</span>
                        <Form.Select
                            size={size}
                            value={itemsPerPage}
                            onChange={(e) => handlePageSizeChange(e.target.value)}
                            style={{ width: 'auto', minWidth: '70px' }}
                        >
                            {pageSizeOptions.map(sizeOption => (
                                <option key={sizeOption} value={sizeOption}>
                                    {sizeOption}
                                </option>
                            ))}
                        </Form.Select>
                        <span className="text-muted small">por página</span>
                    </div>
                )}

                {showInfo && (
                    <span className="text-muted small">
                        Mostrando {startItem}-{endItem} de {totalItems} registros
                    </span>
                )}
            </div>

            {/* Botones de paginación */}
            <div className="d-flex align-items-center gap-2">
                {totalPages > 1 && (
                    <>
                        <span className="text-muted small me-2">
                            Página {currentPage} de {totalPages}
                        </span>
                        <div className="d-flex">
                            {renderPaginationButtons()}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

// Componente simple solo con botones de paginación
export const SimplePagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    maxVisiblePages = 5,
    size = 'sm',
    variant = 'outline-secondary',
    activeVariant = 'primary',
    className = '',
    ...props
}) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange && onPageChange(page)
        }
    }

    if (totalPages <= 1) return null

    const buttons = []
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Botón Anterior
    buttons.push(
        <Button
            key="prev"
            variant={variant}
            size={size}
            onClick={() => handlePageChange(currentPage - 1)}
            className="me-1"
            disabled={currentPage === 1}
        >
            Anterior
        </Button>
    )

    // Páginas numeradas
    for (let page = startPage; page <= endPage; page++) {
        buttons.push(
            <Button
                key={page}
                variant={page === currentPage ? activeVariant : variant}
                size={size}
                onClick={() => handlePageChange(page)}
                className="me-1"
            >
                {page}
            </Button>
        )
    }

    // Botón Siguiente
    buttons.push(
        <Button
            key="next"
            variant={variant}
            size={size}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            Siguiente
        </Button>
    )

    return (
        <div className={`d-flex justify-content-center ${className}`} {...props}>
            {buttons}
        </div>
    )
}

export default Pagination 