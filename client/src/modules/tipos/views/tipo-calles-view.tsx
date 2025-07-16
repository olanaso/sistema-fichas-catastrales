"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoCalle } from "../components/ubicacion-columns/column-tipocalle";
import { TipoCalle, TipoPavimento, TipoVereda } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";
import { ColumnsTipoVereda } from "../components/ubicacion-columns/column-tipovereda";
import { ColumnsTipoPavimento } from "../components/ubicacion-columns/column-tipopavimento";


// Componente interno que usa el contexto
export default function TipoCalleContent() {

  const [tipoCalle, setTipoCalle] = useState<TipoCalle[]>([]);
  const [tipoVereda, setTipoVereda] = useState<TipoVereda[]>([]);
  const [tipoPavimento, setTipoPavimento] = useState<TipoPavimento[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipocalle"),
      getData("tipovereda"),
      getData("tipopavimento")
    ]).then(([resCalle, resVereda, resPavimento]) => {
      setTipoCalle(resCalle.data);
      setTipoVereda(resVereda.data);
      setTipoPavimento(resPavimento.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de calles" description="Visualiza los tipos de calles" />
      <TableTipos data={tipoCalle} columns={columnsTipoCalle} />
      <TitlePage title="Tipos de veredas" description="Visualiza los tipos de veredas" />
      <TableTipos data={tipoVereda} columns={ColumnsTipoVereda} />
      <TitlePage title="Tipos de pavimentos" description="Visualiza los tipos de pavimentos" />
      <TableTipos data={tipoPavimento} columns={ColumnsTipoPavimento} />
    </div>
  );
}

