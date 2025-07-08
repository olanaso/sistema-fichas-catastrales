// Exports centralizados de componentes del módulo fichas
export { getFichasTableActions } from './FichasTableActions'
export { getFichasTableColumns } from './FichasTableColumns.jsx'
export { getFichasFilterConfig } from './FichasFilterConfig'
export { getFichasFilterActions } from './FichasFilterActions'

// Schema de validación
export { 
    fichasValidationSchema,
    validateFichaField,
    validateFichaForm,
    getFichasModalFields
} from '../schema/fichasValidationSchema' 