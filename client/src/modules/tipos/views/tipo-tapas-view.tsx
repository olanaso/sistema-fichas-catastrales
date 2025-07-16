"use client";

import TableTipos from "../components/table/table-tipos";
import { TipoEstadoTapa, TipoTapa, TipoTaponeo } from "@/models/tipos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";
import { columnsTipoEstadoTapa } from "../components/tapas-columns/column-tipoestadotapa";
import { columnsTipoTapa } from "../components/tapas-columns/column-tipotapa";
import { columnsTipoTaponeo } from "../components/tapas-columns/column-tipotaponeo";

export default function TipoTapasContent() {
    const [tipoEstadoTapa, setTipoEstadoTapa] = useState<TipoEstadoTapa[]>([]);
    const [tipoTapa, setTipoTapa] = useState<TipoTapa[]>([]);
    const [tipoTaponeo, setTipoTaponeo] = useState<TipoTaponeo[]>([]);

    useEffect(() => {
        Promise.all([
            getData("tipoesttapa"),
            getData("tipotapa"),
            getData("tipotaponeo")
        ]).then(([resEstado, resTapa, resTaponeo]) => {
            setTipoEstadoTapa(resEstado.data);
            setTipoTapa(resTapa.data);
            setTipoTaponeo(resTaponeo.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Estados de tapa" description="Visualiza los estados de tapa" />
            <TableTipos data={tipoEstadoTapa} columns={columnsTipoEstadoTapa} />

            <TitlePage title="Tipos de tapa" description="Visualiza los tipos de tapa" />
            <TableTipos data={tipoTapa} columns={columnsTipoTapa} />

            <TitlePage title="Tipos de taponeo" description="Visualiza los tipos de taponeo" />
            <TableTipos data={tipoTaponeo} columns={columnsTipoTaponeo} />
        </div>
    );
} 