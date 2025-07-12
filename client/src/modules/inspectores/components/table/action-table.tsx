"use client";

import { useState, useTransition } from "react";
import { Edit, Trash2, Power } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
// import { UpdateInspectorForm } from "../forms/update-inspector";
// import { CreateInspectorForm } from "../forms/create-inspector";
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
import { InspectorDto } from "@/models/inspector";
import { useInspectores } from "../../context/inspectores-context";

interface InspectorActionTableProps {
  inspector: InspectorDto;
}

export default function InspectorActionTable({ inspector }: InspectorActionTableProps) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const { refreshData, pagination } = useInspectores();

  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      // TODO: Implementar función para cambiar estado del inspector
      toast.success("Función de cambio de estado pendiente de implementar");
      // await refreshData(pagination.page, pagination.pageSize);
    });
  };

  return (
    <div className="flex gap-2">
      <IconButton
        tooltip="Actualizar inspector"
        tooltipIcon={<Edit className="h-3 w-3" />}
        onClick={() => setIsOpenUpdate(true)}
        disabled={isPending}
        color="blue"
        variant="ghost"
      >
        <Edit className="h-4 w-4" />
      </IconButton>
      <IconButton
        tooltip={inspector.estareg === 1 ? "Desactivar inspector" : "Activar inspector"}
        tooltipIcon={<Power className="h-3 w-3" />}
        onClick={() => setIsOpenStatus(true)}
        disabled={isPending}
        color={inspector.estareg === 1 ? "red" : "green"}
        variant="ghost"
      >
        <Power className="h-4 w-4" />
      </IconButton>

      {/* Dialog para actualizar el inspector */}
      {/* <UpdateInspectorForm
        inspector={inspector}
        isOpen={isOpenUpdate}
        onOpenChange={setIsOpenUpdate}
      />

      {/* Dialog de confirmación para cambiar estado */}
      <Dialog open={isOpenStatus} onOpenChange={setIsOpenStatus}>
        <DialogContent className="w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {inspector.estareg === 1 ? "Desactivar Inspector" : "Activar Inspector"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-sm text-gray-700">
            ¿Estás seguro de querer{" "}
            {inspector.estareg === 1 ? "desactivar" : "activar"} a{" "}
            <span className="font-bold">{inspector.nombres}</span>?
            {inspector.estareg === 1 ? (
              <span className="block mt-2 text-red-600">
                El inspector no podrá realizar actividades
              </span>
            ) : (
              <span className="block mt-2 text-green-600">
                El inspector podrá realizar actividades
              </span>
            )}
          </DialogDescription>
          <DialogFooter>
            <div className="flex gap-2 justify-center w-full">
              <Button variant="outline" onClick={() => setIsOpenStatus(false)}>
                Cancelar
              </Button>
              <LoadingButton
                variant={inspector.estareg === 1 ? "destructive" : "default"}
                onClick={handleToggleStatus}
                isLoading={isPending}
                loadingText={inspector.estareg === 1 ? "Desactivando..." : "Activando..."}
              >
                <Power className="h-4 w-4" />
                {inspector.estareg === 1 ? "Desactivar" : "Activar"}
              </LoadingButton>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 