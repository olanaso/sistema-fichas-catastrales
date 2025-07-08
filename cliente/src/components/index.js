// Exportaciones de layout
export { default as BaseLayout } from './layout/BaseLayout'
export { default as AdminLayout } from './layout/AdminLayout'
export { default as AppNavbar } from './layout/Navbar'
export { default as Sidebar } from './layout/Sidebar'

// Exportaciones de componentes comunes
export { default as Button } from './common/Button'
export { default as Card } from './common/Card'
export { default as PageContainer } from './common/PageContainer'
export { default as SearchFilters } from './common/SearchFilters'
export { default as LoadingState } from './common/LoadingState'
export { default as ComingSoon } from './common/ComingSoon'

export { default as DataTable } from './common/DataTable'
export { default as FilterPanel } from './common/FilterPanel'
export { default as Pagination, SimplePagination } from './common/Pagination'

// Modales reutilizables
export { default as CreateModal } from './common/CreateModal'
export { default as EditModal } from './common/EditModal'
export { default as DeleteModal } from './common/DeleteModal'

// Botones de acción
export { 
    AddButton, 
    SaveButton, 
    CancelButton, 
    EditButton, 
    DeleteButton, 
    ViewButton, 
    ChangePasswordButton, 
    FilterButton, 
    ExportButton, 
    RefreshButton 
} from './common/ActionButtons' 