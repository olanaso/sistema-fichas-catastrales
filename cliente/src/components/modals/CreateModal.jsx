import React, { useState, useEffect } from 'react'
import { Modal, Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { SaveButton, CancelButton } from '../buttons/ActionButtons'
import { useToast, ValidationErrors } from '../feedback/ToastSystem'

const CreateModal = ({
    show = false,
    onHide,
    onSave,
    title = 'Crear Elemento',
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
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [showPasswords, setShowPasswords] = useState({})
    const { showValidationErrors, showApiError, showSuccess } = useToast()

    // Reset form cuando se abre/cierra el modal
    useEffect(() => {
        if (show) {
            setFormData(initialData || {})
            setErrors({})
            setTouched({})
            setShowPasswords({})
        }
    }, [show])

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

    const togglePasswordVisibility = (fieldKey) => {
        setShowPasswords(prev => ({
            ...prev,
            [fieldKey]: !prev[fieldKey]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

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
            // Llamar función onSave
            if (onSave) {
                const result = await onSave(formData)

                // Si retorna un resultado exitoso, cerrar modal
                if (result && result.success !== false) {
                    handleClose()
                }
            }
        } catch (error) {
            showApiError(error, 'Error al crear el elemento')
        }
    }

    const handleClose = () => {
        setFormData({})
        setErrors({})
        setTouched({})
        setShowPasswords({})
        onHide && onHide()
    }

    const renderField = (field) => {
        const value = formData[field.key] || ''
        const error = errors[field.key]
        const isTouched = touched[field.key]
        const showError = showInlineErrors && error && isTouched

        switch (field.type) {
            case 'text':
            case 'email':
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
                        readOnly={field.readOnly}
                    />
                )

            case 'password':
                const isPasswordVisible = showPasswords[field.key]
                const inputElement = (
                    <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
                        readOnly={field.readOnly}
                    />
                )

                if (field.showToggle) {
                    return (
                        <InputGroup>
                            {inputElement}
                            <Button
                                variant="outline-secondary"
                                onClick={() => togglePasswordVisibility(field.key)}
                                disabled={field.disabled || loading}
                            >
                                <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </Button>
                        </InputGroup>
                    )
                }
                return inputElement

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
                        readOnly={field.readOnly}
                    />
                )

            case 'select':
                return (
                    <Form.Select
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
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
                        readOnly={field.readOnly}
                    />
                )

            case 'file':
                return (
                    <Form.Control
                        type="file"
                        onChange={(e) => handleChange(field.key, e.target.files[0])}
                        onBlur={() => handleBlur(field.key)}
                        isInvalid={showError}
                        disabled={field.disabled || loading}
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
                        disabled={field.disabled || loading}
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
                        readOnly={field.readOnly}
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
                    <i className="fas fa-plus-circle me-2 text-primary"></i>
                    {title}
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
                                                {field.readOnly && <span className="text-muted ms-1">(Solo lectura)</span>}
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
                                disabled={loading || (showInlineErrors && errorCount > 0)}
                            >
                                Guardar
                            </SaveButton>
                        </div>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateModal 