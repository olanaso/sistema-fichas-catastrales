"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoAccionComercial } from "../components/acciones-columns/column-tipoaccioncomercial";
import { TipoAccionComercial } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoAccionesContent() {
  const [tipoAccionComercial, setTipoAccionComercial] = useState<TipoAccionComercial[]>([]);

  useEffect(() => {
    getData("tipoacccomercial").then((res) => {
      setTipoAccionComercial(res.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de acciones comerciales" description="Visualiza los tipos de acciones comerciales" />
      <TableTipos data={tipoAccionComercial} columns={columnsTipoAccionComercial} />
    </div>
  );
} 