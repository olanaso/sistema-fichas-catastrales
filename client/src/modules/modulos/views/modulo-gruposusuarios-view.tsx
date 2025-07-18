"use client";

import TableModulos from "../components/table/table-modulos";
import { columnsGruposUsuarios } from "../components/column-modulogrupos";
import { GrupoUsuario } from "@/models/modulos";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import TitlePage from "@/components/custom/title-page";

// Componente para vista de módulo grupos de usuarios
export default function ModuloGruposUsuariosView() {
    const [gruposUsuarios, setGruposUsuarios] = useState<GrupoUsuario[]>([]);

    useEffect(() => {
        Promise.all([
            getData("gruposusuarios"),
        ]).then(([resGrupos]) => {
            setGruposUsuarios(resGrupos.data);
        });
    }, []);

    return (
        <div className="space-y-6 p-6">
            <TitlePage title="Grupos de Usuarios" description="Gestión de grupos de usuarios" />
            <TableModulos
                data={gruposUsuarios}
                columns={columnsGruposUsuarios}
                searchPlaceholder="Buscar grupos por código, descripción..."
            />
        </div>
    );
} 