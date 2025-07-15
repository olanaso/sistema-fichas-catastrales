import { Navbar } from "@/components/navbar";
import AsignacionCargaView from "@/modules/asignacion-carga/view/asignacion-carga.view";
import { FileText, Home } from "lucide-react";

export default function AsignacionCargaPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <FileText className="h-3 w-3" />,
      text: "Asignación de Carga",
      path: "/asignacion-carga",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Asignación de Carga"
        description="Asigna la carga a las fichas catastrales"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <AsignacionCargaView />
        </div>
      </div>
    </>
  );
}
