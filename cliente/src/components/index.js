// ==================================================
// EXPORTACIONES ORGANIZADAS POR CARPETAS
// ==================================================

// 📂 Layout Components
export { default as BaseLayout } from './layout/BaseLayout'
export { default as AdminLayout } from './layout/AdminLayout'
export { default as AppNavbar } from './layout/Navbar'
export { default as Sidebar } from './layout/Sidebar'

// 📂 UI Components (Componentes básicos de interfaz)
export { default as Button } from './ui/Button'
export { default as Card } from './ui/Card'
export { default as PageContainer } from './ui/PageContainer'

// 📂 Table Components (Tablas, paginación y filtros)
export { default as DataTable } from './tables/DataTable'
export { default as FilterPanel } from './tables/FilterPanel'
export { default as Pagination, SimplePagination } from './tables/Pagination'

// 📂 Form Components (Componentes de formularios)
export { default as SearchFilters } from './forms/SearchFilters'

// 📂 Feedback Components (Estados de carga, mensajes, alertas)
export { default as LoadingState } from './feedback/LoadingState'
export { default as ComingSoon } from './feedback/ComingSoon'

// 📂 Toast System (Sistema de alertas con react-hot-toast)
export { 
    default as ToastProvider, 
    useToast, 
    InlineAlert, 
    ValidationErrors 
} from './feedback/ToastSystem'

// 📂 Modal Components (Modales reutilizables)
export { default as CreateModal } from './modals/CreateModal'
export { default as EditModal } from './modals/EditModal'
export { default as DeleteModal } from './modals/DeleteModal'
export { default as PasswordModal } from './modals/PasswordModal'

// 📂 Button Components (Botones de acción)
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
} from './buttons/ActionButtons' 