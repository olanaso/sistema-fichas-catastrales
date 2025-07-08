# 📦 Sistema de Componentes Reorganizado

Sistema de componentes reutilizables organizado por carpetas temáticas con **react-hot-toast** para alertas.

## 🗂️ **Nueva Estructura Organizativa**

```
src/components/
├── 📂 modals/          # Modales (CreateModal, EditModal, DeleteModal)
├── 📂 buttons/         # Botones de acción (ActionButtons)
├── 📂 tables/          # Tablas y filtros (DataTable, FilterPanel, Pagination)
├── 📂 forms/           # Componentes de formulario (SearchFilters)
├── 📂 feedback/        # Estados y alertas (LoadingState, ToastSystem)
├── 📂 ui/              # Componentes UI básicos (Button, Card, PageContainer)
├── 📂 layout/          # Layouts y navegación (BaseLayout, AdminLayout)
└── index.js            # Exportaciones centralizadas
```

## ✨ **Principales Cambios**

### 🔄 **Renombrado de Modales**
- `EnhancedCreateModal` → `CreateModal`
- `EnhancedEditModal` → `EditModal`
- **Eliminados:** Versiones anteriores obsoletas

### 🍞 **Sistema de Toast Mejorado**
- **Antes:** Bootstrap Toast (complejo)
- **Ahora:** `react-hot-toast` (simple y potente)
- **Ubicación:** `src/components/feedback/ToastSystem.jsx`

### 📁 **Organización por Carpetas**
- **Ventajas:** Mejor organización, fácil mantenimiento
- **Cada carpeta** tiene su propio `index.js`
- **Importaciones** más claras y específicas

## 🚀 **Uso del Nuevo Sistema**

### 1. **Importaciones Simplificadas**

```jsx
// ✅ Importación desde index principal
import {
    CreateModal,
    EditModal,
    DeleteModal,
    useToast,
    DataTable,
    FilterPanel
} from '../../../components'

// ✅ O importación específica por carpeta
import { CreateModal } from '../../../components/modals'
import { useToast } from '../../../components/feedback'
```

### 2. **Sistema de Toast con react-hot-toast**

```jsx
const Component = () => {
    const { showSuccess, showError, showWarning, showInfo } = useToast()

    const handleSuccess = () => {
        showSuccess('¡Operación exitosa!')
    }

    const handleError = () => {
        showError('Error en la operación', { duration: 8000 })
    }

    const handleValidationErrors = (errors) => {
        showValidationErrors(errors, 'Complete los campos')
    }

    const handleApiError = (error) => {
        showApiError(error, 'Error del servidor')
    }
}
```

### 3. **Modales Renombrados**

```jsx
// ✅ CreateModal (antes EnhancedCreateModal)
<CreateModal
    show={showModal}
    onSave={handleSave}
    title="Crear Nueva Ficha"
    fields={getModalFields()}
    validationSchema={validationSchema}
    validateField={validateField}
    validateForm={validateForm}
/>

// ✅ EditModal (antes EnhancedEditModal)
<EditModal
    show={showModal}
    onSave={handleSave}
    title="Editar Ficha"
    initialData={selectedItem}
    fields={getModalFields()}
    validationSchema={validationSchema}
    validateField={validateField}
    validateForm={validateForm}
/>
```

## 🎯 **Características del Toast System**

### Tipos de Alertas
```jsx
const { 
    showSuccess,    // ✅ Verde - 4 segundos
    showError,      // ❌ Rojo - 6 segundos  
    showWarning,    // ⚠️ Amarillo - 5 segundos
    showInfo        // ℹ️ Azul - 4 segundos
} = useToast()
```

### Alertas Especializadas
```jsx
// 🔍 Errores de validación
showValidationErrors(errors, 'Complete los campos requeridos')

// 🌐 Errores de API
showApiError(error, 'Error al guardar')

// ⏳ Operaciones con loading
showPromise(apiCall, {
    loading: 'Guardando...',
    success: 'Guardado exitosamente',
    error: 'Error al guardar'
})
```

### Configuración Personalizada
```jsx
showSuccess('Mensaje', {
    duration: 6000,
    position: 'top-center',
    style: {
        background: '#10B981',
        color: '#fff'
    }
})
```

## 📂 **Componentes por Carpeta**

### 🎭 **Modals**
- `CreateModal` - Modal de creación con validación
- `EditModal` - Modal de edición con detección de cambios
- `DeleteModal` - Modal de confirmación de eliminación

### 🔘 **Buttons**
- `ActionButtons` - 10 botones reutilizables (Add, Save, Cancel, etc.)

### 📊 **Tables**
- `DataTable` - Tabla con acciones y paginación
- `FilterPanel` - Panel de filtros colapsable
- `Pagination` - Paginación independiente

### 📝 **Forms**
- `SearchFilters` - Componente de búsqueda

### 💬 **Feedback**
- `ToastSystem` - Sistema de alertas con react-hot-toast
- `LoadingState` - Estados de carga
- `ComingSoon` - Páginas en desarrollo

### 🎨 **UI**
- `Button` - Botón básico
- `Card` - Tarjeta básica
- `PageContainer` - Contenedor de página

## 🔧 **Configuración del Provider**

### App.jsx
```jsx
import { ToastProvider } from './components'

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ToastProvider>
  )
}
```

## ✅ **Ventajas del Nuevo Sistema**

🗂️ **Mejor Organización** - Componentes agrupados por función  
🔄 **Nombres Simples** - CreateModal en lugar de EnhancedCreateModal  
🍞 **Toast Moderno** - react-hot-toast en lugar de Bootstrap  
📦 **Importaciones Claras** - Estructura predecible  
🚀 **Rendimiento** - Importaciones más específicas  
🔧 **Mantenimiento** - Fácil localizar y modificar componentes  
📖 **Escalabilidad** - Fácil agregar nuevos componentes

## 🎯 **Migración Completada**

✅ Reorganización por carpetas temáticas  
✅ Renombrado de modales Enhanced → simples  
✅ Integración de react-hot-toast  
✅ Eliminación de archivos obsoletos  
✅ Actualización de todas las importaciones  
✅ Índices por carpeta para fácil importación  
✅ Documentación completa del nuevo sistema 