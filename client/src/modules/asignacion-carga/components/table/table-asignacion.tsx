"use client";

import { FichaCatastroDto } from "@/models/fichacatastro";
import { PaginatedData } from "@/components/table/table";
import { BackendTable } from "@/components/table/table-select";
import { columns } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import { CustomBadge } from "@/components/custom/custom-badge";
import { asignarFichaIndividual } from "../../action/asignacion-carga.actions";
import {
    CheckCircle,
    AlertCircle,
    Clock,
    Info
} from "lucide-react";

interface TableAsignacionProps {
    fichas: PaginatedData<FichaCatastroDto>;
    loading?: boolean;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    onSelectionChange?: (selectedIds: number[]) => void;
    selectedFichas?: number[]; // IDs de fichas seleccionadas externamente
}

export default function TableAsignacion({
    fichas,
    loading = false,
    onPageChange,
    onPageSizeChange,
    onSelectionChange,
    selectedFichas = []
}: TableAsignacionProps) {
    const handleAsignarFicha = async (ficha: FichaCatastroDto) => {
        try {
            // Por ahora, simular asignación individual
            await asignarFichaIndividual(ficha.idficha, "INSPECTOR_TEMP");
        } catch (error) {
            console.error('Error al asignar ficha:', error);
        }
    };

    // Función para manejar cambios en la selección desde la tabla
    const handleTableSelectionChange = (table: any) => {
        const selectedRowModel = table.getSelectedRowModel();
        const selectedIds = selectedRowModel.rows.map((row: any) => row.original.idficha);

        if (onSelectionChange) {
            onSelectionChange(selectedIds);
        }
    };

    return (
        <div className="space-y-4">
            {/* Tabla */}
            {fichas.data.length > 0 ? (
                <BackendTable
                    columns={columns(handleAsignarFicha)}
                    data={fichas}
                    loading={loading}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    pageSize={fichas.size || 10}
                    selectedRowIds={selectedFichas}
                    onSelectionChange={handleTableSelectionChange}
                    rowIdAccessor="idficha"
                />
            ) : (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay fichas catastrales para mostrar</p>
                </div>
            )}

            {/* Leyenda de estados */}
            <Card className="border-dashed">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4 text-muted-foreground" />
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Leyenda de Estados
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <CustomBadge color="dark" className="text-xs">
                                PENDIENTE
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas sin procesar
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <CustomBadge color="blue" className="text-xs">
                                PROCESO
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas en revisión
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <CustomBadge color="green" className="text-xs">
                                FINALIZADO
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas completadas
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 