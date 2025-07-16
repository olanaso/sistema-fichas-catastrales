"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoConstruccion } from "../components/infraestructura-columns/column-tipoconstruccion";
import { columnsTipoMaterialConstruccion } from "../components/infraestructura-columns/column-tipomaterialconstruccion";
import { TipoConstruccion, TipoMaterialConstruccion } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoInfraestructuraContent() {
  const [tipoConstruccion, setTipoConstruccion] = useState<TipoConstruccion[]>([]);
  const [tipoMaterialConstruccion, setTipoMaterialConstruccion] = useState<TipoMaterialConstruccion[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipoconstruccion"),
      getData("tipomaterialconst")
    ]).then(([resConstruccion, resMaterial]) => {
      setTipoConstruccion(resConstruccion.data);
      setTipoMaterialConstruccion(resMaterial.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de construcción" description="Visualiza los tipos de construcción" />
      <TableTipos data={tipoConstruccion} columns={columnsTipoConstruccion} />
      
      <TitlePage title="Tipos de material de construcción" description="Visualiza los tipos de material de construcción" />
      <TableTipos data={tipoMaterialConstruccion} columns={columnsTipoMaterialConstruccion} />
    </div>
  );
} 