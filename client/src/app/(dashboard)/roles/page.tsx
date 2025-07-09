import { Navbar } from "@/components/navbar";
import { Home, Users } from "lucide-react";
import View from "@/modules/roles/view/roles.view";

export default function UsuariosPage () {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "Roles",
      path: "/roles",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de roles"
        description="Crea y administra roles en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <View />
        </div>
      </div>
    </>
  );
}
