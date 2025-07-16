"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoFacturacion } from "../components/facturacion-columns/column-tipofacturacion";
import { TipoFacturacion } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoFacturacionContent() {
  const [tipoFacturacion, setTipoFacturacion] = useState<TipoFacturacion[]>([]);

  useEffect(() => {
    getData("tipofacturacion").then((res) => {
      setTipoFacturacion(res.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de facturación" description="Visualiza los tipos de facturación" />
      <TableTipos data={tipoFacturacion} columns={columnsTipoFacturacion} />
    </div>
  );
} 