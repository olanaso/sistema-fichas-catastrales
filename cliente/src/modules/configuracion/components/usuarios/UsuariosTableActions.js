// Configuración de acciones para la tabla de usuarios
export const getUsuariosTableActions = (onEdit, onChangePassword, onToggleActive) => [
    {
        key: 'edit',
        label: 'Editar',
        icon: 'fas fa-edit',
        variant: 'outline-primary',
        size: 'sm',
        onClick: (row) => onEdit(row)
    },
    {
        key: 'changePassword',
        label: 'Cambiar Contraseña',
        icon: 'fas fa-key',
        variant: 'outline-warning',
        size: 'sm',
        onClick: (row) => onChangePassword(row)
    },
    {
        key: 'toggleActive',
        label: (row) => row.activo ? 'Desactivar' : 'Activar',
        icon: (row) => row.activo ? 'fas fa-ban' : 'fas fa-check',
        variant: (row) => row.activo ? 'outline-danger' : 'outline-success',
        size: 'sm',
        confirmMessage: (row) => `¿Está seguro de ${row.activo ? 'desactivar' : 'activar'} al usuario ${row.nombres} ${row.apellidos}?`,
        onClick: (row) => onToggleActive(row)
    }
] 