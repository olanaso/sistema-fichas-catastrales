// Configuración de filtros para fichas catastrales
export const getFichasFilterConfig = () => [
    {
        key: 'tipo',
        label: 'Tipo de Predio',
        type: 'select',
        placeholder: 'Seleccionar tipo...',
        options: [
            { value: 'Residencial', label: 'Residencial' },
            { value: 'Comercial', label: 'Comercial' },
            { value: 'Industrial', label: 'Industrial' },
            { value: 'Rural', label: 'Rural' }
        ]
        
    },
    {
        key: 'estado',
        label: 'Estado',
        type: 'select',
        placeholder: 'Seleccionar estado...',
        options: [
            { value: 'Activo', label: 'Activo' },
            { value: 'Pendiente', label: 'Pendiente' },
            { value: 'Verificado', label: 'Verificado' },
            { value: 'Inactivo', label: 'Inactivo' }
        ]
    },
    {
        key: 'fechaRegistro',
        label: 'Fecha de Registro',
        type: 'dateRange'
    },
    {
        key: 'superficie',
        label: 'Superficie (m²)',
        type: 'number',
        placeholder: 'Superficie mínima'
    }
] 