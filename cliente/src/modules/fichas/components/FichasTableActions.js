// Acciones de la tabla para fichas catastrales
export const getFichasTableActions = () => [
    {
        icon: 'fas fa-eye',
        variant: 'outline-info',
        title: 'Ver Ficha',
        onClick: (item) => console.log('Ver ficha:', item)
    },
    {
        icon: 'fas fa-edit',
        variant: 'outline-primary',
        title: 'Editar Ficha',
        onClick: (item) => console.log('Editar ficha:', item)
    },
    {
        icon: 'fas fa-file-pdf',
        variant: 'outline-danger',
        title: 'Generar PDF',
        onClick: (item) => console.log('Generar PDF:', item)
    },
    {
        icon: 'fas fa-map-marker-alt',
        variant: 'outline-success',
        title: 'Ver en Mapa',
        onClick: (item) => console.log('Ver en mapa:', item)
    },
    {
        icon: 'fas fa-trash',
        variant: 'outline-danger',
        title: 'Eliminar Ficha',
        onClick: (item) => {
            if (window.confirm(`¿Está seguro de eliminar la ficha ${item.codigo}?`)) {
                console.log('Eliminar ficha:', item)
            }
        }
    }
] 