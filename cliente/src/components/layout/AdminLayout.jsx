import React from 'react'
import BaseLayout from './BaseLayout'

const AdminLayout = ({ children, ...props }) => {
    // Menú de administrador
    const adminMenuItems = [
        {
            id: 'inicio',
            label: 'Inicio',
            icon: 'fas fa-home',
            path: '/inicio'
        },
        {
            id: 'fichas',
            label: 'Fichas Catastrales',
            icon: 'fas fa-file-alt',
            children: [
                { id: 'fichas-lista', label: 'Lista', path: '/fichas/lista' },
                { id: 'fichas-crear', label: 'Crear', path: '/fichas/crear' },
                { id: 'fichas-buscar', label: 'Buscar', path: '/fichas/buscar' }
            ]
        },
        {
            id: 'usuarios',
            label: 'Usuarios',
            icon: 'fas fa-users',
            requiredRoles: ['admin'],
            children: [
                { id: 'usuarios-lista', label: 'Lista', path: '/usuarios/lista' },
                { id: 'usuarios-crear', label: 'Crear', path: '/usuarios/crear' },
                { id: 'usuarios-roles', label: 'Roles', path: '/usuarios/roles' }
            ]
        },
        {
            id: 'reportes',
            label: 'Reportes',
            icon: 'fas fa-chart-bar',
            children: [
                { id: 'reportes-dashboard', label: 'Dashboard', path: '/reportes/dashboard' },
                { id: 'reportes-fichas', label: 'Fichas', path: '/reportes/fichas' },
                { id: 'reportes-actividad', label: 'Actividad', path: '/reportes/actividad' }
            ]
        },
        {
            id: 'configuracion',
            label: 'Configuración',
            icon: 'fas fa-cogs',
            requiredRoles: ['admin'],
            children: [
                { id: 'config-sistema', label: 'Sistema', path: '/configuracion/sistema' },
                { id: 'config-backup', label: 'Backup', path: '/configuracion/backup' },
                { id: 'config-logs', label: 'Logs', path: '/configuracion/logs' }
            ]
        }
    ]

    return (
        <BaseLayout 
            menuItems={adminMenuItems}
            {...props}
        >
            {children}
        </BaseLayout>
    )
}

export default AdminLayout 