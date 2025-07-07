import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Home from '../pages/demo/views/Home'
import About from '../pages/demo/views/About'
import Contact from '../pages/demo/views/Contact'
import ApiExample from '../pages/demo/views/ApiExample'

function AppRoutes() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/api-example" element={<ApiExample />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 