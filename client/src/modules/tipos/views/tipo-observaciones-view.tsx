"use client";

import TableTipos from "../components/table/table-tipos";
import { TipoCajaObservacion } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";
import { columnsTipoCajaObservacion } from "../components/observaciones-columns/column-tipocajaobservacion";

export default function TipoObservacionesContent() {
    const [tipoCajaObservacion, setTipoCajaObservacion] = useState<TipoCajaObservacion[]>([]);

    useEffect(() => {
        getData("tipocajaobserv").then((res) => {
            setTipoCajaObservacion(res.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Tipos de observaciones de caja" description="Visualiza los tipos de observaciones de caja" />
            <TableTipos data={tipoCajaObservacion} columns={columnsTipoCajaObservacion} />
        </div>
    );
} 