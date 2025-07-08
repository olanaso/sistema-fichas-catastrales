import React, { useState, useEffect } from 'react'
import { Modal, Form, Row, Col } from 'react-bootstrap'
import { SaveButton, CancelButton } from './ActionButtons'

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
    ...props
}) => {
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})

    // Actualizar formData cuando cambie initialData
    useEffect(() => {
        setFormData(initialData)
        setErrors({})
    }, [initialData])

    const handleChange = (fieldKey, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldKey]: value
        }))

        // Limpiar error si existe
        if (errors[fieldKey]) {
            setErrors(prev => ({
                ...prev,
                [fieldKey]: null
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validación básica
        const newErrors = {}
        fields.forEach(field => {
            if (field.required && !formData[field.key]) {
                newErrors[field.key] = `${field.label} es requerido`
            }
        })

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Llamar función onSave
        if (onSave) {
            await onSave(formData)
        }
    }

    const handleClose = () => {
        setFormData(initialData)
        setErrors({})
        onHide && onHide()
    }

    const renderField = (field) => {
        const value = formData[field.key] || ''
        const error = errors[field.key]

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
                        isInvalid={!!error}
                        disabled={field.disabled || loading}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        readOnly={field.readOnly}
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
                        isInvalid={!!error}
                        disabled={field.disabled || loading}
                        readOnly={field.readOnly}
                    />
                )

            case 'select':
                return (
                    <Form.Select
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        isInvalid={!!error}
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
                        isInvalid={!!error}
                        disabled={field.disabled || loading}
                        readOnly={field.readOnly}
                    />
                )

            case 'file':
                return (
                    <Form.Control
                        type="file"
                        onChange={(e) => handleChange(field.key, e.target.files[0])}
                        isInvalid={!!error}
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
                        isInvalid={!!error}
                        disabled={field.disabled || loading}
                        readOnly={field.readOnly}
                    />
                )
        }
    }

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
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {customBody ? (
                        customBody(formData, handleChange, errors)
                    ) : (
                        <Row className="g-3">
                            {fields.map((field) => (
                                <Col key={field.key} xs={12} sm={field.colSize || 6}>
                                    <Form.Group>
                                        {field.type !== 'checkbox' && (
                                            <Form.Label className="fw-semibold">
                                                {field.label}
                                                {field.required && <span className="text-danger">*</span>}
                                                {field.readOnly && <span className="text-muted"> (Solo lectura)</span>}
                                            </Form.Label>
                                        )}
                                        {renderField(field)}
                                        {errors[field.key] && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors[field.key]}
                                            </Form.Control.Feedback>
                                        )}
                                        {field.help && (
                                            <Form.Text className="text-muted">
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
                    <CancelButton
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancelar
                    </CancelButton>
                    <SaveButton
                        type="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Actualizar
                    </SaveButton>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditModal 