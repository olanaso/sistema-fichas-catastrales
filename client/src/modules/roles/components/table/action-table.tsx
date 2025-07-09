"use client";

import { Button } from "@/components/ui/button";
import { UsuarioDto } from "@/models/usuario";
import { CircleX, Edit, Trash2, Lock, Power } from "lucide-react";
import { useState, useTransition } from "react";
import { toggleUsuarioStatus } from "../../action/usuario.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconButton } from "@/components/custom/icon-button";
import { LoadingButton } from "@/components/custom/loading-button";
import { toast } from "sonner";
import { useUsuarios } from "../../context/usuarios-context";

interface AcctionTableProps {
  usuario: UsuarioDto;
}

export default function AcctionTable({ usuario }: AcctionTableProps) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const { refreshUsuarios } = useUsuarios();

  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleUsuarioStatus(usuario.id, !usuario.activo);
      if (result.success) {
        toast.success(result.message);
        // Refrescar la tabla después de cambiar el estado
        await refreshUsuarios();
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

      {/* modal para cambiar estado del usuario */}
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
            <span className="font-bold">{usuario.nombres}</span>?
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
                <CircleX className="h-4 w-4" /> Cancelar
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
