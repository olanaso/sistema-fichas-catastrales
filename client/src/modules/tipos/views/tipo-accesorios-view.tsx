"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoAccesoriosConexion } from "../components/accesorios-columns/column-tipoaccesoriosconexion";
import { columnsTipoAccesoriosNoReglamentarios } from "../components/accesorios-columns/column-tipoaccesoriosnoreglamentarios";
import { TipoAccesoriosConexion, TipoAccesoriosNoReglamentarios } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoAccesoriosContent() {
  const [tipoAccesoriosConexion, setTipoAccesoriosConexion] = useState<TipoAccesoriosConexion[]>([]);
  const [tipoAccesoriosNoReglamentarios, setTipoAccesoriosNoReglamentarios] = useState<TipoAccesoriosNoReglamentarios[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipoaccesoriosconex"),
      getData("tipoaccesoriosnoreglamentados")
    ]).then(([resAccesorios, resNoReglamentarios]) => {
      setTipoAccesoriosConexion(resAccesorios.data);
      setTipoAccesoriosNoReglamentarios(resNoReglamentarios.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de accesorios de conexión" description="Visualiza los tipos de accesorios de conexión" />
      <TableTipos data={tipoAccesoriosConexion} columns={columnsTipoAccesoriosConexion} />
      
      <TitlePage title="Tipos de accesorios no reglamentarios" description="Visualiza los tipos de accesorios no reglamentarios" />
      <TableTipos data={tipoAccesoriosNoReglamentarios} columns={columnsTipoAccesoriosNoReglamentarios} />
    </div>
  );
} 