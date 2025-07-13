import { Navbar } from "@/components/navbar";
import { Group, Home, Users } from "lucide-react";
import { GrupoTrabajoView } from "@/modules/grupotrabajo";

export default function GrupoTrabajoPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Group className="h-3 w-3" />,
      text: "Grupos de trabajo",
      path: "/grupo-trabajo",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de grupos de trabajo"
        description="Crea y administra grupos de trabajo en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <GrupoTrabajoView />
        </div>
      </div>
    </>
  );
}
