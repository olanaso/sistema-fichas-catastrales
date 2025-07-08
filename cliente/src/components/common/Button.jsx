import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    disabled = false,
    loading = false,
    icon,
    children,
    className = '',
    ...props 
}) => {
    return (
        <BootstrapButton
            variant={variant}
            size={size}
            disabled={disabled || loading}
            className={className}
            {...props}
        >
            {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}
            {icon && !loading && (
                <i className={`${icon} me-2`}></i>
            )}
            {children}
        </BootstrapButton>
    )
}

export default Button 