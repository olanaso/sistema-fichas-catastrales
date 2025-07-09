"use client";

import * as React from "react";
import {
  Home,
  Users,
  Settings,
  Building2,
  Package,
  MessageSquare,
  Bubbles,
  EllipsisVertical,
  LogOut,
  Calendar,
  Presentation,
  Send,
  MoveUpRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

// Datos del menú principal
const menuInicio = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Calendario",
    url: "/calendario",
    icon: Calendar,
  },
];

const menuConfiguracion = [
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: Users,
  },
];

const menuGestion = [
  {
    title: "Instituciones",
    url: "/instituciones",
    icon: Building2,
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: Package,
  },
  {
    title: "Consultas",
    url: "/consultas",
    icon: MessageSquare,
  },
];

const menuCapacitacion = [
  {
    title: "Solicitudes",
    url: "/solicitudes",
    icon: Send,
  },
  {
    title: "Reuniones",
    url: "/reuniones",
    icon: Presentation,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const isCollapsed = state === "collapsed";

  // Obtener las iniciales del nombre para el Avatar
  const getInitials = () => {
    if (!user) return "U";
    return `${user.nombres.charAt(0)}${user.apellidos.charAt(0)}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada exitosamente");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center py-2">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Bubbles className="size-4" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Gestión de Ideas SAC</span>
                    <span className="text-xs text-sidebar-foreground/70">
                      v1.0.0
                    </span>
                  </div>
                )}
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Inicio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuInicio.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuGestion.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Capacitación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuCapacitacion.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuConfiguracion.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip="Usuario">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="text-sm font-medium">
                        {user?.nombres} {user?.apellidos}
                      </span>
                      <span className="text-xs text-sidebar-foreground/70">
                        {user?.email}
                      </span>
                    </div>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                alignOffset={-4}
                side="right"
                sideOffset={8}
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
