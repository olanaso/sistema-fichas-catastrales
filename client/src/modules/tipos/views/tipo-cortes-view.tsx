"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoCorteServicio } from "../components/cortes-columns/column-tipocorteservicio";
import { columnsTipoFugas } from "../components/cortes-columns/column-tipofugas";
import { TipoCorteServicio, TipoFugas } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoCortesContent() {
  const [tipoCorteServicio, setTipoCorteServicio] = useState<TipoCorteServicio[]>([]);
  const [tipoFugas, setTipoFugas] = useState<TipoFugas[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipocorteservicio"),
      getData("tipofugas")
    ]).then(([resCorte, resFugas]) => {
      setTipoCorteServicio(resCorte.data);
      setTipoFugas(resFugas.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de cortes de servicio" description="Visualiza los tipos de cortes de servicio" />
      <TableTipos data={tipoCorteServicio} columns={columnsTipoCorteServicio} />
      
      <TitlePage title="Tipos de fugas" description="Visualiza los tipos de fugas" />
      <TableTipos data={tipoFugas} columns={columnsTipoFugas} />
    </div>
  );
} 