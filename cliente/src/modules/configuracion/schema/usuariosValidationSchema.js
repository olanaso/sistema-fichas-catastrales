// Schema de validación para usuarios
export const usuariosValidationSchema = {
    // Campos requeridos
    required: ['dni', 'nombres', 'apellidos', 'email', 'idRol', 'password'],

    // Campos opcionales
    optional: ['activo', 'newPassword', 'confirmPassword'],

    // Validaciones por campo
    fields: {
        dni: {
            type: 'string',
            required: true,
            minLength: 8,
            maxLength: 8,
            pattern: /^\d{8}$/,
            message: 'El DNI debe tener exactamente 8 dígitos'
        },
        nombres: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
            message: 'Los nombres solo pueden contener letras y espacios'
        },
        apellidos: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
            message: 'Los apellidos solo pueden contener letras y espacios'
        },
        email: {
            type: 'email',
            required: true,
            maxLength: 100,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Debe ser un email válido'
        },
        password: {
            type: 'string',
            required: true,
            minLength: 6,
            maxLength: 50,
            message: 'La contraseña debe tener al menos 6 caracteres'
        },
        newPassword: {
            type: 'string',
            required: false,
            minLength: 6,
            maxLength: 50,
            message: 'La nueva contraseña debe tener al menos 6 caracteres'
        },
        confirmPassword: {
            type: 'string',
            required: false,
            minLength: 6,
            maxLength: 50,
            message: 'Debe coincidir con la contraseña'
        },
        idRol: {
            type: 'number',
            required: true,
            min: 1,
            message: 'Debe seleccionar un rol válido'
        },
        activo: {
            type: 'boolean',
            required: false,
            default: true,
            message: 'El estado debe ser verdadero o falso'
        }
    }
};

// Función para validar un campo específico
export const validateUsuarioField = (field, value, context = {}) => {
    const config = usuariosValidationSchema.fields[field];
    if (!config) return { isValid: true, error: null };

    // Validar campo requerido
    if (config.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        return { isValid: false, error: `El campo ${field} es requerido` };
    }

    // Solo validar si el campo tiene valor
    if (value !== undefined && value !== null && value !== '') {
        // Validar tipo string
        if (config.type === 'string' && typeof value !== 'string') {
            return { isValid: false, error: `El campo ${field} debe ser texto` };
        }

        // Validar email
        if (config.type === 'email' && !config.pattern.test(value)) {
            return { isValid: false, error: config.message };
        }

        // Validar longitud mínima
        if (config.minLength && value.length < config.minLength) {
            return { isValid: false, error: `El campo ${field} debe tener al menos ${config.minLength} caracteres` };
        }

        // Validar longitud máxima
        if (config.maxLength && value.length > config.maxLength) {
            return { isValid: false, error: `El campo ${field} no debe exceder ${config.maxLength} caracteres` };
        }

        // Validar patrón
        if (config.pattern && !config.pattern.test(value)) {
            return { isValid: false, error: config.message };
        }

        // Validar número
        if (config.type === 'number') {
            const numValue = Number(value);
            if (isNaN(numValue)) {
                return { isValid: false, error: `El campo ${field} debe ser un número` };
            }
            if (config.min && numValue < config.min) {
                return { isValid: false, error: `El campo ${field} debe ser mayor o igual a ${config.min}` };
            }
        }
    }

    return { isValid: true, error: null };
};

// Función para validar todo el formulario
export const validateUsuarioForm = (data, isEdit = false) => {
    const errors = {};
    
    // Campos requeridos según el tipo de formulario
    const requiredFields = isEdit 
        ? ['dni', 'nombres', 'apellidos', 'email'] 
        : ['dni', 'nombres', 'apellidos', 'email', 'idRol', 'password'];

    // Validar campos requeridos
    requiredFields.forEach(field => {
        const validation = validateUsuarioField(field, data[field]);
        if (!validation.isValid) {
            errors[field] = validation.error;
        }
    });

    // Validar campos opcionales que tengan valor
    ['activo'].forEach(field => {
        if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
            const validation = validateUsuarioField(field, data[field]);
            if (!validation.isValid) {
                errors[field] = validation.error;
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Función para validar cambio de contraseña
export const validatePasswordChange = (data) => {
    const errors = {};

    // Validar nueva contraseña
    if (!data.newPassword || data.newPassword.trim() === '') {
        errors.newPassword = 'La nueva contraseña es requerida';
    } else if (data.newPassword.length < 6) {
        errors.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación
    if (!data.confirmPassword || data.confirmPassword.trim() === '') {
        errors.confirmPassword = 'La confirmación de contraseña es requerida';
    } else if (data.newPassword !== data.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Función para obtener campos del modal (siguiendo patrón fichas)
export const getUsuariosModalFields = (roles = []) => {
    // Convertir roles al formato necesario para el select
    const rolesOptions = roles.map(rol => ({
        value: rol.id,
        label: rol.rol
    }));

    return {
        create: [
            {
                key: 'dni',
                label: 'DNI',
                type: 'text',
                required: true,
                placeholder: 'Ingrese DNI'
            },
            {
                key: 'nombres',
                label: 'Nombres',
                type: 'text',
                required: true,
                placeholder: 'Ingrese nombres'
            },
            {
                key: 'apellidos',
                label: 'Apellidos',
                type: 'text',
                required: true,
                placeholder: 'Ingrese apellidos'
            },
            {
                key: 'email',
                label: 'Correo Electrónico',
                type: 'email',
                required: true,
                placeholder: 'Ingrese email'
            },
            {
                key: 'idRol',
                label: 'Rol',
                type: 'select',
                required: true,
                options: rolesOptions
            },
            {
                key: 'password',
                label: 'Contraseña',
                type: 'password',
                required: true,
                placeholder: 'Ingrese contraseña',
                showToggle: true
            },
            {
                key: 'activo',
                label: 'Estado',
                type: 'select',
                required: true,
                options: [
                    { value: true, label: 'Activo' },
                    { value: false, label: 'Inactivo' }
                ]
            }
        ],
        edit: [
            {
                key: 'dni',
                label: 'DNI',
                type: 'text',
                required: true,
                placeholder: 'Ingrese DNI'
            },
            {
                key: 'nombres',
                label: 'Nombres',
                type: 'text',
                required: true,
                placeholder: 'Ingrese nombres'
            },
            {
                key: 'apellidos',
                label: 'Apellidos',
                type: 'text',
                required: true,
                placeholder: 'Ingrese apellidos'
            },
            {
                key: 'email',
                label: 'Correo Electrónico',
                type: 'email',
                required: true,
                placeholder: 'Ingrese email'
            },
            {
                key: 'activo',
                label: 'Estado',
                type: 'select',
                required: true,
                options: [
                    { value: true, label: 'Activo' },
                    { value: false, label: 'Inactivo' }
                ]
            }
        ],
        password: [
            {
                key: 'newPassword',
                label: 'Nueva Contraseña',
                type: 'password',
                required: true,
                placeholder: 'Ingrese nueva contraseña',
                showToggle: true
            },
            {
                key: 'confirmPassword',
                label: 'Confirmar Contraseña',
                type: 'password',
                required: true,
                placeholder: 'Confirme nueva contraseña'
            }
        ]
    };
}; 