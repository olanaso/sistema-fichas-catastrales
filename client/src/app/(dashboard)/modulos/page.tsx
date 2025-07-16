"use client";

import { useState } from "react";
import { DynamicTabbedLayout, TabItem } from "@/components/custom/dynamic-tabbed-layout";
import { Map, MapPin, Grid, Layout, Home } from "lucide-react";
import CallesView from "@/modules/tipos/views/tipo-calles-view";
import { Navbar } from "@/components/navbar";

// Definición explícita de los tabs
const tabs: TabItem[] = [
  {
    id: "calles",
    title: "Calles",
    icon: Map,
  },
  {
    id: "sectores",
    title: "Sectores",
    icon: MapPin,
  },
  {
    id: "manzanas",
    title: "Manzanas",
    icon: Grid,
  },
  {
    id: "lotes",
    title: "Lotes",
    icon: Layout,
  },
];

// Mapeo de vistas
const viewComponents = {
  calles: CallesView,
  sectores: CallesView,
  manzanas: CallesView,
  lotes: CallesView,
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
      text: "Catastro",
      path: "/modulos",
    },
  ];

  // Obtener el componente de vista activo
  const ActiveView = viewComponents[activeTab as keyof typeof viewComponents];

  return (
    <>
    <Navbar 
      breadcrumb={breadcrumb}
      title="Catastro"
      description="Gestión territorial"
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
