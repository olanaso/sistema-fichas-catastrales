import type React from "react"
import { CalendarDay as CalendarDayComponent } from "./CalendarDay"
import type { CalendarDay as CalendarDayType } from "@/types/calendar.types"

interface CalendarGridProps {
  days: CalendarDayType[]
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
  const weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  const today = new Date()
  const currentDayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Check if today is in the current month being displayed
  const currentMonth = days.find((day) => day.isCurrentMonth)?.date.getMonth()
  const currentYear = days.find((day) => day.isCurrentMonth)?.date.getFullYear()
  const isTodayInCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear

  return (
    <div className="w-full">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-px mb-1">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-left pl-1 text-sm font-light py-2 uppercase ${
              index + 1 === currentDayOfWeek && isTodayInCurrentMonth 
                ? "text-primary dark:text-green-500" 
                : "text-muted-foreground"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px w-full bg-muted/20 rounded-lg overflow-hidden">
        {days.map((day, index) => (
          <CalendarDayComponent key={index} day={day} />
        ))}
      </div>
    </div>
  )
}
