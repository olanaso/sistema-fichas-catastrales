// Acciones adicionales para el panel de filtros de fichas catastrales
export const getFichasFilterActions = (loadFichasData, loading, filteredFichas) => [
    {
        label: 'Exportar',
        icon: 'fas fa-download',
        variant: 'outline-success',
        onClick: () => console.log('Exportar fichas:', filteredFichas)
    },
    {
        label: 'Importar',
        icon: 'fas fa-upload',
        variant: 'outline-info',
        onClick: () => console.log('Importar fichas')
    },
    {
        label: 'Actualizar',
        icon: 'fas fa-sync-alt',
        variant: 'outline-primary',
        onClick: loadFichasData,
        disabled: loading
    }
] 