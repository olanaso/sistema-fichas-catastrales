"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTablePagination } from "@/components/custom/data-table-pagination"
import { DataTableSkeleton } from "@/components/custom/data-table-skeleton"
import { useIsMobile } from "@/hooks/use-mobile"

interface TableSelectProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  toolbar?: (table: ReturnType<typeof useReactTable>) => React.ReactNode
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  // Props para manejo de selección externa
  onSelectionChange?: (selectedIds: number[]) => void
  selectedIds?: number[]
  idField?: string // Campo que contiene el ID único de cada fila
  loading?: boolean
}

export function TableSelect<TData, TValue>({
  columns,
  data,
  toolbar,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onSelectionChange,
  selectedIds = [],
  idField = "id",
  loading = false,
}: TableSelectProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Detectar si es móvil
  const isMobile = useIsMobile()

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

  // Función para sincronizar la selección externa con la selección interna de la tabla
  const syncExternalSelection = useCallback(() => {
    if (!onSelectionChange) return

    const newRowSelection: Record<string, boolean> = {}
    
    data.forEach((row, index) => {
      const rowId = (row as any)[idField]
      if (selectedIds.includes(rowId)) {
        newRowSelection[index.toString()] = true
      }
    })


    setRowSelection(newRowSelection)
  }, [data, selectedIds, idField, onSelectionChange])

  // Sincronizar selección cuando cambien los datos o IDs seleccionados
  useEffect(() => {
    syncExternalSelection()
  }, [syncExternalSelection])

  // Función para manejar cambios en la selección de filas
  const handleRowSelectionChange = useCallback((updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
    const newRowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue
    setRowSelection(newRowSelection)

    // Convertir la selección de la tabla a IDs y notificar al componente padre
    if (onSelectionChange) {
      const selectedRowIds: number[] = []
      
      Object.keys(newRowSelection).forEach((rowIndex) => {
        if (newRowSelection[rowIndex]) {
          const row = data[parseInt(rowIndex)]
          const rowId = (row as any)[idField]
          if (rowId !== undefined) {
            selectedRowIds.push(rowId)
          }
        }
      })

      onSelectionChange(selectedRowIds)
    }
  }, [data, idField, onSelectionChange, rowSelection])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: handleRowSelectionChange,
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
  })

  useEffect(() => {
    // Ocultar automáticamente la columna id si existe
    if (table.getAllColumns().find((col) => col.id === "id")) {
      table.getColumn("id")?.toggleVisibility(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Ejecutar solo una vez al montar el componente

  // Mostrar skeleton si está cargando
  if (loading) {
    return <DataTableSkeleton columns={columns.length} rows={pageSize} />
  }

  return (
    <div className="space-y-4">
      {toolbar && toolbar(table as any)}
      <div className="rounded-md border border-gray-200 overflow-hidden dark:border-stone-900">
        <div className="!overflow-x-auto">
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
      {pagination && <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />}
    </div>
  )
} 