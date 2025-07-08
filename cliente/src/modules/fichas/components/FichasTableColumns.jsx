import React from 'react'

// Configuración de columnas para la tabla de fichas catastrales
export const getFichasTableColumns = () => [
    {
        key: 'codigo',
        label: 'Código',
        width: '120px',
        render: (value) => <strong className="text-primary">{value}</strong>
    },
    {
        key: 'direccion',
        label: 'Dirección',
        width: '250px'
    },
    {
        key: 'propietario',
        label: 'Propietario',
        width: '180px'
    },
    {
        key: 'tipo',
        label: 'Tipo',
        width: '120px',
        type: 'badge',
        getVariant: (value) => {
            const variants = {
                'Residencial': 'primary',
                'Comercial': 'success',
                'Industrial': 'warning',
                'Rural': 'info'
            }
            return variants[value] || 'secondary'
        }
    },
    {
        key: 'superficie',
        label: 'Superficie (m²)',
        width: '130px',
        render: (value) => `${value} m²`
    },
    {
        key: 'estado',
        label: 'Estado',
        width: '100px',
        type: 'badge',
        getVariant: (value) => {
            const variants = {
                'Activo': 'success',
                'Pendiente': 'warning',
                'Verificado': 'info',
                'Inactivo': 'secondary'
            }
            return variants[value] || 'secondary'
        }
    },
    {
        key: 'fecha',
        label: 'Fecha',
        width: '100px',
        render: (value) => new Date(value).toLocaleDateString()
    }
] 