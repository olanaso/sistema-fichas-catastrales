import React from 'react'
import BaseLayout from './BaseLayout'

const AdminLayout = ({ children, ...props }) => {
    // Menú de administrador
    const adminMenuItems = [
        {
            id: 'inicio',
            title: 'Inicio',
            icon: 'fas fa-home',
            path: '/inicio'
        },
        {
            id: 'fichas',
            title: 'Fichas Catastrales',
            icon: 'fas fa-file-alt',
            children: [
                { id: 'fichas-lista', title: 'Lista', path: '/fichas/lista' },
                { id: 'fichas-crear', title: 'Crear', path: '/fichas/crear' },
                { id: 'fichas-buscar', title: 'Buscar', path: '/fichas/buscar' }
            ]
        },
        {
            id: 'usuarios',
            title: 'Usuarios',
            icon: 'fas fa-users',
            roles: ['admin'],
            children: [
                { id: 'usuarios-lista', title: 'Lista', path: '/usuarios/lista' },
                { id: 'usuarios-crear', title: 'Crear', path: '/usuarios/crear' },
                { id: 'usuarios-roles', title: 'Roles', path: '/usuarios/roles' }
            ]
        },
        {
            id: 'reportes',
            title: 'Reportes',
            icon: 'fas fa-chart-bar',
            children: [
                { id: 'reportes-dashboard', title: 'Dashboard', path: '/reportes/dashboard' },
                { id: 'reportes-fichas', title: 'Fichas', path: '/reportes/fichas' },
                { id: 'reportes-actividad', title: 'Actividad', path: '/reportes/actividad' }
            ]
        },
        {
            id: 'configuracion',
            title: 'Configuración',
            icon: 'fas fa-cogs',
            roles: ['admin'],
            children: [
                { id: 'config-sistema', title: 'Sistema', path: '/configuracion/sistema' },
                { id: 'config-backup', title: 'Backup', path: '/configuracion/backup' },
                { id: 'config-logs', title: 'Logs', path: '/configuracion/logs' }
            ]
        }
    ]

    return (
        <BaseLayout menuItems={adminMenuItems} {...props}>
            {children}
        </BaseLayout>
    )
}

export default AdminLayout 