import React from 'react'
import { Table, Card, Button, Badge, Row, Col } from 'react-bootstrap'

const DataTable = ({ 
    data = [], 
    columns = [],
    loading = false,
    actions = null,
    onRowClick = null,
    responsive = true,
    hover = true,
    bordered = false,
    striped = false,
    className = "",
    emptyMessage = "No hay datos disponibles",
    emptyIcon = "fas fa-inbox",
    ...props 
}) => {
    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item[column.key], item)
        }
        
        if (column.type === 'badge') {
            const variant = column.getVariant ? column.getVariant(item[column.key]) : 'primary'
            return <Badge bg={variant}>{item[column.key]}</Badge>
        }
        
        return item[column.key]
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

    return (
        <Card className={`shadow-sm border-0 ${className}`} {...props}>
            <Card.Body className="p-0">
                {data.length > 0 ? (
                    <Table 
                        responsive={responsive} 
                        hover={hover} 
                        bordered={bordered}
                        striped={striped}
                        className="mb-0"
                    >
                        <thead className="bg-light">
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index} width={column.width}>
                                        {column.label}
                                    </th>
                                ))}
                                {actions && <th width="120">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr 
                                    key={index} 
                                    onClick={() => onRowClick && onRowClick(item)}
                                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex}>
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td>
                                            <div className="d-flex gap-1">
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
                                                    >
                                                        <i className={action.icon}></i>
                                                    </Button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div className="text-center py-5">
                        <i className={`${emptyIcon} text-muted mb-3`} style={{ fontSize: '3rem' }}></i>
                        <h5 className="text-muted">{emptyMessage}</h5>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default DataTable 