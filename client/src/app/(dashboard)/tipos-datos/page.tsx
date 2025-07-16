"use client";

import { useState } from "react";
import { DynamicTabbedLayout, TabItem } from "@/components/custom/dynamic-tabbed-layout";
import {
  Map,
  Plug,
  Droplet,
  GaugeCircle,
  PackageSearch,
  FileWarning,
  Users,
  Link,
  Wrench,
  BookOpen,
  Building,
  ClipboardList,
  ReceiptText,
  FileSearch,
  ShieldCheck,
  Zap,
  Home,
  Puzzle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

// Importar todas las vistas
import TipoCalleContent from "@/modules/tipos/views/tipo-calles-view";
import TipoConexionesContent from "@/modules/tipos/views/tipo-conexiones-view";
import TipoLecturasContent from "@/modules/tipos/views/tipo-lecturas-view";
import TipoMedidoresContent from "@/modules/tipos/views/tipo-medidores-view";
import TipoInfraestructuraContent from "@/modules/tipos/views/tipo-infraestructura-view";
import TipoAccesoriosContent from "@/modules/tipos/views/tipo-accesorios-view";
import TipoMaterialesContent from "@/modules/tipos/views/tipo-materiales-view";
import TipoCajasContent from "@/modules/tipos/views/tipo-cajas-view";
import TipoTapasContent from "@/modules/tipos/views/tipo-tapas-view";
import TipoServiciosContent from "@/modules/tipos/views/tipo-servicios-view";
import TipoUsuariosContent from "@/modules/tipos/views/tipo-usuarios-view";
import TipoObservacionesContent from "@/modules/tipos/views/tipo-observaciones-view";
import TipoFichasContent from "@/modules/tipos/views/tipo-fichas-view";
import TipoCortesContent from "@/modules/tipos/views/tipo-cortes-view";
import TipoFacturacionContent from "@/modules/tipos/views/tipo-facturacion-view";
import TipoAccionesContent from "@/modules/tipos/views/tipo-acciones-view";

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
  }
];

// Mapeo de vistas actualizadas
const viewComponents = {
  ubicacion: TipoCalleContent,
  conexiones: TipoConexionesContent,
  lecturas: TipoLecturasContent,
  medidores: TipoMedidoresContent,
  infraestructura: TipoInfraestructuraContent,
  accesorios: TipoAccesoriosContent,
  materiales: TipoMaterialesContent,
  cajas: TipoCajasContent,
  tapas: TipoTapasContent,
  servicios: TipoServiciosContent,
  usuarios: TipoUsuariosContent,
  observaciones: TipoObservacionesContent,
  fichas: TipoFichasContent,
  cortes: TipoCortesContent,
  facturacion: TipoFacturacionContent,
  acciones: TipoAccionesContent,
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
