import { Navbar } from "@/components/navbar";
import Perfil from "@/modules/auth/view/perfil";
import { Home, User } from "lucide-react";

export default function PerfilPage() {
  const breadcrumbs = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <User className="h-3 w-3" />,
      text: "Mi cuenta",
      path: "/cuenta",
    },
  ];
  return (
    <>
      <Navbar breadcrumb={breadcrumbs} title="Cuenta de usuario" description="Gestiona tu cuenta" />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <Perfil />
        </div>
      </div>
    </>
  );
}