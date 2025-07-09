import React from 'react'
import BaseLayout from './BaseLayout'
import { LuBarcode, LuFileChartColumn, LuHouse, LuSettings, LuUsers } from 'react-icons/lu'

const AdminLayout = ({ children, ...props }) => {
    // Menú de administrador
    const adminMenuItems = [
        {
            id: 'inicio',
            title: 'Inicio',
            icon: <LuHouse />,
            path: '/inicio'
        },
        {
            id: 'fichas',
            title: 'Fichas catastrales',
            icon: <LuFileChartColumn />,
            children: [
                { id: 'fichas-lista', title: 'Gestión de fichas', path: '/fichas/lista' },
                { id: 'fichas-crear', title: 'Migración SICI', path: '/fichas/crear' },
            ]
        },
        {
            id: 'equipos',
            title: 'Equipos y asignaciones',
            icon: <LuUsers />,
            children: [
                { id: 'reportes-dashboard', title: 'Grupos de trabajo', path: '/reportes/dashboard' },
                { id: 'reportes-fichas', title: 'Asignaciones', path: '/reportes/fichas' },
            ]
        },
        {
            id: 'configuracion',
            title: 'Configuración',
            icon: <LuSettings  />,
            children: [
                { id: 'config-sistema', title: 'Parametros', path: '/configuracion/sistema' },
                { id: 'config-backup', title: 'Usuarios', path: '/configuracion/usuarios' },
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