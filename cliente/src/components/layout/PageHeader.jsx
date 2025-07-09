import React from 'react'
import { Breadcrumb, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PageHeader = ({ title, breadcrumbItems = [], actions = null }) => {
    return (
        <div className="">
            <div className="container-fluid py-3">
                <Row className="align-items-left">
                    <Col>
                        {/* Breadcrumb simplificado */}
                        {breadcrumbItems.length > 0 && (
                            <Breadcrumb className="mb-2">
                                {breadcrumbItems.map((item, index) => (
                                    <Breadcrumb.Item
                                        key={index}
                                        active={index === breadcrumbItems.length - 1}
                                        linkAs={item.href ? Link : undefined}
                                        linkProps={item.href ? { to: item.href } : {}}
                                    >
                                        {item.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        )}

                        {/* Título de la página */}
                        <h4 className=" fw-bold text-dark d-flex justify-content-left">{title}</h4>
                    </Col>

                    {/* Acciones */}
                    {actions && (
                        <Col xs="12">
                            {actions}
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default PageHeader 