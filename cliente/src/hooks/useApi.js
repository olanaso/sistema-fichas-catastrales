import { useState, useEffect } from 'react'

// Hook personalizado para manejar peticiones HTTP
export const useApi = (apiFunction, dependencies = []) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const execute = async (...args) => {
        try {
            setLoading(true)
            setError(null)

            const result = await apiFunction(...args)

            if (result.success) {
                setData(result.data)
                return result
            } else {
                setError(result.error)
                return result
            }
        } catch (err) {
            const errorMessage = err.message || 'Error inesperado'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    // Auto-ejecutar si hay dependencias
    useEffect(() => {
        if (dependencies.length > 0) {
            execute()
        }
    }, dependencies)

    return {
        data,
        loading,
        error,
        execute,
        setData,
        setError
    }
}

// Hook para peticiones con paginación
export const usePagination = (apiFunction, initialPage = 1, pageSize = 10) => {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadPage = async (page = currentPage) => {
        try {
            setLoading(true)
            setError(null)

            const result = await apiFunction({
                page,
                size: pageSize
            })

            if (result.success) {
                const { data, total, totalPages: pages } = result.data
                setItems(data)
                setTotalItems(total)
                setTotalPages(pages)
                setCurrentPage(page)
            } else {
                setError(result.error)
            }
        } catch (err) {
            setError(err.message || 'Error al cargar datos')
        } finally {
            setLoading(false)
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            loadPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            loadPage(currentPage - 1)
        }
    }

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            loadPage(page)
        }
    }

    useEffect(() => {
        loadPage(1)
    }, [])

    return {
        items,
        loading,
        error,
        currentPage,
        totalPages,
        totalItems,
        nextPage,
        prevPage,
        goToPage,
        reload: () => loadPage(currentPage)
    }
}

// Hook para formularios con API
export const useForm = (initialData = {}, submitFunction) => {
    const [formData, setFormData] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()

        try {
            setLoading(true)
            setError(null)
            setSuccess(false)

            const result = await submitFunction(formData)

            if (result.success) {
                setSuccess(true)
                return result
            } else {
                setError(result.error)
                return result
            }
        } catch (err) {
            const errorMessage = err.message || 'Error al enviar formulario'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setFormData(initialData)
        setError(null)
        setSuccess(false)
    }

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
        reset,
        setFormData
    }
} 