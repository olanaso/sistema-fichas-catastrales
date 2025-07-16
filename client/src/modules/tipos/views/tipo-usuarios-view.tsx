"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoUsuario } from "../components/usuarios-columns/column-tipousuario";
import { columnsTipoResponsable } from "../components/usuarios-columns/column-tiporesponsable";
import { TipoUsuario, TipoResponsable } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoUsuariosContent() {
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario[]>([]);
  const [tipoResponsable, setTipoResponsable] = useState<TipoResponsable[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipousuario"),
      getData("tiporesponsable")
    ]).then(([resUsuario, resResponsable]) => {
      setTipoUsuario(resUsuario.data);
      setTipoResponsable(resResponsable.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de usuario" description="Visualiza los tipos de usuario" />
      <TableTipos data={tipoUsuario} columns={columnsTipoUsuario} />

      <TitlePage title="Tipos de responsable" description="Visualiza los tipos de responsable" />
      <TableTipos data={tipoResponsable} columns={columnsTipoResponsable} />
    </div>
  );
} 