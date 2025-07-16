"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoServicio } from "../components/servicios-columns/column-tiposervicio";
import { columnsTipoEstadoServicio } from "../components/servicios-columns/column-tipoestadoservicio";
import { TipoServicio, TipoEstadoServicio } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoServiciosContent() {
  const [tipoServicio, setTipoServicio] = useState<TipoServicio[]>([]);
  const [tipoEstadoServicio, setTipoEstadoServicio] = useState<TipoEstadoServicio[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tiposervicio"),
      getData("tipoestservicio")
    ]).then(([resServicio, resEstado]) => {
      setTipoServicio(resServicio.data);
      setTipoEstadoServicio(resEstado.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de servicio" description="Visualiza los tipos de servicio" />
      <TableTipos data={tipoServicio} columns={columnsTipoServicio} />

      <TitlePage title="Estados de servicio" description="Visualiza los estados de servicio" />
      <TableTipos data={tipoEstadoServicio} columns={columnsTipoEstadoServicio} />
    </div>
  );
} 