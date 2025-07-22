"use client";

import { useState } from "react";
import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import { toast } from "sonner";
import { useGrupoTrabajo } from "../../context/grupotrabajo-context";
import { upsertGrupoTrabajo } from "../../action/grupotrabajo.actions";
import { IconButton } from "@/components/custom/icon-button";
import UpdateGrupoTrabajoForm from "../forms/update-grupotrabajo";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";

interface ActionTableProps {
  grupoTrabajo: any;
  supervisores: Usuario[];
  inspectores: Inspector[];
}

export default function ActionTable({ grupoTrabajo, supervisores, inspectores }: ActionTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { forceRefresh } = useGrupoTrabajo();

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      // Convertir el array de inspectores a string separado por comas
      const inspectoresString = Array.isArray(grupoTrabajo.inspectores) 
        ? grupoTrabajo.inspectores.join(',') 
        : grupoTrabajo.inspectores || '';

      const result = await upsertGrupoTrabajo({
        codgrupo: grupoTrabajo.codgrupo,
        nombre: grupoTrabajo.nombre,
        activo: !grupoTrabajo.activo,
        codlider: grupoTrabajo.codlider,
      });

      if (result.success) {
        toast.success(
          grupoTrabajo.activo
            ? "Grupo de trabajo desactivado exitosamente"
            : "Grupo de trabajo activado exitosamente"
        );
        
        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
      } else {
        toast.error(result.message || "Error al cambiar estado del grupo de trabajo");
      }
    } catch (error) {
      toast.error("Error inesperado al cambiar estado del grupo de trabajo");
      console.error("Error toggling grupo de trabajo status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Está seguro de que desea eliminar este grupo de trabajo?")) {
      return;
    }

    setIsLoading(true);
    try {
      // Convertir el array de inspectores a string separado por comas
      const inspectoresString = Array.isArray(grupoTrabajo.inspectores) 
        ? grupoTrabajo.inspectores.join(',') 
        : grupoTrabajo.inspectores || '';

      const result = await upsertGrupoTrabajo({
        codgrupo: grupoTrabajo.codgrupo,
        nombre: grupoTrabajo.nombre,
        activo: false, // Marcar como inactivo en lugar de eliminar
        codlider: grupoTrabajo.codlider,
      });

      if (result.success) {
        toast.success("Grupo de trabajo eliminado exitosamente");
        
        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
      } else {
        toast.error(result.message || "Error al eliminar grupo de trabajo");
      }
    } catch (error) {
      toast.error("Error inesperado al eliminar grupo de trabajo");
      console.error("Error deleting grupo de trabajo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Botón Editar */}
      <UpdateGrupoTrabajoForm
        grupoTrabajo={grupoTrabajo}
        supervisores={supervisores}
        inspectores={inspectores}
        onSuccess={forceRefresh}
        onCancel={forceRefresh}
      />

      {/* Botón Activar/Desactivar */}
      <IconButton
        tooltip={grupoTrabajo.activo ? "Desactivar grupo" : "Activar grupo"}
        tooltipIcon={
          grupoTrabajo.activo ? (
            <PowerOff className="h-3 w-3" />
          ) : (
            <Power className="h-3 w-3" />
          )
        }
        onClick={handleToggleStatus}
        disabled={isLoading}
        color={grupoTrabajo.activo ? "orange" : "green"}
        variant="ghost"
      >
        {grupoTrabajo.activo ? (
          <PowerOff className="h-4 w-4" />
        ) : (
          <Power className="h-4 w-4" />
        )}
      </IconButton>

      {/* Botón Eliminar */}
      {/* <IconButton
        tooltip="Eliminar grupo de trabajo"
        tooltipIcon={<Trash2 className="h-3 w-3" />}
        onClick={handleDelete}
        disabled={isLoading}
        color="red"
        variant="ghost"
      >
        <Trash2 className="h-4 w-4" />
      </IconButton> */}
    </div>
  );
} 