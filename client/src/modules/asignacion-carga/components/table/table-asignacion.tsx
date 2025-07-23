"use client";

import { FichaCatastro } from "@/models/fichacatastro";
import { columns } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import { CustomBadge } from "@/components/custom/custom-badge";
import {
    Info,
    Circle,
    CheckSquare
} from "lucide-react";
import { TableSelect } from "@/components/custom/table-select";
import { ComboboxOption } from "@/types/combobox";
import { Inspector } from "@/models/inspector";
import { Cliente } from "@/models/cliente";

// Tipo específico para opciones de inspectores
interface InspectorOption extends ComboboxOption {
    codbrigada?: string;
}

interface TableAsignacionProps {
    fichas: Cliente[];
    inspectores: Inspector[];
    onSelectionChange?: (selectedIds: number[]) => void;
    selectedFichas?: number[]; // IDs de fichas seleccionadas externamente
    loading?: boolean;
    onAsignacionCompleta?: () => void; // Callback para recargar datos después de asignación
}

export default function TableAsignacion({
    fichas,
    inspectores,
    onSelectionChange,
    selectedFichas = [],
    loading = false,
    onAsignacionCompleta
}: TableAsignacionProps) {
    return (
        <div className="space-y-4">
            {/* Indicador de selección */}
            {selectedFichas.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/20 dark:border-blue-800">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        {selectedFichas.length} {selectedFichas.length === 1 ? 'ficha seleccionada' : 'fichas seleccionadas'}
                    </span>
                    <CustomBadge color="blue" className="text-xs">
                        {selectedFichas.length}
                    </CustomBadge>
                </div>
            )}

            {/* Tabla */}
            {fichas.length > 0 ? (
                <TableSelect
                    columns={columns(inspectores, onAsignacionCompleta)}
                    data={fichas}
                    onSelectionChange={onSelectionChange}
                    selectedIds={selectedFichas}
                    idField="codcliente"
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
                            Leyenda de estados
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-gray-600" />
                            <CustomBadge color="dark" className="text-xs">
                                SIN ASIGNAR
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Clientes sin asignar
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-orange-600" />
                            <CustomBadge color="orange" className="text-xs">
                                PROGRAMADO
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Clientes programados
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-green-600" />
                            <CustomBadge color="green" className="text-xs">
                                ASIGNADO
                            </CustomBadge>
                            <span className="text-xs text-muted-foreground">
                                Clientes asignados
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 