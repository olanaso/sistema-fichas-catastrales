"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoMedidor } from "../components/medidores-columns/column-tipomedidor";
import { columnsTipoLlaveMedidor } from "../components/medidores-columns/column-tipollavemedidor";
import { columnsTipoMarcaMedidor } from "../components/medidores-columns/column-tipomarcamedidor";
import { columnsTipoEstadoMedidor } from "../components/medidores-columns/column-tipoestadomedidor";
import { columnsTipoPosicionMedidor } from "../components/medidores-columns/column-tipoposicionmedidor";
import { TipoMedidor, TipoLlaveMedidor, TipoMarcaMedidor, TipoEstadoMedidor, TipoPosicionMedidor } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoMedidoresContent() {
  const [tipoMedidor, setTipoMedidor] = useState<TipoMedidor[]>([]);
  const [tipoLlaveMedidor, setTipoLlaveMedidor] = useState<TipoLlaveMedidor[]>([]);
  const [tipoMarcaMedidor, setTipoMarcaMedidor] = useState<TipoMarcaMedidor[]>([]);
  const [tipoEstadoMedidor, setTipoEstadoMedidor] = useState<TipoEstadoMedidor[]>([]);
  const [tipoPosicionMedidor, setTipoPosicionMedidor] = useState<TipoPosicionMedidor[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipomedidor"),
      getData("tipollavemedidor"),
      getData("tipomarcamedidor"),
      getData("tipoestmedidor"),
      getData("tipoposmedidor")
    ]).then(([resMedidor, resLlave, resMarca, resEstado, resPosicion]) => {
      setTipoMedidor(resMedidor.data);
      setTipoLlaveMedidor(resLlave.data);
      setTipoMarcaMedidor(resMarca.data);
      setTipoEstadoMedidor(resEstado.data);
      setTipoPosicionMedidor(resPosicion.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de medidores" description="Visualiza los tipos de medidores" />
      <TableTipos data={tipoMedidor} columns={columnsTipoMedidor} />

      <TitlePage title="Tipos de llave de medidor" description="Visualiza los tipos de llave de medidor" />
      <TableTipos data={tipoLlaveMedidor} columns={columnsTipoLlaveMedidor} />

      <TitlePage title="Marcas de medidor" description="Visualiza las marcas de medidor" />
      <TableTipos data={tipoMarcaMedidor} columns={columnsTipoMarcaMedidor} />

      <TitlePage title="Estados de medidor" description="Visualiza los estados de medidor" />
      <TableTipos data={tipoEstadoMedidor} columns={columnsTipoEstadoMedidor} />

      <TitlePage title="Posiciones de medidor" description="Visualiza las posiciones de medidor" />
      <TableTipos data={tipoPosicionMedidor} columns={columnsTipoPosicionMedidor} />
    </div>
  );
} 