import { Navbar } from "@/components/navbar";
import { Home, Users } from "lucide-react";
import UsuariosView from "@/modules/usuarios/view/usuarios.view";

export default function UsuariosPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "Usuarios",
      path: "/usuarios",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de usuarios"
        description="Crea y administra usuarios en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <UsuariosView />
        </div>
      </div>
    </>
  );
}
