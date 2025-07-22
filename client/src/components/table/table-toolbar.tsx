"use client"

import React from "react"
import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Eraser, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconButton } from "../custom/icon-button"

interface TableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
  filters?: {
    column: string
    title: string
    options: { label: string; value: string; icon?: React.ReactNode }[]
  }[]
  actions?: React.ReactNode
  onSearch?: (value: string) => void
  searchColumns?: string[]
  currentSearchValue?: string
}

export function TableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Buscar...",
  filters = [],
  actions,
  onSearch,
  searchColumns,
  currentSearchValue = ""
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchValue, setSearchValue] = React.useState(currentSearchValue)

  // Sincronizar el valor local con el valor actual del contexto
  React.useEffect(() => {
    setSearchValue(currentSearchValue)
  }, [currentSearchValue])

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue)
    } else if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue(searchValue)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClearSearch = () => {
    setSearchValue("")
    if (onSearch) {
      onSearch("")
    } else if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue("")
    }
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          {searchKey && (
            <div className="relative flex-1 max-w-[50vw] xl:max-w-sm">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-4 pr-10 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              />
              {searchValue && (
                <IconButton
                  tooltip="Limpiar busqueda"
                  color="orange"
                  onClick={handleClearSearch}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                  children={<Eraser className="h-3 w-3" />}
                />
              )}
              <IconButton
                tooltip="Clic para buscar o presionar enter"
                color="dark"
                onClick={handleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                children={<Search className="h-3 w-3" />}
              />
            </div>
          )}
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {actions}
        </div>
      </div>
    </div>
  )
} 