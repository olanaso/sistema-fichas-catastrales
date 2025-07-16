"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

export interface TabItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
}

interface DynamicTabbedLayoutProps {
  tabs: TabItem[];
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function DynamicTabbedLayout({
  tabs,
  children,
  className,
  activeTab: externalActiveTab,
  onTabChange
}: DynamicTabbedLayoutProps) {
  const isMobile = useIsMobile();
  const [internalActiveTab, setInternalActiveTab] = React.useState<string>(tabs[0]?.id || "");
  
  // Usar el tab activo externo si se proporciona, sino usar el interno
  const activeTab = externalActiveTab || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  // Componente del sidebar
  const SidebarContent = () => (
    <div className="space-y-2 p-2">
      {/* Lista de pestañas */}
      <div className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          const TabButton = (
            <Button
              key={tab.id}
              variant={isActive ? "secondary" : "ghost"}
              size={isMobile ? "sm" : "default"}
              className={cn(
                "w-full justify-start gap-2 h-auto",
                isMobile ? "p-2" : "p-2",
                isActive && "bg-secondary text-secondary-foreground",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {Icon && <Icon className={cn("h-4 w-4", isMobile && "h-5 w-5")} />}
              {!isMobile && (
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{tab.title}</span>
                    {tab.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {tab.badge}
                      </Badge>
                    )}
                  </div>
                  {tab.description && (
                    <span className="text-xs text-muted-foreground text-left">
                      {tab.description}
                    </span>
                  )}
                </div>
              )}
            </Button>
          );

          // En móvil, envolver con tooltip
          if (isMobile) {
            return (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  {TabButton}
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[200px]">
                  <div className="space-y-1">
                    <p className="font-medium">{tab.title}</p>
                    {tab.description && (
                      <p className="text-xs text-muted-foreground">{tab.description}</p>
                    )}
                    {tab.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {tab.badge}
                      </Badge>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return TabButton;
        })}
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className={cn("flex h-full", className)}>
        {/* Sidebar - siempre visible, más compacto en móvil */}
        <div className={cn(
          "border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          isMobile ? "w-12" : "w-48"
        )}>
          <SidebarContent />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
} 