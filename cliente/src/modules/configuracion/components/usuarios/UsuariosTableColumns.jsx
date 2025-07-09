import React from 'react'
import { Button } from 'react-bootstrap'

// Configuración de columnas para la tabla de usuarios
export const getUsuariosTableColumns = (onToggleActive) => [
    {
        key: 'dni',
        label: 'DNI',
        width: '120px',
        render: (value) => <strong className="text-primary">{value}</strong>
    },
    {
        key: 'nombres',
        label: 'Nombres y Apellidos',
        width: '250px',
        render: (value, row) => (
            <div>
                <div className="fw-medium">{row.nombres}</div>
                <div className="text-muted small">{row.apellidos}</div>
            </div>
        )
    },
    {
        key: 'rol',
        label: 'Rol',
        width: '150px',
        type: 'badge',
        render: (value, row) => {
            const rol = row.rol?.[0];
            if (!rol) return <span className="text-muted">Sin rol</span>;

            const getVariant = (codigo) => {
                switch (codigo) {
                    case 'ADMIN':
                        return 'danger';
                    case 'SUPERVISOR':
                        return 'warning';
                    case 'INSPECTOR':
                        return 'info';
                    default:
                        return 'secondary';
                }
            };

            return (
                <span className={`badge bg-${getVariant(rol.codigo)}`}>
                    {rol.rol}
                </span>
            );
        }
    },
    {
        key: 'email',
        label: 'Correo',
        width: '200px',
        render: (value) => <span className="text-muted">{value}</span>
    },
    {
        key: 'activo',
        label: 'Estado',
        width: '120px',
        render: (value, row) => (
            <Button
                variant={value ? 'success' : 'secondary'}
                size="sm"
                onClick={() => onToggleActive(row)}
                style={{ minWidth: '80px' }}
            >
                {value ? 'Activo' : 'Inactivo'}
            </Button>
        )
    }
] 