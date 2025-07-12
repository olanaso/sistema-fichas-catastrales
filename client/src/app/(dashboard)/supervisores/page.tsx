import { Navbar } from "@/components/navbar";
import { Home, UserCog, Users } from "lucide-react";
import UsuariosView from "@/modules/usuarios/view/usuarios.view";
import SupervisoresView from "@/modules/usuarios/view/supervisores.view";

export default function SupervisoresPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <UserCog className="h-3 w-3" />,
      text: "Supervisores",
      path: "/supervisores",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de supervisores"
        description="Crea y administra supervisores en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <SupervisoresView />
        </div>
      </div>
    </>
  );
}
