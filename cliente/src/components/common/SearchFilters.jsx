import React from 'react'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'

const SearchFilters = ({ 
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Buscar...',
    filters = [],
    actions = [],
    className = "",
    ...props 
}) => {
    return (
        <Row className={`mb-4 ${className}`} {...props}>
            <Col md={6}>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="fas fa-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />
                </InputGroup>
            </Col>
            
            {/* Filtros adicionales */}
            {filters.map((filter, index) => (
                <Col key={index} md={filter.width || 3}>
                    {filter.type === 'select' ? (
                        <Form.Select 
                            value={filter.value} 
                            onChange={(e) => filter.onChange && filter.onChange(e.target.value)}
                        >
                            <option value="">{filter.placeholder}</option>
                            {filter.options.map((option, optIndex) => (
                                <option key={optIndex} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    ) : (
                        <Form.Control
                            type={filter.type || 'text'}
                            placeholder={filter.placeholder}
                            value={filter.value}
                            onChange={(e) => filter.onChange && filter.onChange(e.target.value)}
                        />
                    )}
                </Col>
            ))}
            
            {/* Acciones */}
            {actions.length > 0 && (
                <Col md={6}>
                    <div className="d-flex gap-2">
                        {actions.map((action, index) => (
                            <Button 
                                key={index}
                                variant={action.variant || 'outline-secondary'}
                                onClick={action.onClick}
                            >
                                {action.icon && <i className={`${action.icon} me-2`}></i>}
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </Col>
            )}
        </Row>
    )
}

export default SearchFilters 