"use client"

import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface TablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  totalItems?: number
  currentPage?: number
  totalPages?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function TablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 50],
  totalItems = 0,
  currentPage = 0,
  totalPages = 0,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps<TData>) {
  // Detectar si es móvil
  const isMobile = useIsMobile()

  // Usar pageSize de props si está disponible, sino usar el del estado de la tabla
  const currentPageSize = pageSize || table.getState().pagination.pageSize

  // Calcular qué números de página mostrar
  const getPageNumbers = () => {
    const pages = []

    // Siempre mostrar la primera página
    if (totalPages > 0) {
      pages.push(0)
    }

    // En móvil, mostrar menos páginas
    if (isMobile) {
      // Si estamos en una página que no es la primera ni la última, mostrarla
      if (currentPage > 0 && currentPage < totalPages - 1) {
        pages.push(currentPage)
      }
    } else {
      // En desktop, mostrar páginas alrededor de la actual
      for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }
    }

    // Siempre mostrar la última página si hay más de una
    if (totalPages > 1 && !pages.includes(totalPages - 1)) {
      pages.push(totalPages - 1)
    }

    // Ordenar las páginas
    return pages.sort((a, b) => a - b)
  }

  const pageNumbers = getPageNumbers()

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    } else {
      table.setPageIndex(page)
    }
  }

  const handlePageSizeChange = (pageSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(pageSize)
    } else {
      table.setPageSize(pageSize)
    }
  }

  const canGoPrevious = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          Mostrando {currentPage * currentPageSize + 1} a{" "}
          {Math.min((currentPage + 1) * currentPageSize, totalItems)} de{" "}
          {totalItems} resultados
        </span>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canGoPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Números de página */}
          {pageNumbers.map((pageIndex, i) => {
            const isCurrentPage = pageIndex === currentPage

            // Si hay un salto entre páginas, mostrar puntos suspensivos
            if (i > 0 && pageIndex > pageNumbers[i - 1] + 1) {
              return (
                <div key={`ellipsis-${pageIndex}`} className="px-2">
                  ...
                </div>
              )
            }

            return (
              <Button
                key={pageIndex}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                className="h-8 w-8"
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex + 1}
              </Button>
            )
          })}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={`${currentPageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue>{currentPageSize}/página</SelectValue>
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}/página
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
} 