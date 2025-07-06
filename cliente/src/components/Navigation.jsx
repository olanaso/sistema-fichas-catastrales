import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            marginBottom: '2rem'
        }}>
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                    Inicio
                </Link>
                <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>
                    Acerca de
                </Link>
                <Link to="/contact" style={{ textDecoration: 'none', color: '#333' }}>
                    Contacto
                </Link>
                <Link to="/api-example" style={{ textDecoration: 'none', color: '#007bff' }}>
                    🔗 API Examples
                </Link>
            </div>
        </nav>
    )
}

export default Navigation 