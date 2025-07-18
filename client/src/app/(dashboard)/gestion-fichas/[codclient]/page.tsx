import { Navbar } from "@/components/navbar";
import { FileText, FormInput, Home } from "lucide-react";
import DetalleFichaView from "@/modules/detalle-ficha/views/detalle-ficha.view";

//agregar un prop para el codclient en la url, tiene que se await

export default async function GestionFichasPage({
  params,
}: {
  params: Promise<{ codclient: string }>;
}) {
  const { codclient } = await params;

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
    {
      icon: <FormInput className="h-3 w-3" />,
      text: "Detalle de la ficha",
      path: `/gestion-fichas/${codclient}`,
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Detalle de la ficha"
        description="Detalle de la ficha catastral"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <DetalleFichaView codCliente={codclient} />
        </div>
      </div>
    </>
  );
}
