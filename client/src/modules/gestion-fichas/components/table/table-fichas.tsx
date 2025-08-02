"use client";

import { FichaCatastro } from "@/models/fichacatastro";
import { createColumns } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import { CustomBadge } from "@/components/custom/custom-badge";
import {
    Info,
    Circle,
    CheckSquare
} from "lucide-react";
import { TableSelect } from "@/components/custom/table-select";

interface TableFichasProps {
    fichas: FichaCatastro[];
    loading?: boolean;
    onRefresh?: () => void; // Callback para refrescar datos
}

export default function TableFichas({
    fichas,
    loading = false,
    onRefresh,
}: TableFichasProps) {
    const columns = createColumns(onRefresh);

    return (
        <div className="space-y-4">
            {/* Tabla */}
            {fichas.length > 0 ? (
                <TableSelect
                    columns={columns}
                    data={fichas}
                    loading={loading}
                    pagination={true}
                    pageSize={10}
                    pageSizeOptions={[5, 10, 20, 50]}
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-gray-600" />
                            <CustomBadge color="dark" className="text-xs">
                                PENDIENTE
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas sin procesar
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-blue-600" />
                            <CustomBadge color="blue" className="text-xs">
                                PARCIAL
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas en proceso
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-orange-600" />
                            <CustomBadge color="orange" className="text-xs">
                                OBSERVADO
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas observadas
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-green-600" />
                            <CustomBadge color="green" className="text-xs">
                                FINALIZADO
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Fichas finalizadas
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 