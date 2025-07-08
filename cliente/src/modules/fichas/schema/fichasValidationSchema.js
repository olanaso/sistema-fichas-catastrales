// Schema de validación para fichas catastrales
export const fichasValidationSchema = {
    // Reglas de validación por campo
    fields: {
        codigo: {
            required: true,
            type: 'string',
            minLength: 3,
            maxLength: 20,
            pattern: /^[A-Z0-9-]+$/,
            message: 'El código debe tener entre 3-20 caracteres, solo letras mayúsculas, números y guiones'
        },
        direccion: {
            required: true,
            type: 'string',
            minLength: 5,
            maxLength: 200,
            message: 'La dirección debe tener entre 5-200 caracteres'
        },
        propietario: {
            required: true,
            type: 'string',
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'El propietario debe contener solo letras y espacios (2-100 caracteres)'
        },
        tipo: {
            required: true,
            type: 'select',
            allowedValues: ['Residencial', 'Comercial', 'Industrial', 'Rural'],
            message: 'Debe seleccionar un tipo de predio válido'
        },
        superficie: {
            required: true,
            type: 'number',
            min: 0.01,
            max: 999999.99,
            decimals: 2,
            message: 'La superficie debe ser un número positivo (máximo 999,999.99 m²)'
        },
        estado: {
            required: true,
            type: 'select',
            allowedValues: ['Activo', 'Pendiente', 'Verificado', 'Inactivo'],
            message: 'Debe seleccionar un estado válido'
        },
        fecha: {
            required: false,
            type: 'date',
            message: 'Debe ser una fecha válida'
        },
        observaciones: {
            required: false,
            type: 'string',
            maxLength: 500,
            message: 'Las observaciones no pueden exceder 500 caracteres'
        },
        coordenadaX: {
            required: false,
            type: 'number',
            decimals: 6,
            message: 'Debe ser una coordenada válida'
        },
        coordenadaY: {
            required: false,
            type: 'number',
            decimals: 6,
            message: 'Debe ser una coordenada válida'
        }
    }
}

// Función de validación principal
export const validateFichaField = (fieldName, value, schema = fichasValidationSchema) => {
    const fieldRule = schema.fields[fieldName]
    if (!fieldRule) return { isValid: true }

    const errors = []

    // Validar campo requerido
    if (fieldRule.required && (!value || value.toString().trim() === '')) {
        return {
            isValid: false,
            error: `${getFieldDisplayName(fieldName)} es requerido`
        }
    }

    // Si no es requerido y está vacío, es válido
    if (!fieldRule.required && (!value || value.toString().trim() === '')) {
        return { isValid: true }
    }

    // Validaciones por tipo
    switch (fieldRule.type) {
        case 'string':
            if (typeof value !== 'string') {
                errors.push('Debe ser un texto válido')
            } else {
                if (fieldRule.minLength && value.length < fieldRule.minLength) {
                    errors.push(`Debe tener al menos ${fieldRule.minLength} caracteres`)
                }
                if (fieldRule.maxLength && value.length > fieldRule.maxLength) {
                    errors.push(`No debe exceder ${fieldRule.maxLength} caracteres`)
                }
                if (fieldRule.pattern && !fieldRule.pattern.test(value)) {
                    errors.push(fieldRule.message || 'Formato no válido')
                }
            }
            break

        case 'number':
            const numValue = parseFloat(value)
            if (isNaN(numValue)) {
                errors.push('Debe ser un número válido')
            } else {
                if (fieldRule.min !== undefined && numValue < fieldRule.min) {
                    errors.push(`Debe ser mayor o igual a ${fieldRule.min}`)
                }
                if (fieldRule.max !== undefined && numValue > fieldRule.max) {
                    errors.push(`Debe ser menor o igual a ${fieldRule.max}`)
                }
                if (fieldRule.decimals !== undefined) {
                    const decimalsCount = (value.toString().split('.')[1] || '').length
                    if (decimalsCount > fieldRule.decimals) {
                        errors.push(`Máximo ${fieldRule.decimals} decimales`)
                    }
                }
            }
            break

        case 'select':
            if (fieldRule.allowedValues && !fieldRule.allowedValues.includes(value)) {
                errors.push(fieldRule.message || 'Selección no válida')
            }
            break

        case 'date':
            const dateValue = new Date(value)
            if (isNaN(dateValue.getTime())) {
                errors.push('Debe ser una fecha válida')
            }
            break
    }

    return {
        isValid: errors.length === 0,
        error: errors[0] || null
    }
}

// Validar todo el formulario
export const validateFichaForm = (formData, schema = fichasValidationSchema) => {
    const errors = {}
    let isValid = true

    Object.keys(schema.fields).forEach(fieldName => {
        const validation = validateFichaField(fieldName, formData[fieldName], schema)
        if (!validation.isValid) {
            errors[fieldName] = validation.error
            isValid = false
        }
    })

    return { isValid, errors }
}

// Obtener nombre de campo para mostrar
const getFieldDisplayName = (fieldName) => {
    const displayNames = {
        codigo: 'Código',
        direccion: 'Dirección',
        propietario: 'Propietario',
        tipo: 'Tipo de predio',
        superficie: 'Superficie',
        estado: 'Estado',
        fecha: 'Fecha',
        observaciones: 'Observaciones',
        coordenadaX: 'Coordenada X',
        coordenadaY: 'Coordenada Y'
    }
    return displayNames[fieldName] || fieldName
}

// Obtener configuración de campos para modales
export const getFichasModalFields = () => [
    {
        key: 'codigo',
        label: 'Código',
        type: 'text',
        required: true,
        colSize: 6,
        placeholder: 'Ej: FIC-001',
        help: 'Código único de la ficha (letras mayúsculas, números y guiones)'
    },
    {
        key: 'direccion',
        label: 'Dirección',
        type: 'text',
        required: true,
        colSize: 12,
        placeholder: 'Ej: Av. Principal 123, Miraflores'
    },
    {
        key: 'propietario',
        label: 'Propietario',
        type: 'text',
        required: true,
        colSize: 6,
        placeholder: 'Nombre completo del propietario'
    },
    {
        key: 'tipo',
        label: 'Tipo de Predio',
        type: 'select',
        required: true,
        colSize: 6,
        placeholder: 'Seleccionar tipo...',
        options: [
            { value: 'Residencial', label: 'Residencial' },
            { value: 'Comercial', label: 'Comercial' },
            { value: 'Industrial', label: 'Industrial' },
            { value: 'Rural', label: 'Rural' }
        ]
    },
    {
        key: 'superficie',
        label: 'Superficie (m²)',
        type: 'number',
        required: true,
        colSize: 6,
        placeholder: '0.00',
        min: 0.01,
        max: 999999.99,
        step: 0.01
    },
    {
        key: 'estado',
        label: 'Estado',
        type: 'select',
        required: true,
        colSize: 6,
        placeholder: 'Seleccionar estado...',
        options: [
            { value: 'Activo', label: 'Activo' },
            { value: 'Pendiente', label: 'Pendiente' },
            { value: 'Verificado', label: 'Verificado' },
            { value: 'Inactivo', label: 'Inactivo' }
        ]
    },
    {
        key: 'fecha',
        label: 'Fecha de Registro',
        type: 'date',
        required: false,
        colSize: 6
    },
    {
        key: 'observaciones',
        label: 'Observaciones',
        type: 'textarea',
        required: false,
        colSize: 12,
        rows: 3,
        placeholder: 'Observaciones adicionales (opcional)',
        help: 'Máximo 500 caracteres'
    }
] 