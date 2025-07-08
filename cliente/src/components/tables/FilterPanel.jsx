import React, { useState } from 'react'
import { Card, Row, Col, Form, Button, Badge, Collapse } from 'react-bootstrap'
import { FilterButton } from '../buttons'

const FilterPanel = ({
    // Búsqueda
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Buscar...',
    searchIcon = 'fas fa-search',

    // Filtros
    filters = [],
    activeFilters = {},
    onFilterChange,

    // Configuración
    collapsible = true,
    defaultExpanded = false,
    showClearAll = true,

    // Estilos
    className = '',
    variant = 'light',

    // Acciones adicionales
    actions = [],

    ...props
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded)

    const handleFilterChange = (filterKey, value) => {
        if (onFilterChange) {
            onFilterChange({
                ...activeFilters,
                [filterKey]: value
            })
        }
    }

    const handleClearAll = () => {
        if (onFilterChange) {
            onFilterChange({})
        }
    }

    const activeFilterCount = Object.values(activeFilters).filter(value =>
        value !== '' && value !== null && value !== undefined
    ).length

    const renderFilter = (filter) => {
        const value = activeFilters[filter.key] || ''

        switch (filter.type) {
            case 'text':
                return (
                    <Form.Control
                        type="text"
                        placeholder={filter.placeholder}
                        value={value}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        size="sm"
                    />
                )

            case 'select':
                return (
                    <Form.Select
                        value={value}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        size="sm"
                    >
                        <option value="">{filter.placeholder || 'Seleccionar...'}</option>
                        {filter.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                )

            case 'date':
                return (
                    <Form.Control
                        type="date"
                        value={value}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        size="sm"
                    />
                )

            case 'dateRange':
                return (
                    <Row className="g-1">
                        <Col>
                            <Form.Control
                                type="date"
                                placeholder="Desde"
                                value={value?.start || ''}
                                onChange={(e) => handleFilterChange(filter.key, {
                                    ...value,
                                    start: e.target.value
                                })}
                                size="sm"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                placeholder="Hasta"
                                value={value?.end || ''}
                                onChange={(e) => handleFilterChange(filter.key, {
                                    ...value,
                                    end: e.target.value
                                })}
                                size="sm"
                            />
                        </Col>
                    </Row>
                )

            case 'number':
                return (
                    <Form.Control
                        type="number"
                        placeholder={filter.placeholder}
                        value={value}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        size="sm"
                    />
                )

            case 'multiSelect':
                return (
                    <Form.Select
                        multiple
                        value={Array.isArray(value) ? value : []}
                        onChange={(e) => {
                            const selectedValues = Array.from(e.target.selectedOptions, option => option.value)
                            handleFilterChange(filter.key, selectedValues)
                        }}
                        size="sm"
                        style={{ height: '80px' }}
                    >
                        {filter.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                )

            default:
                return null
        }
    }

    return (
        <Card className={`shadow-sm border-0 mb-3 ${className}`} {...props}>
            <Card.Body className={`bg-${variant}`}>
                {/* Barra de búsqueda y controles principales */}
                <Row className="align-items-center mb-3">
                    <Col md={6}>
                        <div className="position-relative">
                            <Form.Control
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                                className="ps-5"
                            />
                            <i
                                className={`${searchIcon} position-absolute top-50 start-0 translate-middle-y ms-3 text-muted`}
                            ></i>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex justify-content-end gap-2">
                            {/* Botón de filtros */}
                            {collapsible && filters.length > 0 && (
                                <div className="position-relative">
                                    <FilterButton
                                        active={expanded}
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        Filtros
                                    </FilterButton>
                                    {activeFilterCount > 0 && (
                                        <Badge
                                            bg="danger"
                                            className="position-absolute top-0 start-100 translate-middle"
                                            style={{ fontSize: '0.6em' }}
                                        >
                                            {activeFilterCount}
                                        </Badge>
                                    )}
                                </div>
                            )}

                            {/* Acciones adicionales */}
                            {actions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant={action.variant || 'outline-secondary'}
                                    size="md"
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                    className="d-flex align-items-center gap-2"
                                >
                                    {action.icon && <i className={action.icon}></i>}
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>

                {/* Panel de filtros colapsable */}
                {filters.length > 0 && (
                    <Collapse in={!collapsible || expanded}>
                        <div>
                            <hr className="my-3" />
                            <Row className="g-3">
                                {filters.map((filter) => (
                                    <Col key={filter.key} xs={12} sm={6} md={4} lg={3}>
                                        <Form.Group>
                                            <Form.Label className="small fw-semibold text-muted">
                                                {filter.label}
                                            </Form.Label>
                                            {renderFilter(filter)}
                                        </Form.Group>
                                    </Col>
                                ))}

                                {/* Botón limpiar filtros */}
                                {showClearAll && activeFilterCount > 0 && (
                                    <Col xs={12} className="d-flex justify-content-end">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleClearAll}
                                            className="d-flex align-items-center gap-2"
                                        >
                                            <i className="fas fa-times"></i>
                                            Limpiar filtros
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </Collapse>
                )}

                {/* Mostrar filtros activos como badges */}
                {activeFilterCount > 0 && (
                    <div className="mt-3">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span className="small text-muted">Filtros activos:</span>
                            {Object.entries(activeFilters).map(([key, value]) => {
                                if (!value || value === '') return null

                                const filter = filters.find(f => f.key === key)
                                if (!filter) return null

                                let displayValue = value
                                if (filter.type === 'select' && filter.options) {
                                    const option = filter.options.find(opt => opt.value === value)
                                    displayValue = option ? option.label : value
                                } else if (filter.type === 'dateRange' && value.start && value.end) {
                                    displayValue = `${value.start} - ${value.end}`
                                } else if (Array.isArray(value)) {
                                    displayValue = value.length > 1 ? `${value.length} seleccionados` : value[0]
                                }

                                return (
                                    <Badge
                                        key={key}
                                        bg="primary"
                                        className="d-flex align-items-center gap-1"
                                    >
                                        <span className="small">{filter.label}: {displayValue}</span>
                                        <i
                                            className="fas fa-times cursor-pointer"
                                            onClick={() => handleFilterChange(key, '')}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </Badge>
                                )
                            })}
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default FilterPanel 