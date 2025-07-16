"use client";

import TableTipos from "../components/table/table-tipos";
import { columnsTipoCaja } from "../components/cajas-columns/column-tipocaja";
import { columnsTipoEstadoCaja } from "../components/cajas-columns/column-tipoestadocaja";
import { columnsTipoLocalizacionCaja } from "../components/cajas-columns/column-tipolocalizacioncaja";
import { columnsTipoModeloCajaConexion } from "../components/cajas-columns/column-tipomodelocajaconexion";
import { TipoCaja, TipoEstadoCaja, TipoLocalizacionCaja, TipoModeloCajaConexion } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

export default function TipoCajasContent() {
  const [tipoCaja, setTipoCaja] = useState<TipoCaja[]>([]);
  const [tipoEstadoCaja, setTipoEstadoCaja] = useState<TipoEstadoCaja[]>([]);
  const [tipoLocalizacionCaja, setTipoLocalizacionCaja] = useState<TipoLocalizacionCaja[]>([]);
  const [tipoModeloCajaConexion, setTipoModeloCajaConexion] = useState<TipoModeloCajaConexion[]>([]);

  useEffect(() => {
    Promise.all([
      getData("tipocaja"),
      getData("tipoestcaja"),
      getData("tipolocalizacaja"),
      getData("tipomodelocajaconex")
    ]).then(([resCaja, resEstado, resLocalizacion, resModelo]) => {
      setTipoCaja(resCaja.data);
      setTipoEstadoCaja(resEstado.data);
      setTipoLocalizacionCaja(resLocalizacion.data);
      setTipoModeloCajaConexion(resModelo.data);
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <TitlePage title="Tipos de cajas" description="Visualiza los tipos de cajas" />
      <TableTipos data={tipoCaja} columns={columnsTipoCaja} />

      <TitlePage title="Estados de caja" description="Visualiza los estados de caja" />
      <TableTipos data={tipoEstadoCaja} columns={columnsTipoEstadoCaja} />

      <TitlePage title="Localización de cajas" description="Visualiza las localizaciones de cajas" />
      <TableTipos data={tipoLocalizacionCaja} columns={columnsTipoLocalizacionCaja} />

      <TitlePage title="Modelos de caja conexión" description="Visualiza los modelos de caja conexión" />
      <TableTipos data={tipoModeloCajaConexion} columns={columnsTipoModeloCajaConexion} />
    </div>
  );
} 