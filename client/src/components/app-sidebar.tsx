"use client";

import * as React from "react";
import {
  Home,
  Users,
  Settings,
  Bubbles,
  UserCog,
  Group,
  Import,
  ClipboardList,
  Ticket,
  ArrowRightCircle,
  Layers,
  Component,
  Puzzle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { toast } from "sonner";

// Datos del menú principal
const menuInicio = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
];

const menuConfiguracion = [
  {
    title: "Parámetros",
    url: "/configuracion",
    icon: Settings,
  },
  {
    title: "Usuarios del sistema",
    url: "/supervisores",
    icon: UserCog,
  },
  {
    title: "Inspectores",
    url: "/inspectores",
    icon: Users,
  },
];

const menuGestion = [
  {
    title: "Importar",
    url: "/importar",
    icon: Import,
  },
  {
    title: "Gestión de padrón",
    url: "/gestion-padron",
    icon: ClipboardList,
  },
];

const menuFichas = [
  {
    title: "Gestión de fichas",
    url: "/gestion-fichas",
    icon: Ticket,
  },
  // {
  //   title: "Migración SICI",
  //   url: "/migracion-sici",
  //   icon: ArrowRightCircle,
  // },
];

const menuCapacitacion = [
  {
    title: "Grupos de trabajo",
    url: "/grupos-trabajo",
    icon: Group,
  },
  {
    title: "Asignación de carga",
    url: "/asignacion-carga",
    icon: Layers,
  },
];

const menuModulos = [
  {
    title: "Modulos",
    url: "/modulos",
    icon: Component,
  },
  {
    title: "Tipos de datos",
    url: "/tipos-datos",
    icon: Puzzle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { user, logout, hasTotalAccess, canAccessView } = useAuth();
  const isCollapsed = state === "collapsed";
  const [isMounted, setIsMounted] = React.useState(false);

  // Evitar error de hidratación
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Obtener las iniciales del nombre para el Avatar
  const getInitials = () => {
    if (!user) return "U";
    const firstName = user.nombre?.charAt(0) || "";
    const lastName = user.apellidopa?.charAt(0) || "";
    return `${firstName}${lastName}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada exitosamente");
  };

  // Filtrar menús según el acceso del usuario
  const getFilteredMenu = (menuItems: any[]) => {
    if (!isMounted) return []; // No mostrar nada hasta que se monte en el cliente
    
    if (hasTotalAccess()) {
      return menuItems; // Acceso total, mostrar todo
    }
    
    // Acceso limitado, filtrar por vistas permitidas
    return menuItems.filter(item => canAccessView(item.url.replace('/', '')));
  };

  const filteredMenuConfiguracion = getFilteredMenu(menuConfiguracion);
  const filteredMenuGestion = getFilteredMenu(menuGestion);
  const filteredMenuFichas = getFilteredMenu(menuFichas);
  const filteredMenuCapacitacion = getFilteredMenu(menuCapacitacion);
  const filteredMenuModulos = getFilteredMenu(menuModulos);

  // No renderizar nada hasta que se monte en el cliente
  if (!isMounted) {
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
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">SIS FICHAS</span>
                    <span className="text-xs text-sidebar-foreground/70">
                      v1.0.0
                    </span>
                  </div>
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
        </SidebarContent>
      </Sidebar>
    );
  }

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
                    <span className="font-semibold">SIS FICHAS</span>
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

        {/* Solo mostrar si el usuario tiene acceso total o puede acceder a estas vistas */}
        {(hasTotalAccess() || filteredMenuGestion.length > 0) && (
          <SidebarGroup>
            <SidebarGroupLabel>Padrón Catastral</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMenuGestion.map((item) => {
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
        )}

        {/* Solo mostrar si el usuario tiene acceso total o puede acceder a estas vistas */}
        {(hasTotalAccess() || filteredMenuCapacitacion.length > 0) && (
          <SidebarGroup>
            <SidebarGroupLabel>Equipos y Asignaciones</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMenuCapacitacion.map((item) => {
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
        )}

        {/* Solo mostrar si el usuario tiene acceso total o puede acceder a estas vistas */}
        {(hasTotalAccess() || filteredMenuFichas.length > 0) && (
          <SidebarGroup>
            <SidebarGroupLabel>Fichas Catastrales</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMenuFichas.map((item) => {
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
        )}

        {/* Solo mostrar si el usuario tiene acceso total o puede acceder a estas vistas */}
        {(hasTotalAccess() || filteredMenuModulos.length > 0) && (
          <SidebarGroup>
          <SidebarGroupLabel>Modulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuModulos.map((item) => {
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
        )}
        {/* Solo mostrar si el usuario tiene acceso total o puede acceder a estas vistas */}
        {(hasTotalAccess() || filteredMenuConfiguracion.length > 0) && (
          <SidebarGroup>
            <SidebarGroupLabel>Configuración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMenuConfiguracion.map((item) => {
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
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
