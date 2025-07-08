import React from 'react'
import { Button } from 'react-bootstrap'

// Botón de Agregar con icono plus circle
export const AddButton = ({
    children = "Agregar",
    variant = "primary",
    size = "md",
    icon = "fas fa-plus-circle",
    onClick,
    disabled = false,
    loading = false,
    className = "",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled || loading}
            className={`d-flex align-items-center justify-content-center gap-2 ${className}`}
            {...props}
        >
            {loading ? (
                <div className="spinner-border spinner-border-sm" role="status"></div>
            ) : (
                <i className={icon}></i>
            )}
            {children}
        </Button>
    )
}

// Botón de Guardar con icono
export const SaveButton = ({
    children = "Guardar",
    variant = "success",
    size = "md",
    icon = "fas fa-save",
    onClick,
    disabled = false,
    loading = false,
    className = "",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled || loading}
            className={`d-flex align-items-center gap-2 ${className}`}
            {...props}
        >
            {loading ? (
                <div className="spinner-border spinner-border-sm" role="status"></div>
            ) : (
                <i className={icon}></i>
            )}
            {children}
        </Button>
    )
}

// Botón de Cancelar
export const CancelButton = ({
    children = "Cancelar",
    variant = "secondary",
    size = "md",
    icon = "fas fa-times",
    onClick,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={`d-flex align-items-center gap-2 ${className}`}
            {...props}
        >
            <i className={icon}></i>
            {children}
        </Button>
    )
}

// Botón de Editar
export const EditButton = ({
    children = "Editar",
    variant = "outline-primary",
    size = "sm",
    icon = "fas fa-edit",
    onClick,
    disabled = false,
    title = "Editar",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="px-2"
            {...props}
        >
            <i className={icon}></i>
            {children && <span className="ms-1">{children}</span>}
        </Button>
    )
}

// Botón de Eliminar
export const DeleteButton = ({
    children = "",
    variant = "outline-danger",
    size = "sm",
    icon = "fas fa-trash",
    onClick,
    disabled = false,
    title = "Eliminar",
    confirmMessage = "¿Está seguro de eliminar este elemento?",
    showConfirm = true,
    ...props
}) => {
    const handleClick = (e) => {
        e.stopPropagation()

        if (showConfirm) {
            if (window.confirm(confirmMessage)) {
                onClick && onClick()
            }
        } else {
            onClick && onClick()
        }
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleClick}
            disabled={disabled}
            title={title}
            className="px-2"
            {...props}
        >
            <i className={icon}></i>
            {children && <span className="ms-1">{children}</span>}
        </Button>
    )
}

// Botón de Ver/Ver Documento
export const ViewButton = ({
    children = "",
    variant = "outline-info",
    size = "sm",
    icon = "fas fa-eye",
    onClick,
    disabled = false,
    title = "Ver",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="px-2"
            {...props}
        >
            <i className={icon}></i>
            {children && <span className="ms-1">{children}</span>}
        </Button>
    )
}

// Botón de Cambiar Clave
export const ChangePasswordButton = ({
    children = "",
    variant = "outline-warning",
    size = "sm",
    icon = "fas fa-key",
    onClick,
    disabled = false,
    title = "Cambiar Contraseña",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="px-2"
            {...props}
        >
            <i className={icon}></i>
            {children && <span className="ms-1">{children}</span>}
        </Button>
    )
}

// Botón de Filtros
export const FilterButton = ({
    children = "Filtros",
    variant = "outline-secondary",
    size = "md",
    icon = "fas fa-filter",
    onClick,
    disabled = false,
    active = false,
    className = "",
    ...props
}) => {
    return (
        <Button
            variant={active ? variant.replace('outline-', '') : variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={`d-flex align-items-center gap-2 ${className}`}
            {...props}
        >
            <i className={icon}></i>
            {children}
        </Button>
    )
}

// Botón de Exportar
export const ExportButton = ({
    children = "Exportar",
    variant = "outline-success",
    size = "md",
    icon = "fas fa-download",
    onClick,
    disabled = false,
    loading = false,
    className = "",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled || loading}
            className={`d-flex align-items-center gap-2 ${className}`}
            {...props}
        >
            {loading ? (
                <div className="spinner-border spinner-border-sm" role="status"></div>
            ) : (
                <i className={icon}></i>
            )}
            {children}
        </Button>
    )
}

// Botón de Refrescar
export const RefreshButton = ({
    children = "",
    variant = "outline-primary",
    size = "md",
    icon = "fas fa-sync-alt",
    onClick,
    disabled = false,
    loading = false,
    title = "Actualizar",
    className = "",
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled || loading}
            title={title}
            className={`d-flex align-items-center gap-2 ${loading ? 'fa-spin' : ''} ${className}`}
            {...props}
        >
            <i className={`${icon} ${loading ? 'fa-spin' : ''}`}></i>
            {children && <span className="ms-1">{children}</span>}
        </Button>
    )
} 