"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/table/table-pagination"
import { TableSkeleton } from "@/components/table/table-skeleton"
import { useIsMobile } from "@/hooks/use-mobile"

export interface PaginatedData<T> {
  data: T[]
  total: number
  page?: number
  size?: number
  totalPages?: number
}

interface BackendTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: PaginatedData<TData>
  loading?: boolean
  toolbar?: (table: ReturnType<typeof useReactTable>) => React.ReactNode
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  searchKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  // Nuevas props para manejar selección externa
  selectedRowIds?: string[] | number[]
  onSelectionChange?: (table: any) => void
  rowIdAccessor?: string
}

export function BackendTable<TData, TValue>({
  columns,
  data,
  loading = false,
  toolbar,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  searchKey,
  searchValue,
  onSearchChange,
  selectedRowIds = [],
  onSelectionChange,
  rowIdAccessor = "id",
}: BackendTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Detectar si es móvil
  const isMobile = useIsMobile()

  // Sincronizar selección externa con estado interno
  useEffect(() => {
    if (selectedRowIds && selectedRowIds.length >= 0) {
      const newRowSelection: Record<string, boolean> = {}
      
      // Crear un mapa de selección basado en los IDs de las filas actuales
      data.data.forEach((row: any, index) => {
        const rowId = row[rowIdAccessor]
        const isSelected = selectedRowIds.some(id => id === rowId)
        if (isSelected) {
          newRowSelection[index.toString()] = true
        }
      })
      
      setRowSelection(newRowSelection)
    }
  }, [selectedRowIds, data.data, rowIdAccessor])

  // Ajustar la visibilidad de columnas según el tamaño de pantalla
  useEffect(() => {
    if (isMobile) {
      // En móvil, ocultar algunas columnas menos importantes
      setColumnVisibility({
        fechaRegistro: false,
        ...columnVisibility,
      })
    }
  }, [isMobile])

  // Configurar filtros de búsqueda
  useEffect(() => {
    if (searchKey && searchValue !== undefined) {
      const column = table?.getColumn(searchKey)
      if (column) {
        column.setFilterValue(searchValue)
      }
    }
  }, [searchKey, searchValue])

  const table = useReactTable({
    data: data.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
    // Deshabilitar la paginación del cliente ya que usamos paginación del servidor
    manualPagination: true,
    pageCount: data.totalPages || Math.ceil(data.total / pageSize),
  })

  useEffect(() => {
    // Ocultar automáticamente la columna id si existe
    if (table.getAllColumns().find((col) => col.id === "id")) {
      table.getColumn("id")?.toggleVisibility(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Ejecutar solo una vez al montar el componente

  // Notificar al componente padre cuando cambie la selección
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(table)
    }
  }, [rowSelection, onSelectionChange, table])

  // Mostrar skeleton mientras carga
  if (loading) {
    return <TableSkeleton columns={columns.length} rows={pageSize} />
  }

  const currentPage = data.page || 0
  const totalPages = data.totalPages || Math.ceil(data.total / pageSize)

  return (
    <div className="space-y-4">
      {toolbar && toolbar(table as any)}
      <div className="rounded-md border border-gray-200 overflow-hidden dark:border-stone-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="py-2 px-6 bg-gray-200 dark:bg-stone-900 text-primary font-bold">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-t border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-primary/10"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2 px-6">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination && (
        <TablePagination 
          table={table} 
          pageSizeOptions={pageSizeOptions}
          totalItems={data.total}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={data.size || pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  )
} 