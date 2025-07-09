"use client"

import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarHeaderProps {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const month = monthNames[currentDate.getMonth()]
  const year = currentDate.getFullYear()

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {month} {year}
        </h2>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={onToday}
          variant="outline"
          size="sm"
          className="font-normal"
        >
          Hoy
        </Button>

        <div className="flex">
          <Button
            onClick={onPrevMonth}
            variant="outline"
            size="icon"
            className="rounded-r-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={onNextMonth}
            variant="outline"
            size="icon"
            className="rounded-l-none"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
