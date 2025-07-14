"use client";

import { useTransition } from "react";
import { Edit, Trash2, Printer, ArrowRightLeft, CheckCircle } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { FichaCatastroDto } from "@/models/fichacatastro";
import { useGestionFichas } from "../../context/gestion-fichas-context";
import {
    editarFicha,
    eliminarFicha,
    imprimirFicha,
    migrarFicha,
    aprobarFicha
} from "../../action/gestion-fichas.actions";
import { toast } from "sonner";

interface GestionFichasActionTableProps {
    ficha: FichaCatastroDto;
}

export default function GestionFichasActionTable({ ficha }: GestionFichasActionTableProps) {
    const { refreshData, pagination } = useGestionFichas();
    const [isPending, startTransition] = useTransition();

    const handleEditarFicha = () => {
        startTransition(async () => {
            await editarFicha(ficha.idficha, { idficha: ficha.idficha });
            refreshData(pagination.page, pagination.pageSize);
        });
    };

    const handleEliminarFicha = () => {
        startTransition(async () => {
            await eliminarFicha(ficha.idficha);
            refreshData(pagination.page, pagination.pageSize);
        });
    };

    const handleImprimirFicha = () => {
        startTransition(async () => {
            await imprimirFicha(ficha.idficha);
        });
    };

    const handleMigrarFicha = () => {
        startTransition(async () => {
            await migrarFicha(ficha.idficha);
            refreshData(pagination.page, pagination.pageSize);
        });
    };

    const handleAprobarFicha = () => {
        startTransition(async () => {
            await aprobarFicha(ficha.idficha);
            refreshData(pagination.page, pagination.pageSize);
        });
    };

    const isAprobada = ficha.fichaaprobada === 1;

    return (
        <div className="flex items-center gap-1">
            {/* Botón Editar */}
            <IconButton
                tooltip="Editar ficha"
                tooltipIcon={<Edit className="h-3 w-3" />}
                onClick={handleEditarFicha}
                disabled={isPending}
                color="blue"
                variant="ghost"
            >
                <Edit className="h-4 w-4" />
            </IconButton>

            {/* Botón Imprimir */}
            <IconButton
                tooltip="Imprimir ficha"
                tooltipIcon={<Printer className="h-3 w-3" />}
                onClick={handleImprimirFicha}
                disabled={isPending}
                color="purple"
                variant="ghost"
            >
                <Printer className="h-4 w-4" />
            </IconButton>

            {/* Botón Migrar */}
            <IconButton
                tooltip="Migrar ficha"
                tooltipIcon={<ArrowRightLeft className="h-3 w-3" />}
                onClick={handleMigrarFicha}
                disabled={isPending}
                color="orange"
                variant="ghost"
            >
                <ArrowRightLeft className="h-4 w-4" />
            </IconButton>

            {/* Botón Aprobar - Solo si no está aprobada */}
            {!isAprobada && (
                <IconButton
                    tooltip="Aprobar ficha"
                    tooltipIcon={<CheckCircle className="h-3 w-3" />}
                    onClick={handleAprobarFicha}
                    disabled={isPending}
                    color="green"
                    variant="ghost"
                >
                    <CheckCircle className="h-4 w-4" />
                </IconButton>
            )}

            {/* Botón Eliminar */}
            <IconButton
                tooltip="Eliminar ficha"
                tooltipIcon={<Trash2 className="h-3 w-3" />}
                onClick={handleEliminarFicha}
                disabled={isPending}
                color="red"
                variant="ghost"
            >
                <Trash2 className="h-4 w-4" />
            </IconButton>
        </div>
    );
} 