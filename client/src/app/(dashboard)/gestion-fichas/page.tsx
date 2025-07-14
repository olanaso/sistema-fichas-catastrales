import { Navbar } from "@/components/navbar";
import { FileText, Home } from "lucide-react";
import GestionFichasView from "@/modules/gestion-fichas/view/gestion-fichas.view";

export default function GestionFichasPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <FileText className="h-3 w-3" />,
      text: "Gestión de Fichas",
      path: "/gestion-fichas",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de Fichas Catastrales"
        description="Administra las fichas catastrales del sistema"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <GestionFichasView />
        </div>
      </div>
    </>
  );
}
