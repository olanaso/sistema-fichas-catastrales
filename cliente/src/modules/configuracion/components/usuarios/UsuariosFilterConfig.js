// Configuración de filtros para usuarios
export const getUsuariosFilterConfig = (roles = []) => [
    {
        key: 'rolId',
        label: 'Rol',
        type: 'select',
        options: [
            { value: '', label: 'Todos los roles' },
            ...roles.map(rol => ({
                value: rol.id,
                label: rol.rol
            }))
        ]
    },
    {
        key: 'estado',
        label: 'Estado',
        type: 'select',
        options: [
            { value: '', label: 'Todos los estados' },
            { value: true, label: 'Activo' },
            { value: false, label: 'Inactivo' }
        ]
    }
] 