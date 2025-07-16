"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoFichaIncompleta } from "../components/fichas-columns/column-tipofichaincompleta";
import { TipoFichaIncompleta } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoFichasContent() {
  const [tipoFichaIncompleta, setTipoFichaIncompleta] = useState<TipoFichaIncompleta[]>([]);

  useEffect(() => {
    getData("tipofichaincompleta").then((res) => {
      setTipoFichaIncompleta(res.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de fichas incompletas" description="Visualiza los tipos de fichas incompletas" />
      <TableTipos data={tipoFichaIncompleta} columns={columnsTipoFichaIncompleta} />
    </div>
  );
} 