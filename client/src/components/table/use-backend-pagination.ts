import { useState, useCallback, useEffect } from 'react'

interface UseBackendPaginationProps {
  initialPage?: number
  initialPageSize?: number
  onPageChange?: (page: number, pageSize: number) => void
  debounceMs?: number
}

interface PaginationState {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export function useBackendPagination({
  initialPage = 0,
  initialPageSize = 10,
  onPageChange,
  debounceMs = 300,
}: UseBackendPaginationProps = {}) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  })

  const [loading, setLoading] = useState(false)

  // Función para cambiar de página
  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }))
  }, [])

  // Función para cambiar el tamaño de página
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({
      ...prev,
      page: 0, // Reset a la primera página cuando cambia el tamaño
      pageSize: newPageSize,
    }))
  }, [])

  // Función para actualizar los datos de paginación
  const updatePaginationData = useCallback((data: { total: number; totalPages?: number }) => {
    setPagination(prev => ({
      ...prev,
      total: data.total,
      totalPages: data.totalPages || Math.ceil(data.total / prev.pageSize),
    }))
  }, [])

  // Efecto para llamar a onPageChange cuando cambia la paginación
  useEffect(() => {
    if (onPageChange) {
      const timeoutId = setTimeout(() => {
        onPageChange(pagination.page, pagination.pageSize)
      }, debounceMs)

      return () => clearTimeout(timeoutId)
    }
  }, [pagination.page, pagination.pageSize, onPageChange, debounceMs])

  return {
    pagination,
    loading,
    setLoading,
    handlePageChange,
    handlePageSizeChange,
    updatePaginationData,
  }
} 