"use client";

import { useState } from "react";
import { DynamicTabbedLayout, TabItem } from "@/components/custom/dynamic-tabbed-layout";
import { Map, MapPin, Grid, Building2, Users, Store, Home } from "lucide-react";
import {
  ModuloCallesView,
  ModuloEmpresasView,
  ModuloGruposUsuariosView,
  ModuloManzanasView,
  ModuloSectoresView,
  ModuloSucursalesView
} from "@/modules/modulos/views";
import { Navbar } from "@/components/navbar";

// Definición explícita de los tabs según orden en modulos.ts
const tabs: TabItem[] = [
  {
    id: "calles",
    title: "Calles",
    icon: Map,
  },
  {
    id: "empresas",
    title: "Empresas",
    icon: Building2,
  },
  {
    id: "gruposUsuarios",
    title: "Grupos de Usuarios",
    icon: Users,
  },
  {
    id: "manzanas",
    title: "Manzanas",
    icon: Grid,
  },
  {
    id: "sectores",
    title: "Sectores",
    icon: MapPin,
  },
  {
    id: "sucursales",
    title: "Sucursales",
    icon: Store,
  },
];

// Mapeo de vistas completo
const viewComponents = {
  calles: ModuloCallesView,
  empresas: ModuloEmpresasView,
  gruposUsuarios: ModuloGruposUsuariosView,
  manzanas: ModuloManzanasView,
  sectores: ModuloSectoresView,
  sucursales: ModuloSucursalesView,
};

export default function ModulosPage() {
  const [activeTab, setActiveTab] = useState<string>("calles");

  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Map className="h-3 w-3" />,
      text: "Módulos",
      path: "/modulos",
    },
  ];

  // Obtener el componente de vista activo
  const ActiveView = viewComponents[activeTab as keyof typeof viewComponents];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Módulos del Sistema"
        description="Gestión de módulos"
      />
      <DynamicTabbedLayout
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {/* Renderizar la vista activa */}
        {ActiveView && <ActiveView />}
      </DynamicTabbedLayout>
    </>
  );
}
