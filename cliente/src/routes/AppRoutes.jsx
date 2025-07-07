import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

// Vistas demo (con layout)
import Home from '../pages/demo/views/Home'
import About from '../pages/demo/views/About'
import Contact from '../pages/demo/views/Contact'

// Vistas de autenticación (sin layout)
import Login from '../pages/auth/views/Login'
import ForgotPassword from '../pages/auth/views/ForgotPassword'
import ResetPassword from '../pages/auth/views/ResetPassword'
import Dashboard from '../pages/auth/views/Dashboard'

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Rutas demo con layout */}
                <Route path="/" element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                } />
                <Route path="/about" element={
                    <MainLayout>
                        <About />
                    </MainLayout>
                } />
                <Route path="/contact" element={
                    <MainLayout>
                        <Contact />
                    </MainLayout>
                } />

                {/* Rutas de autenticación sin layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 