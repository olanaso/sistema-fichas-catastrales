import React from 'react'

// Configuración de columnas para la tabla de roles
export const getRolesTableColumns = () => [
    {
        key: 'rol',
        label: 'Rol',
        width: '200px',
        render: (value) => <strong className="text-primary">{value}</strong>
    },
    {
        key: 'codigo',
        label: 'Código',
        width: '150px',
        render: (value) => <span className="font-monospace text-muted">{value}</span>
    },
    {
        key: 'descripcion',
        label: 'Descripción',
        width: '300px',
        render: (value, row) => {
            // Generar descripción basada en el código
            const getDescripcion = (codigo) => {
                switch (codigo) {
                    case 'ADMIN':
                        return 'Administrador del sistema con acceso completo';
                    case 'SUPERVISOR':
                        return 'Supervisor con permisos de gestión';
                    case 'INSPECTOR':
                        return 'Inspector con permisos de consulta';
                    default:
                        return 'Usuario del sistema';
                }
            };
            
            return (
                <span className="text-muted">{getDescripcion(row.codigo)}</span>
            );
        }
    },
    {
        key: 'estado',
        label: 'Estado',
        width: '100px',
        type: 'badge',
        render: (value) => (
            <span className="badge bg-success">
                Activo
            </span>
        )
    }
] 