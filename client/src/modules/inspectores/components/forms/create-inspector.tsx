"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomSheet } from "@/components/custom/sheet";

export function CreateInspectorForm() {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowSheet(true)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Crear Inspector
      </Button>

      <CustomSheet
        open={showSheet}
        onOpenChange={setShowSheet}
        title="Crear nuevo inspector"
        description="Completa la información para crear un nuevo inspector."
      >
        <div className="px-4 py-6">
          <p className="text-muted-foreground">
            Formulario de creación de inspector pendiente de implementar.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Aquí se implementará el formulario completo con todos los campos necesarios.
          </p>
        </div>
      </CustomSheet>
    </>
  );
} 