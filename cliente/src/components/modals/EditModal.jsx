import React, { useState, useEffect } from 'react'
import { Modal, Form, Row, Col } from 'react-bootstrap'
import { SaveButton, CancelButton } from '../buttons/ActionButtons'
import { useToast, ValidationErrors } from '../feedback/ToastSystem'

const EditModal = ({
    show = false,
    onHide,
    onSave,
    title = 'Editar Elemento',
    fields = [],
    loading = false,
    size = 'lg',
    backdrop = 'static',
    keyboard = false,
    initialData = {},
    customBody = null,
    validationSchema = null,
    validateField = null,
    validateForm = null,
    showInlineErrors = true,
    showToastErrors = true,
    ...props
}) => {
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [hasChanges, setHasChanges] = useState(false)
    const { showValidationErrors, showApiError, showSuccess, showWarning } = useToast()

    // Actualizar formData cuando cambie initialData
    useEffect(() => {
        if (show && initialData) {
            setFormData(initialData)
            setErrors({})
            setTouched({})
            setHasChanges(false)
        }
    }, [show, initialData])

    // Detectar cambios en el formulario
    useEffect(() => {
        if (initialData) {
            const changed = Object.keys(formData).some(key => 
                formData[key] !== initialData[key]
            )
            setHasChanges(changed)
        }
    }, [formData, initialData])

    const handleChange = (fieldKey, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldKey]: value
        }))
        
        // Marcar campo como tocado
        setTouched(prev => ({
            ...prev,
            [fieldKey]: true
        }))

        // Validar campo en tiempo real si hay schema
        if (validateField && validationSchema) {
            const validation = validateField(fieldKey, value, validationSchema)
            setErrors(prev => ({
                ...prev,
                [fieldKey]: validation.isValid ? null : validation.error
            }))
        }
    }

    const handleBlur = (fieldKey) => {
        setTouched(prev => ({
            ...prev,
            [fieldKey]: true
        }))

        // Validar al salir del campo
        if (validateField && validationSchema) {
            const validation = validateField(fieldKey, formData[fieldKey], validationSchema)
            setErrors(prev => ({
                ...prev,
                [fieldKey]: validation.isValid ? null : validation.error
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Verificar si hay cambios
        if (!hasChanges) {
            showWarning('No se han realizado cambios')
            return
        }

        // Marcar todos los campos como tocados
        const allTouched = {}
        fields.forEach(field => {
            allTouched[field.key] = true
        })
        setTouched(allTouched)

        // Validación completa del formulario
        let formErrors = {}
        let isValid = true

        if (validateForm && validationSchema) {
            const validation = validateForm(formData, validationSchema)
            isValid = validation.isValid
            formErrors = validation.errors
            setErrors(formErrors)
        } else {
            // Validación básica sin schema
            fields.forEach(field => {
                if (field.required && !formData[field.key]) {
                    formErrors[field.key] = `${field.label} es requerido`
                    isValid = false
                }
            })
            setErrors(formErrors)
        }

        if (!isValid) {
            if (showToastErrors) {
                showValidationErrors(formErrors, 'Complete los campos requeridos')
            }
            return
        }

        try {
            // Crear objeto con solo los campos que cambiaron
            const changedData = {}
            Object.keys(formData).forEach(key => {
                if (formData[key] !== initialData[key]) {
                    changedData[key] = formData[key]
                }
            })

            // Incluir ID para la actualización
            if (initialData.id) {
                changedData.id = initialData.id
            }

            // Llamar función onSave
            if (onSave) {
                const result = await onSave(changedData, formData)
                
                // Si retorna un resultado exitoso, mostrar mensaje y cerrar
                if (result !== false) {
                    showSuccess('Elemento actualizado exitosamente')
                    handleClose()
                }
            }
        } catch (error) {
            showApiError(error, 'Error al actualizar el elemento')
        }
    }

    const handleClose = () => {
        // Verificar si hay cambios sin guardar
        if (hasChanges) {
            const confirmClose = window.confirm(
                '¿Está seguro de cerrar? Los cambios no guardados se perderán.'
            )
            if (!confirmClose) return
        }

        setFormData(initialData)
        setErrors({})
        setTouched({})
        setHasChanges(false)
        onHide && onHide()
    }

    const renderField = (field) => {
        const value = formData[field.key] || ''
        const error = errors[field.key]
        const isTouched = touched[field.key]
        const showError = showInlineErrors && error && isTouched
        const isReadOnly = field.readOnly || field.key === 'id'

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
                return (
                    <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        readOnly={isReadOnly}
                        className={isReadOnly ? 'bg-light' : ''}
                    />
                )

            case 'textarea':
                return (
                    <Form.Control
                        as="textarea"
                        rows={field.rows || 3}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
                        readOnly={isReadOnly}
                        className={isReadOnly ? 'bg-light' : ''}
                    />
                )

            case 'select':
                return (
                    <Form.Select
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading || isReadOnly}
                        className={isReadOnly ? 'bg-light' : ''}
                    >
                        <option value="">{field.placeholder || 'Seleccionar...'}</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                )

            case 'date':
                return (
                    <Form.Control
                        type="date"
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
                        readOnly={isReadOnly}
                        className={isReadOnly ? 'bg-light' : ''}
                    />
                )

            case 'file':
                return (
                    <Form.Control
                        type="file"
                        onChange={(e) => handleChange(field.key, e.target.files[0])}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading || isReadOnly}
                        accept={field.accept}
                    />
                )

            case 'checkbox':
                return (
                    <Form.Check
                        type="checkbox"
                        label={field.checkboxLabel || field.label}
                        checked={!!value}
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                        disabled={field.disabled || loading || isReadOnly}
                    />
                )

            default:
                return (
                    <Form.Control
                        type="text"
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
                        readOnly={isReadOnly}
                        className={isReadOnly ? 'bg-light' : ''}
                    />
                )
        }
    }

    // Contar errores para mostrar resumen
    const errorCount = Object.values(errors).filter(Boolean).length

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size={size}
            backdrop={backdrop}
            keyboard={keyboard}
            centered
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="fas fa-edit me-2 text-primary"></i>
                    {title}
                    {hasChanges && <span className="badge bg-warning text-dark ms-2">Modificado</span>}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Mostrar errores de validación como resumen */}
                    {showInlineErrors && errorCount > 0 && (
                        <ValidationErrors 
                            errors={errors} 
                            className="mb-3"
                        />
                    )}

                    {customBody ? (
                        customBody(formData, handleChange, errors, handleBlur)
                    ) : (
                        <Row className="g-3">
                            {fields.map((field) => (
                                <Col key={field.key} xs={12} sm={field.colSize || 6}>
                                    <Form.Group>
                                        {field.type !== 'checkbox' && (
                                            <Form.Label className="fw-semibold">
                                                {field.label}
                                                {field.required && <span className="text-danger ms-1">*</span>}
                                                {(field.readOnly || field.key === 'id') && (
                                                    <span className="text-muted ms-1">(Solo lectura)</span>
                                                )}
                                            </Form.Label>
                                        )}
                                        {renderField(field)}
                                        {showInlineErrors && errors[field.key] && touched[field.key] && (
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {errors[field.key]}
                                            </Form.Control.Feedback>
                                        )}
                                        {field.help && (
                                            <Form.Text className="text-muted">
                                                <i className="fas fa-info-circle me-1"></i>
                                                {field.help}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Modal.Body>

                <Modal.Footer className="bg-light">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            {errorCount > 0 && (
                                <small className="text-danger">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errorCount} error{errorCount > 1 ? 'es' : ''} de validación
                                </small>
                            )}
                            {!hasChanges && errorCount === 0 && (
                                <small className="text-muted">
                                    <i className="fas fa-info-circle me-1"></i>
                                    Sin cambios realizados
                                </small>
                            )}
                        </div>
                        <div className="d-flex gap-2">
                            <CancelButton 
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancelar
                            </CancelButton>
                            <SaveButton 
                                type="submit"
                                loading={loading}
                                disabled={loading || !hasChanges || (showInlineErrors && errorCount > 0)}
                            >
                                Actualizar
                            </SaveButton>
                        </div>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditModal 