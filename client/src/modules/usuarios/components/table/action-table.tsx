"use client";

import { useState } from "react";
import { Edit, Trash2, Key, Power, PowerOff } from "lucide-react";
import { toast } from "sonner";
import { CustomDialog } from "@/components/custom/dialog";
import UpdateUsuarioForm from "../forms/update-usuario";
import ChangePasswordModal from "../forms/change-password";
import { useUsuarios } from "../../context/usuarios-context";
import { upsertUsuario } from "../../action/usuario.actions";
import { IconButton } from "@/components/custom/icon-button";

interface ActionTableProps {
  usuario: any;
}

export default function ActionTable({ usuario }: ActionTableProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { forceRefresh } = useUsuarios();

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const result = await upsertUsuario({
        ...usuario,
        activo: !usuario.activo,
      });

      if (result.success) {
        toast.success(
          usuario.activo
            ? "Usuario desactivado exitosamente"
            : "Usuario activado exitosamente"
        );
        
        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
      } else {
        toast.error(result.message || "Error al cambiar estado del usuario");
      }
    } catch (error) {
      toast.error("Error inesperado al cambiar estado del usuario");
      console.error("Error toggling usuario status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {/* Botón Editar */}
        <IconButton
          tooltip="Editar usuario"
          tooltipIcon={<Edit className="h-3 w-3" />}
          onClick={() => setShowEditDialog(true)}
          disabled={isLoading}
          color="blue"
          variant="ghost"
        >
          <Edit className="h-4 w-4" />
        </IconButton>

        {/* Botón Cambiar Contraseña */}
        <IconButton
          tooltip="Cambiar contraseña"
          tooltipIcon={<Key className="h-3 w-3" />}
          onClick={() => setShowPasswordDialog(true)}
          disabled={isLoading}
          color="green"
          variant="ghost"
        >
          <Key className="h-4 w-4" />
        </IconButton>

        {/* Botón Activar/Desactivar */}
        <IconButton
          tooltip={usuario.activo ? "Desactivar usuario" : "Activar usuario"}
          tooltipIcon={usuario.activo ? <PowerOff className="h-3 w-3" /> : <Power className="h-3 w-3" />}
          onClick={handleToggleStatus}
          disabled={isLoading}
          color={usuario.activo ? "orange" : "green"}
          variant="ghost"
        >
          {usuario.activo ? (
            <PowerOff className="h-4 w-4" />
          ) : (
            <Power className="h-4 w-4" />
          )}
        </IconButton>
      </div>

      {/* Diálogo de editar usuario */}
      <CustomDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        title="Editar usuario"
        description="Modifique los campos que desee actualizar"
        size="2xl"
      >
        <UpdateUsuarioForm
          usuario={usuario}
          onSuccess={() => setShowEditDialog(false)}
          onCancel={() => setShowEditDialog(false)}
        />
      </CustomDialog>

      {/* Modal de cambiar contraseña */}
      <ChangePasswordModal
        usuario={usuario}
        isOpen={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onSuccess={forceRefresh}
      />
    </>
  );
}
