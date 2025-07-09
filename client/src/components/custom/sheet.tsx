"use client"

import { type ReactNode } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface CustomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
}

export function CustomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: CustomSheetProps) {

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full overflow-y-auto pb-5">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">{description}</SheetDescription>
        </SheetHeader>

        <div className="flex-1">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
