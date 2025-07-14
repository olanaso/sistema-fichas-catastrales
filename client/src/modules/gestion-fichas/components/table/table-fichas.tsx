"use client";

import { FichaCatastroDto } from "@/models/fichacatastro";
import { columns } from "./columns";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableFichasProps {
    fichas: PaginatedData<FichaCatastroDto>;
    loading?: boolean;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}

export default function TableFichas({
    fichas,
    loading = false,
    onPageChange,
    onPageSizeChange
}: TableFichasProps) {

    const handleCreateFicha = () => {
        // TODO: Implementar funcionalidad de crear ficha
        console.log("Crear nueva ficha - pendiente de implementación");
    };

    return (
        <>
            {fichas.data.length > 0 ? (
                <BackendTable
                    columns={columns}
                    data={fichas}
                    loading={loading}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    toolbar={(table) => (
                        <TableToolbar
                            table={table}
                            searchKey="propietario"
                            searchPlaceholder="Buscar por propietario..."
                            actions={
                                <Button
                                    size="sm"
                                    onClick={handleCreateFicha}
                                    className="ml-2"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nueva Ficha
                                </Button>
                            }
                        />
                    )}
                    pageSize={fichas.size || 10}
                />
            ) : (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay fichas catastrales para mostrar</p>
                    <Button
                        size="sm"
                        onClick={handleCreateFicha}
                        className="mt-4"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Primera Ficha
                    </Button>
                </div>
            )}
        </>
    );
} 