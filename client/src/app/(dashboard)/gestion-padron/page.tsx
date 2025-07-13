import { Navbar } from "@/components/navbar";
import { ClipboardList, Home } from "lucide-react";
import PadronClientesView from "@/modules/gestion-padron/view/gestionpadron.view";

export default function GestionPadronPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <ClipboardList className="h-3 w-3" />,
      text: "Gestión de padrón",
      path: "/gestion-padron",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de padrón"
        description="Gestiona el padrón de clientes en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <PadronClientesView />
        </div>
      </div>
    </>
  );
}
