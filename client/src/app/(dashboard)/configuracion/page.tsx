import { Navbar } from "@/components/navbar";
import { Home, Settings } from "lucide-react";
import ConfiguracionTabsView from "@/modules/configuracion/view/configuracion-tabs.view";

export default function ConfiguracionPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Settings className="h-3 w-3" />,
      text: "Configuración",
      path: "/configuracion",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Configuración del Sistema"
        description="Gestiona los parámetros del sistema divididos en bloques"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <ConfiguracionTabsView />
        </div>
      </div>
    </>
  );
}
