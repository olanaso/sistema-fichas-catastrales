"use client"

import * as React from "react"
import { Info, Monitor, Moon, Sun, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/hooks/use-auth"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { toast } from "sonner"
import Link from "next/link"

interface NavbarProps {
  title?: string
  description?: string
  breadcrumb?: {
    icon?: React.ReactNode
    text: string
    path: string
  }[]
}

export function Navbar({ title, description, breadcrumb }: NavbarProps) {
  const { setTheme } = useTheme()
  const { user, logout, hasTotalAccess } = useAuth()

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada exitosamente");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.nombre?.charAt(0) || "";
    const lastName = user.apellidopa?.charAt(0) || "";
    return `${firstName}${lastName}`.toUpperCase();
  };

  const getUserFullName = () => {
    if (!user) return "Usuario";
    return `${user.nombre} ${user.apellidopa} ${user.apellidoma}`.trim();
  };

  const getUserAccessLevel = () => {
    if (!user) return "Usuario";
    return user.accesototal === 1 ? "Acceso Total" : "Acceso Limitado";
  };

  return (
    <div className="border-b">
      <div className="flex items-center px-2 sm:px-6 py-2">
        <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
            <div className="flex flex-col gap-1">
              {title && (
                <div className="flex items-center gap-2">
                  <h1 className="text-md md:text-lg font-semibold">{title}</h1>
                  {description && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{description}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}
              {breadcrumb && <Breadcrumb items={breadcrumb} />}
            </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificaciones</span>
          </Button> */}
          
          {/* Selector de tema */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Cambiar tema</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 mr-2" />
                 Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 mr-2" />
                 Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="h-4 w-4 mr-2" />
                 Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menú de usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserFullName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {getUserAccessLevel()}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/cuenta" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Cuenta</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
} 