"use client";

import { InspectorDto } from "@/models/inspector";
import { CustomDialog } from "@/components/custom/dialog";

interface UpdateInspectorFormProps {
  inspector: InspectorDto;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateInspectorForm({
  inspector,
  isOpen,
  onOpenChange,
}: UpdateInspectorFormProps) {

  return (
    <CustomDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Actualizar inspector"
      description="Completa la información para actualizar el inspector."
      size="2xl"
    >
      <div className="px-4 py-6">
        <p className="text-muted-foreground">
          Formulario de actualización de inspector pendiente de implementar.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Inspector: {inspector.nombres} ({inspector.codemp}-{inspector.codsede}-{inspector.codinspector})
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Aquí se implementará el formulario completo con todos los campos necesarios.
        </p>
      </div>
    </CustomDialog>
  );
} 