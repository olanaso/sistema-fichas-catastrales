import React, { useState, useEffect } from 'react'
import { Modal, Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { SaveButton, CancelButton } from '../buttons/ActionButtons'
import { useToast, ValidationErrors } from '../feedback/ToastSystem'

const PasswordModal = ({
    show = false,
    onHide,
    onSave,
    title = 'Cambiar Contraseña',
    loading = false,
    backdrop = 'static',
    keyboard = false,
    user = null,
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
            setFormData({})
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
        const allTouched = {
            newPassword: true,
            confirmPassword: true
        }
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
            if (!formData.newPassword || formData.newPassword.trim() === '') {
                formErrors.newPassword = 'La nueva contraseña es requerida'
                isValid = false
            } else if (formData.newPassword.length < 6) {
                formErrors.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres'
                isValid = false
            }

            if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
                formErrors.confirmPassword = 'La confirmación de contraseña es requerida'
                isValid = false
            } else if (formData.newPassword !== formData.confirmPassword) {
                formErrors.confirmPassword = 'Las contraseñas no coinciden'
                isValid = false
            }
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
            showApiError(error, 'Error al cambiar la contraseña')
        }
    }

    const handleClose = () => {
        setFormData({})
        setErrors({})
        setTouched({})
        setShowPasswords({})
        onHide && onHide()
    }

    const renderPasswordField = (fieldKey, label, placeholder) => {
        const value = formData[fieldKey] || ''
        const error = errors[fieldKey]
        const isTouched = touched[fieldKey]
        const showError = showInlineErrors && error && isTouched
        const isPasswordVisible = showPasswords[fieldKey]

        return (
            <Form.Group>
                <Form.Label className="fw-semibold">
                    {label}
                    <span className="text-danger ms-1">*</span>
                </Form.Label>
                <InputGroup>
                    <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        onBlur={() => handleBlur(fieldKey)}
                        isInvalid={showError}
                        disabled={loading}
                    />
                    <Button
                        variant="outline-secondary"
                        onClick={() => togglePasswordVisibility(fieldKey)}
                        disabled={loading}
                    >
                        <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </Button>
                </InputGroup>
                {showError && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                        {error}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        )
    }

    // Contar errores para mostrar resumen
    const errorCount = Object.values(errors).filter(Boolean).length

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            backdrop={backdrop}
            keyboard={keyboard}
            centered
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="fas fa-lock me-2 text-warning"></i>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Información del usuario */}
                    {user && (
                        <div className="alert alert-info mb-3">
                            <i className="fas fa-user me-2"></i>
                            Cambiar contraseña para: <strong>{user.nombres} {user.apellidos}</strong>
                        </div>
                    )}

                    {/* Mostrar errores de validación como resumen */}
                    {showInlineErrors && errorCount > 0 && (
                        <ValidationErrors 
                            errors={errors} 
                            className="mb-3"
                        />
                    )}

                    <Row className="g-3">
                        <Col xs={12}>
                            {renderPasswordField('newPassword', 'Nueva Contraseña', 'Ingrese la nueva contraseña')}
                        </Col>
                        <Col xs={12}>
                            {renderPasswordField('confirmPassword', 'Confirmar Contraseña', 'Confirme la nueva contraseña')}
                        </Col>
                    </Row>
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
                                Cambiar Contraseña
                            </SaveButton>
                        </div>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default PasswordModal 