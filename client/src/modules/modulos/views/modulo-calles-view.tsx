"use client";

import { columnsCalles } from "../components/column-modulocalle";
import { Calle } from "@/models/modulos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";
import TableModulos from "../components/table/table-modulos";

// Componente para vista de módulo calles
export default function ModuloCallesView() {
  const [calles, setCalles] = useState<Calle[]>([]);

  useEffect(() => {
    Promise.all([
      getData("calles"),
    ]).then(([resCalles]) => {
      setCalles(resCalles.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Calles" description="Visualiza los tipos de calles" />
      <TableModulos 
        data={calles} 
        columns={columnsCalles}
        searchPlaceholder="Buscar calles ..."
      />
    </div>
  );
}

