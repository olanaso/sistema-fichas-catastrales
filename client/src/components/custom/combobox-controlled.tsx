"use client"

import { useState, forwardRef, useEffect, useRef } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { ComboboxOption, ComboboxProps } from "@/types/combobox"
import "./combobox-scroll.css"

interface ComboboxControlledProps extends ComboboxProps {
  options: ComboboxOption[]
  loading?: boolean
  onSearch?: (searchTerm: string) => void
}

export const ComboboxControlled = forwardRef<HTMLButtonElement, ComboboxControlledProps>(
  (
    {
      options = [],
      value,
      onChange,
      onBlur,
      placeholder = "Seleccionar opción...",
      searchPlaceholder = "Buscar...",
      emptyMessage = "No se encontraron opciones.",
      disabled = false,
      loading = false,
      className,
      width = "w-full min-w-0",
      label,
      description,
      error,
      required = false,
      onSearch,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((option) => option.value === value)

    const handleSelect = (selectedValue: string | number) => {
      const newValue = selectedValue === value ? "" : selectedValue
      onChange?.(newValue)
      setOpen(false)
    }

    const handleSearch = (search: string) => {
      setSearchValue(search)
      onSearch?.(search)
    }

    const filteredOptions = onSearch
      ? options
      : options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))

    return (
      <div className="space-y-2 w-full">
        {label && (
          <Label className={cn(required && "after:content-['*'] after:text-red-500 after:ml-1")}>{label}</Label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled || loading}
              onBlur={onBlur}
              className={cn(
                "justify-between w-full min-w-0",
                !value && "text-muted-foreground",
                error && "border-red-500 focus-visible:ring-red-500",
                className,
              )}
              {...props}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
                {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
                <span className="truncate text-left">{selectedOption ? selectedOption.label : placeholder}</span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent 
            className={cn(
              "p-0 w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] sm:max-w-[400px]",
              "min-w-[200px]"
            )} 
            align="start"
            sideOffset={4}
          >
            <Command>
              <CommandInput
                placeholder={searchPlaceholder}
                value={searchValue}
                onValueChange={handleSearch}
                className="h-9"
              />
              
              {/* Contenedor de scroll nativo */}
              <div 
                ref={scrollContainerRef}
                className="combobox-scroll-container max-h-[200px] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
              >
                {filteredOptions.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </div>
                ) : (
                  <div className="p-1">
                    {filteredOptions.map((option) => (
                      <div
                        key={option.value}
                        className={cn(
                          "combobox-item relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          option.value === value && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => handleSelect(option.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleSelect(option.value)
                          }
                        }}
                        tabIndex={0}
                        role="option"
                        aria-selected={option.value === value}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {option.icon && <span className="shrink-0">{option.icon}</span>}
                          <span className="truncate">{option.label}</span>
                        </div>
                        <Check className={cn("ml-auto h-4 w-4 shrink-0", option.value === value ? "opacity-100" : "opacity-0")} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Command>
          </PopoverContent>
        </Popover>

        {description && !error && <p className="text-xs text-muted-foreground">{description}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)

ComboboxControlled.displayName = "ComboboxControlled"
