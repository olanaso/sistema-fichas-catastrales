"use client";

import { Building2, AtSign, Server } from "lucide-react";
import { Card } from "@/components/ui/card";

type TabType = "empresa" | "correo" | "sistemas";

interface ConfiguracionTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  {
    id: "empresa" as TabType,
    label: "Información de Empresa",
    icon: Building2,
  },
  {
    id: "correo" as TabType,
    label: "Configuración de Correo",
    icon: AtSign,
  },
  {
    id: "sistemas" as TabType,
    label: "Conexiones a Sistemas",
    icon: Server,
  },
];

export function ConfiguracionTabs({ activeTab, onTabChange }: ConfiguracionTabsProps) {
  return (
    <Card className="p-2">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 relative
                ${
                  isActive
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
              <span className="text-sm">{tab.label}</span>

              {/* Underline personalizado */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
              )}
            </button>
          );
        })}
      </nav>
    </Card>
  );
} 