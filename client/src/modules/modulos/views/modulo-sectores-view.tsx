"use client";

import TableModulos from "../components/table/table-modulos";
import { columnsSectores } from "../components/column-modulosectores";
import { Sector } from "@/models/modulos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

// Componente para vista de módulo sectores
export default function ModuloSectoresView() {
    const [sectores, setSectores] = useState<Sector[]>([]);

    useEffect(() => {
        Promise.all([
            getData("sectores"),
        ]).then(([resSectores]) => {
            setSectores(resSectores.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Sectores" description="Gestión de sectores" />
            <TableModulos
                data={sectores}
                columns={columnsSectores}
                searchPlaceholder="Buscar sectores por código, descripción, densidad..."
            />
        </div>
    );
} 