import type React from "react"
import type { CalendarEvent as CalendarEventType } from "@/types/calendar.types"
import { Clock } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface CalendarEventProps {
  event: CalendarEventType
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="w-full px-2 py-1.5 text-xs font-medium rounded-md mb-1 hover:opacity-90 transition-all flex justify-between items-center cursor-pointer text-white"
          style={{ 
            backgroundColor: event.color,
            borderLeft: `3px solid ${event.color}`,
          }}
        >
          <span className="font-light flex-shrink-0 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.hora_inicio}
          </span>
          <span className="truncate ml-2">{event.title}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{event.hora_inicio} - {event.hora_fin}</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{event.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {event.description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
