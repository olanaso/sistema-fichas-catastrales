"use client";

import TableModulos from "../components/table/table-modulos";
import { columnsEmpresas } from "../components/column-moduloempresas";
import { Empresa } from "@/models/modulos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

// Componente para vista de módulo empresas
export default function ModuloEmpresasView() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    useEffect(() => {
        Promise.all([
            getData("empresas"),
        ]).then(([resEmpresas]) => {
            setEmpresas(resEmpresas.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Empresas" description="Gestión de empresas" />
            <TableModulos
                data={empresas}
                columns={columnsEmpresas}
                searchPlaceholder="Buscar empresas por nombre, RUC, dirección..."
            />
        </div>
    );
} 