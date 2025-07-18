"use client";

import TableModulos from "../components/table/table-modulos";
import { columnsManzanas } from "../components/column-modulomanzanas";
import { Manzana } from "@/models/modulos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

// Componente para vista de módulo manzanas
export default function ModuloManzanasView() {
    const [manzanas, setManzanas] = useState<Manzana[]>([]);

    useEffect(() => {
        Promise.all([
            getData("manzanas"),
        ]).then(([resManzanas]) => {
            setManzanas(resManzanas.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Manzanas" description="Gestión de manzanas" />
            <TableModulos
                data={manzanas}
                columns={columnsManzanas}
                searchPlaceholder="Buscar manzanas por código, sector, descripción..."
            />
        </div>
    );
} 