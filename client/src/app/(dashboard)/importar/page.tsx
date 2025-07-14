import { Navbar } from "@/components/navbar";
import { Home, Import } from "lucide-react";
import ImportarPadronClientesView from "@/modules/importar-padron/view/importarpadron.view";

export default function ImportarPadronPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Import className="h-3 w-3" />,
      text: "Importar Padrón",
      path: "/importar-padron",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Importar Padrón"
        description="Importa el padrón de clientes del sistema"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <ImportarPadronClientesView />
        </div>
      </div>
    </>
  );
}
