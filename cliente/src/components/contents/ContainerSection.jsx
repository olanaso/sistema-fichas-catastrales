import React from 'react'

function ContainerSection({ title, children }) {
    return (
        <div className='container-section'>
            <div className="container-header">
                <span>{title}</span>
            </div>
            <div className="register-container">
                {children}
            </div>
        </div>
    )
}

export default ContainerSection
