import { Navbar } from "@/components/navbar";
import { Home, Users } from "lucide-react";
import InspectoresView from "@/modules/inspectores/view/inspectores.view";

export default function SupervisoresPage() {
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "Inspectores",
      path: "/inspectores",
    },
  ];

  return (
    <>
      <Navbar
        breadcrumb={breadcrumb}
        title="Gestión de inspectores"
        description="Crea y administra inspectores en tu aplicación"
      />
      <div className="mx-auto p-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          <InspectoresView />
        </div>
      </div>
    </>
  );
}
