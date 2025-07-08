import React from 'react'
import { Modal, Alert } from 'react-bootstrap'
import { DeleteButton, CancelButton } from './ActionButtons'

const DeleteModal = ({
    show = false,
    onHide,
    onDelete,
    title = 'Confirmar Eliminación',
    message = '¿Está seguro de que desea eliminar este elemento?',
    itemName = '',
    details = null,
    loading = false,
    size = 'md',
    variant = 'danger',
    deleteButtonText = 'Eliminar',
    ...props
}) => {
    const handleDelete = async () => {
        if (onDelete) {
            await onDelete()
        }
    }

    const handleClose = () => {
        onHide && onHide()
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size={size}
            backdrop="static"
            keyboard={false}
            centered
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Alert variant={variant} className="mb-3">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-exclamation-circle fa-2x me-3"></i>
                        <div>
                            <h6 className="mb-1">Esta acción no se puede deshacer</h6>
                            <p className="mb-0">{message}</p>
                        </div>
                    </div>
                </Alert>

                {itemName && (
                    <div className="mb-3">
                        <strong>Elemento a eliminar:</strong>
                        <div className="bg-light p-2 rounded mt-1">
                            <i className="fas fa-file-alt me-2 text-muted"></i>
                            {itemName}
                        </div>
                    </div>
                )}

                {details && (
                    <div className="mb-3">
                        <strong>Detalles:</strong>
                        <div className="bg-light p-2 rounded mt-1">
                            {Array.isArray(details) ? (
                                <ul className="mb-0">
                                    {details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            ) : (
                                <div>{details}</div>
                            )}
                        </div>
                    </div>
                )}

                <div className="alert alert-warning">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Advertencia:</strong> Esta acción eliminará permanentemente el elemento y no podrá ser recuperado.
                </div>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <CancelButton
                    onClick={handleClose}
                    disabled={loading}
                >
                    Cancelar
                </CancelButton>
                <DeleteButton
                    onClick={handleDelete}
                    loading={loading}
                    disabled={loading}
                    variant="danger"
                    showConfirm={false}
                >
                    {deleteButtonText}
                </DeleteButton>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal 