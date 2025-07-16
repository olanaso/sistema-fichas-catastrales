"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ExternalLink, 
  Home,
  Users,
  Settings,
  ClipboardList,
  Ticket,
  Group,
  Import,
  UserCog,
  Layers,
  ArrowRightCircle,
  Bubbles
} from "lucide-react";

export interface TabItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
}

interface TabbedLayoutProps {
  tabs: TabItem[];
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBreadcrumb?: boolean;
  className?: string;
}

export function TabbedLayout({
  tabs,
  children,
  title = "Navegación",
  description,
  showBreadcrumb = true,
  className
}: TabbedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState<string>("");

  // Determinar la pestaña activa basada en la ruta actual
  React.useEffect(() => {
    const currentTab = tabs.find(tab => tab.href === pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    } else if (tabs.length > 0) {
      // Si no hay coincidencia exacta, usar la primera pestaña
      setActiveTab(tabs[0].id);
    }
  }, [pathname, tabs]);

  const handleTabClick = (tab: TabItem) => {
    if (tab.disabled) return;
    
    setActiveTab(tab.id);
    if (tab.external) {
      window.open(tab.href, '_blank');
    } else {
      router.push(tab.href);
    }
  };

  const getActiveTab = () => tabs.find(tab => tab.id === activeTab);

  return (
    <div className={cn("flex h-full", className)}>
      {/* Pestañas laterales */}
      <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="space-y-4 p-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bubbles className="size-4" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Breadcrumb */}
          {showBreadcrumb && getActiveTab() && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Navegando a:</span>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium text-foreground">
                {getActiveTab()?.title}
              </span>
            </div>
          )}

          {/* Lista de pestañas */}
          <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isCurrentPath = pathname === tab.href;

              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-auto p-3",
                    isActive && "bg-secondary text-secondary-foreground",
                    isCurrentPath && "ring-2 ring-primary/20",
                    tab.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleTabClick(tab)}
                  disabled={tab.disabled}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{tab.title}</span>
                      {tab.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {tab.badge}
                        </Badge>
                      )}
                      {tab.external && (
                        <ExternalLink className="h-3 w-3" />
                      )}
                    </div>
                    {tab.description && (
                      <span className="text-xs text-muted-foreground text-left">
                        {tab.description}
                      </span>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

// Componente de ejemplo con pestañas predefinidas
export function SistemaFichasTabbedLayout({ children }: { children: React.ReactNode }) {
  const tabs: TabItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Vista general del sistema",
      icon: Home,
      href: "/dashboard"
    },
    {
      id: "configuracion",
      title: "Configuración",
      description: "Parámetros del sistema",
      icon: Settings,
      href: "/configuracion"
    },
    {
      id: "supervisores",
      title: "Supervisores",
      description: "Gestión de supervisores",
      icon: UserCog,
      href: "/supervisores"
    },
    {
      id: "inspectores",
      title: "Inspectores",
      description: "Gestión de inspectores",
      icon: Users,
      href: "/inspectores"
    },
    {
      id: "importar",
      title: "Importar",
      description: "Importación de datos",
      icon: Import,
      href: "/importar"
    },
    {
      id: "gestion-padron",
      title: "Gestión de Padrón",
      description: "Administración del padrón",
      icon: ClipboardList,
      href: "/gestion-padron"
    },
    {
      id: "gestion-fichas",
      title: "Gestión de Fichas",
      description: "Administración de fichas catastrales",
      icon: Ticket,
      href: "/gestion-fichas"
    },
    {
      id: "grupos-trabajo",
      title: "Grupos de Trabajo",
      description: "Gestión de grupos de trabajo",
      icon: Group,
      href: "/grupos-trabajo"
    },
    {
      id: "asignacion-carga",
      title: "Asignación de Carga",
      description: "Distribución de trabajo",
      icon: Layers,
      href: "/asignacion-carga"
    },
    {
      id: "migracion-sici",
      title: "Migración SICI",
      description: "Migración desde SICI",
      icon: ArrowRightCircle,
      href: "/migracion-sici"
    }
  ];

  return (
    <TabbedLayout
      tabs={tabs}
      title="SIS FICHAS"
      description="Sistema de Fichas Catastrales"
      showBreadcrumb={true}
    >
      {children}
    </TabbedLayout>
  );
} 