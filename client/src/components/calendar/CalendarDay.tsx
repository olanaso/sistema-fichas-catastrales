"use client"

import type React from "react"
import type { CalendarDay as CalendarDayType } from "@/types/calendar.types"
import { CalendarEvent } from "./CalendarEvent"

interface CalendarDayProps {
  day: CalendarDayType
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ day }) => {
  const { date, events, isCurrentMonth } = day
  const isToday = new Date().toDateString() === date.toDateString()
  const hasMoreThanThreeEvents = events.length > 3
  const dateNumber = date.getDate()

  // Dates that need tighter letter spacing
  const needsTighterSpacing = [10, 12, 13, 15, 16, 17, 18, 19, 21, 31].includes(dateNumber)
  // 11 needs extra tight spacing
  const needsExtraTightSpacing = dateNumber === 11

  return (
    <div
      className={`aspect-square relative border border-muted ${
        isCurrentMonth 
          ? "bg-background hover:bg-accent/30 transition-colors" 
          : "bg-muted/30"
      } ${
        hasMoreThanThreeEvents ? "cursor-pointer" : ""
      }`}
    >
      {/* Large background date number - positioned in upper left with consistent padding */}
      <div className="absolute top-1 left-1 pointer-events-none z-0">
        <span
          className={`text-6xl font-bebas-neue select-none leading-none ${
            isToday 
              ? "text-primary dark:text-green-500" 
              : isCurrentMonth ? "text-muted-foreground" : "text-muted-foreground/50"
          } ${needsExtraTightSpacing ? "" : needsTighterSpacing ? "tracking-tighter" : ""}`}
          style={{
            fontFamily: "var(--font-bebas-neue)",
            ...(needsExtraTightSpacing && { letterSpacing: "-0.1em" }),
          }}
        >
          {dateNumber}
        </span>
      </div>

      {/* Content layer - positioned to align with date baseline */}
      <div className="relative z-10 h-full">
        {/* Events container with scrolling when more than 3 events */}
        <div className="absolute top-[78px] left-1 right-1 bottom-1 overflow-y-auto overflow-x-hidden">
          {events.map((event) => (
            <CalendarEvent key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Visual indicator for clickable dates */}
      {hasMoreThanThreeEvents && (
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-primary/60 rounded-full"></div>
      )}
    </div>
  )
}
