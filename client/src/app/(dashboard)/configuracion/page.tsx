import { Navbar } from "@/components/navbar";
import { Home, Users } from "lucide-react";
import UsuariosView from "@/modules/usuarios/view/usuarios.view";
import ConfiguracionView from "@/modules/configuracion/view/configuracion.view";

export default function ConfiguracionPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "Configuración",
      path: "/configuracion",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de parámetros"
        description="Crea y administra parámetros en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <ConfiguracionView />
        </div>
      </div>
    </>
  );
}
