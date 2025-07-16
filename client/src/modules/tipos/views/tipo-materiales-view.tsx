"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoMaterial } from "../components/materiales-columns/column-tipomaterial";
import { columnsTipoCategoria } from "../components/materiales-columns/column-tipocategoria";
import { columnsTipoOperacion } from "../components/materiales-columns/column-tipooperacion";
import { TipoMaterial, TipoCategoria, TipoOperacion } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoMaterialesContent() {
  const [tipoMaterial, setTipoMaterial] = useState<TipoMaterial[]>([]);
  const [tipoCategoria, setTipoCategoria] = useState<TipoCategoria[]>([]);
  const [tipoOperacion, setTipoOperacion] = useState<TipoOperacion[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipomaterial"),
      getData("tipocategoria"),
      getData("tipooperacion")
    ]).then(([resMaterial, resCategoria, resOperacion]) => {
      setTipoMaterial(resMaterial.data);
      setTipoCategoria(resCategoria.data);
      setTipoOperacion(resOperacion.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de materiales" description="Visualiza los tipos de materiales" />
      <TableTipos data={tipoMaterial} columns={columnsTipoMaterial} />

      <TitlePage title="Tipos de categoría" description="Visualiza los tipos de categoría" />
      <TableTipos data={tipoCategoria} columns={columnsTipoCategoria} />

      <TitlePage title="Tipos de operación" description="Visualiza los tipos de operación" />
      <TableTipos data={tipoOperacion} columns={columnsTipoOperacion} />
    </div>
  );
} 