"use client";

import TableModulos from "../components/table/table-modulos";
import { columnsSucursales } from "../components/column-modulosucursales";
import { Sucursal } from "@/models/modulos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

// Componente para vista de módulo sucursales
export default function ModuloSucursalesView() {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    useEffect(() => {
        Promise.all([
            getData("sucursales"),
        ]).then(([resSucursales]) => {
            setSucursales(resSucursales.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Sucursales" description="Gestión de sucursales" />
            <TableModulos
                data={sucursales}
                columns={columnsSucursales}
                searchPlaceholder="Buscar sucursales por nombre, administrador, ciudad..."
            />
        </div>
    );
} 