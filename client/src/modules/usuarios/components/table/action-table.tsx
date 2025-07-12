"use client";

import { useState, useTransition } from "react";
import { Edit, Lock, Power } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { UpdateUsuarioForm } from "../forms/update-usuario";
import { ChangePasswordForm } from "../forms/change-password";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/custom/loading-button";
import { toast } from "sonner";
import { toggleUsuarioStatus } from "../../action/usuario.actions";
import { useUsuarios } from "../../context/usuarios-context";
import { UsuarioDto } from "@/models/usuario";

interface AcctionTableProps {
  usuario: UsuarioDto;
}

export default function AcctionTable({ usuario }: AcctionTableProps) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const { refreshUsuarios, pagination } = useUsuarios();

  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleUsuarioStatus(parseInt(usuario.codusu), !usuario.activo);
      if (result.success) {
        toast.success(result.message);
        // Refrescar la tabla después de cambiar el estado, manteniendo la página actual
        await refreshUsuarios(pagination.page, pagination.pageSize);
      } else {
        toast.error(result.message || result.error);
      }
    });
  };

  return (
    <div className="flex gap-2">
      <IconButton
        tooltip="Actualizar usuario"
        tooltipIcon={<Edit className="h-3 w-3" />}
        onClick={() => setIsOpenUpdate(true)}
        disabled={isPending}
        color="blue"
        variant="ghost"
      >
        <Edit className="h-4 w-4" />
      </IconButton>
      <IconButton
        tooltip="Cambiar contraseña"
        tooltipIcon={<Lock className="h-3 w-3" />}
        onClick={() => setIsOpenPassword(true)}
        disabled={isPending}
        color="green"
        variant="ghost"
      >
        <Lock className="h-4 w-4" />
      </IconButton>
      <IconButton
        tooltip={usuario.activo ? "Desactivar usuario" : "Activar usuario"}
        tooltipIcon={<Power className="h-3 w-3" />}
        onClick={() => setIsOpenStatus(true)}
        disabled={isPending}
        color={usuario.activo ? "red" : "green"}
        variant="ghost"
      >
        <Power className="h-4 w-4" />
      </IconButton>

      {/* Dialog para actualizar el usuario */}
      <UpdateUsuarioForm
        usuario={usuario}
        isOpen={isOpenUpdate}
        onOpenChange={setIsOpenUpdate}
      />

      {/* Dialog para cambiar contraseña */}
      <ChangePasswordForm
        usuario={usuario}
        isOpen={isOpenPassword}
        onOpenChange={setIsOpenPassword}
      />

      {/* Dialog de confirmación para cambiar estado */}
      <Dialog open={isOpenStatus} onOpenChange={setIsOpenStatus}>
        <DialogContent className="w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {usuario.activo ? "Desactivar Usuario" : "Activar Usuario"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-sm text-gray-700">
            ¿Estás seguro de querer{" "}
            {usuario.activo ? "desactivar" : "activar"} a{" "}
            <span className="font-bold">{usuario.nombre} {usuario.apellidopa}</span>?
            {usuario.activo ? (
              <span className="block mt-2 text-red-600">
                El usuario no podrá acceder al sistema
              </span>
            ) : (
              <span className="block mt-2 text-green-600">
                El usuario podrá acceder al sistema
              </span>
            )}
          </DialogDescription>
          <DialogFooter>
            <div className="flex gap-2 justify-center w-full">
              <Button variant="outline" onClick={() => setIsOpenStatus(false)}>
                Cancelar
              </Button>
              <LoadingButton
                variant={usuario.activo ? "destructive" : "default"}
                onClick={handleToggleStatus}
                isLoading={isPending}
                loadingText={usuario.activo ? "Desactivando..." : "Activando..."}
              >
                <Power className="h-4 w-4" />
                {usuario.activo ? "Desactivar" : "Activar"}
              </LoadingButton>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
