"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoLectura } from "../components/lecturas-columns/column-tipolectura";
import { columnsTipoLecturaCampo } from "../components/lecturas-columns/column-tipolecturacampo";
import { columnsTipoPresionAgua } from "../components/lecturas-columns/column-tipopresionagua";
import { TipoLectura, TipoLecturaCampo, TipoPresionAgua } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoLecturasContent() {
  const [tipoLectura, setTipoLectura] = useState<TipoLectura[]>([]);
  const [tipoLecturaCampo, setTipoLecturaCampo] = useState<TipoLecturaCampo[]>([]);
  const [tipoPresionAgua, setTipoPresionAgua] = useState<TipoPresionAgua[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipolectura"),
      getData("tipolecturacampo"),
      getData("tipopresionagu")
    ]).then(([resLectura, resLecturaCampo, resPresion]) => {
      setTipoLectura(resLectura.data);
      setTipoLecturaCampo(resLecturaCampo.data);
      setTipoPresionAgua(resPresion.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de lectura" description="Visualiza los tipos de lectura" />
      <TableTipos data={tipoLectura} columns={columnsTipoLectura} />
      
      <TitlePage title="Tipos de lectura de campo" description="Visualiza los tipos de lectura de campo" />
      <TableTipos data={tipoLecturaCampo} columns={columnsTipoLecturaCampo} />
      
      <TitlePage title="Tipos de presión de agua" description="Visualiza los tipos de presión de agua" />
      <TableTipos data={tipoPresionAgua} columns={columnsTipoPresionAgua} />
    </div>
  );
} 