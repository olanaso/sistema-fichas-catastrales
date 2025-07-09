"use client"

import { type ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface CustomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
}

export function CustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
}: CustomDialogProps) {

  const sizeClasses = {
    sm: "!max-w-sm",
    md: "!max-w-md", 
    lg: "!max-w-lg",
    xl: "!max-w-xl",
    "2xl": "!max-w-2xl",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "flex flex-col max-h-[90vh] overflow-y-auto",
        sizeClasses[size]
      )}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1">{children}</div>
      </DialogContent>
    </Dialog>
  )
} 