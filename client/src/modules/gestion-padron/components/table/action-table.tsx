"use client";

import { useState } from "react";
import { Edit, Power, PowerOff, Trash } from "lucide-react";
import { toast } from "sonner";
import { IconButton } from "@/components/custom/icon-button";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";
import { usePadronClientes } from "../../context/grupotrabajo-context";
import { ClienteDto } from "@/models/cliente";

interface ActionTableProps {
  cliente: ClienteDto;
}

export default function ActionTable({ cliente }: ActionTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { forceRefresh } = usePadronClientes();

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      // Convertir el array de inspectores a string separado por comas


        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
    } catch (error) {
      toast.error("Error inesperado al cambiar estado del grupo de trabajo");
      console.error("Error toggling padron clientes status:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center gap-1">
      {/* Botón Activar/Desactivar */}
      <IconButton
        tooltip={cliente.estadoregistro === 1 ? "Desactivar grupo" : "Activar grupo"}
        tooltipIcon={
          cliente.estadoregistro === 1 ? (
            <PowerOff className="h-3 w-3" />
          ) : (
            <Power className="h-3 w-3" />
          )
        }
        onClick={handleToggleStatus}
        disabled={isLoading}
        color={cliente.estadoregistro === 1 ? "orange" : "green"}
        variant="ghost"
      >
        {cliente.estadoregistro === 1 ? (
          <PowerOff className="h-4 w-4" />
        ) : (
          <Power className="h-4 w-4" />
        )}
      </IconButton>
      <IconButton
        tooltip="Editar"
        tooltipIcon={<Edit className="h-3 w-3" />}
        // onClick={handleEdit}
        disabled={isLoading}
        color="blue"
        variant="ghost"
      >
        <Edit className="h-4 w-4" />
      </IconButton>
      <IconButton
        tooltip="Eliminar"
        tooltipIcon={<Trash className="h-3 w-3" />}
        // onClick={handleDelete}
        disabled={isLoading}
        color="red"
        variant="ghost"
      >
        <Trash className="h-4 w-4" />
      </IconButton>
    </div>
  );
} 