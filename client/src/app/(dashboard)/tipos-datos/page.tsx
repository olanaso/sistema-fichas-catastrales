"use client";

import { useState } from "react";
import { DynamicTabbedLayout, TabItem } from "@/components/custom/dynamic-tabbed-layout";
import {
  LayoutDashboard,
  Map,
  Plug,
  Droplet,
  GaugeCircle,
  PackageSearch,
  FileWarning,
  Users,
  UserCog,
  Link,
  Wrench,
  BookOpen,
  Building,
  ClipboardList,
  ReceiptText,
  FileSearch,
  ShieldCheck,
  Zap,
  Key,
  Settings,
  Home,
  Puzzle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import TipoCalleContent from "@/modules/tipos/views/tipo-calles-view";

// Definición explícita de los tabs
const tabs: TabItem[] = [
  {
    id: "ubicacion",
    title: "Ubicación",
    icon: Map,
  },
  {
    id: "conexiones",
    title: "Conexiones",
    icon: Link,
  },
  {
    id: "lecturas",
    title: "Lecturas",
    icon: BookOpen,
  },
  {
    id: "medidores",
    title: "Medidores",
    icon: GaugeCircle,
  },
  {
    id: "infraestructura",
    title: "Infraestructura",
    icon: Building,
  },
  {
    id: "accesorios",
    title: "Accesorios",
    icon: Plug,
  },
  {
    id: "materiales",
    title: "Materiales",
    icon: Wrench,
  },
  {
    id: "cajas",
    title: "Cajas",
    icon: PackageSearch,
  },
  {
    id: "tapas",
    title: "Tapa y Estado",
    icon: ShieldCheck,
  },
  {
    id: "servicios",
    title: "Servicios",
    icon: Zap,
  },
  {
    id: "usuarios",
    title: "Usuarios",
    icon: Users,
  },
  {
    id: "responsables",
    title: "Responsables",
    icon: UserCog,
  },
  {
    id: "observaciones",
    title: "Observaciones",
    icon: FileWarning,
  },
  {
    id: "fichas",
    title: "Fichas",
    icon: FileSearch,
  },
  {
    id: "cortes",
    title: "Cortes y Fugas",
    icon: Droplet,
  },
  {
    id: "facturacion",
    title: "Facturación",
    icon: ReceiptText,
  },
  {
    id: "acciones",
    title: "Acciones Comerciales",
    icon: ClipboardList,
  },
  {
    id: "llaves",
    title: "Llave Medidor",
    icon: Key,
  }
];

// Mapeo de vistas
const viewComponents = {
  ubicacion: TipoCalleContent,
  conexiones: TipoCalleContent,
  medidores: TipoCalleContent,
  cajas: TipoCalleContent,
};

export default function TiposDatosPage() {
  const [activeTab, setActiveTab] = useState<string>("ubicacion");

  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Puzzle className="h-3 w-3" />,
      text: "Tipos de datos",
      path: "/tipos-datos",
    },
  ];

  // Obtener el componente de vista activo
  const ActiveView = viewComponents[activeTab as keyof typeof viewComponents];

  return (
    <>
    <Navbar 
      breadcrumb={breadcrumb}
      title="Tipos de datos"
      description="Gestión de tipos de datos"
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
