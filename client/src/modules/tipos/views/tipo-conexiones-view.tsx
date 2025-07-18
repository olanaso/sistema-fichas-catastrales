"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoConexion } from "../components/conexiones-columns/column-tipoconexion";
import { columnsTipoIngresoConexion } from "../components/conexiones-columns/column-tipoingresoconexion";
import { columnsTipoEstadoConexion } from "../components/conexiones-columns/column-tipoestadoconexion";
import { columnsTipoSituacionConexion } from "../components/conexiones-columns/column-tiposituacionconexion";
import { TipoConexion, TipoIngresoConexion, TipoEstadoConexion, TipoSituacionConexion } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoConexionesContent() {
  const [tipoConexion, setTipoConexion] = useState<TipoConexion[]>([]);
  const [tipoIngresoConexion, setTipoIngresoConexion] = useState<TipoIngresoConexion[]>([]);
  const [tipoEstadoConexion, setTipoEstadoConexion] = useState<TipoEstadoConexion[]>([]);
  const [tipoSituacionConexion, setTipoSituacionConexion] = useState<TipoSituacionConexion[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipoconexion"),
      getData("tipoingresoconex"),
      getData("tipoestconexion"),
      getData("tiposituacionconexion")
    ]).then(([resConexion, resIngreso, resEstado, resSituacion]) => {
      setTipoConexion(resConexion.data);
      setTipoIngresoConexion(resIngreso.data);
      setTipoEstadoConexion(resEstado.data);
      setTipoSituacionConexion(resSituacion.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de conexión" description="Visualiza los tipos de conexión" />
      <TableTipos data={tipoConexion} columns={columnsTipoConexion} />
      
      <TitlePage title="Tipos de ingreso de conexión" description="Visualiza los tipos de ingreso de conexión" />
      <TableTipos data={tipoIngresoConexion} columns={columnsTipoIngresoConexion} />
      
      <TitlePage title="Tipos de estado de conexión" description="Visualiza los tipos de estado de conexión" />
      <TableTipos data={tipoEstadoConexion} columns={columnsTipoEstadoConexion} />
      
      <TitlePage title="Tipos de situación de conexión" description="Visualiza los tipos de situación de conexión" />
      <TableTipos data={tipoSituacionConexion} columns={columnsTipoSituacionConexion} />
    </div>
  );
} 