"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";

interface DatosMedidorProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosMedidor({ ficha, vistaSupervision }: DatosMedidorProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div>
          <Label htmlFor="numero-medidor" className="text-sm font-medium">
            50. Numero medidor
          </Label>
          <Input
            id="numero-medidor"
            value={ficha.nromed || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="ano" className="text-sm font-medium">
            51. Año
          </Label>
          <Input
            id="ano"
            value={ficha.anio || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="lectura-medidor" className="text-sm font-medium">
            52. Lectura Medidor
          </Label>
          <Input
            id="lectura-medidor"
            value={ficha.lecturaultima || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="numero-medidor-sistema" className="text-sm font-medium text-red-600">
            Numero medidor Sistema:
          </Label>
          <Input
            id="numero-medidor-sistema"
            value={ficha.nromed_new || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="fecha-instalacion" className="text-sm font-medium">
            53. Fecha de Instalación
          </Label>
          <Input
            id="fecha-instalacion"
            value={ficha.fechainstalacion?.toString() || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="marca" className="text-sm font-medium">
            54. Marca
          </Label>
          <Input
            id="marca"
            value={ficha.marcamed || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="diametro-medidor" className="text-sm font-medium">
            55. Diámetro del Medidor
          </Label>
          <Input
            id="diametro-medidor"
            value={ficha.coddiametro_m || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="lectura" className="text-sm font-medium">
            56. Lectura
          </Label>
          <Input
            id="lectura"
            value={ficha.lectura || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-facturacion" className="text-sm font-medium">
            57. Tipo Facturación
          </Label>
          <Input
            id="tipo-facturacion"
            value={ficha.tipofacturacion || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 4 */}
        <div>
          <Label htmlFor="tipo-lectura" className="text-sm font-medium">
            58. Tipo de Lectura
          </Label>
          <Input
            id="tipo-lectura"
            value={ficha.tipolectura || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-medidor" className="text-sm font-medium">
            59. Estado del Medidor
          </Label>
          <Input
            id="estado-medidor"
            value={ficha.estadomed || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="operativo" className="text-sm font-medium">
            60. Operativo
          </Label>
          <Input
            id="operativo"
            value={ficha.medidoroperativo || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6">
        <Label className="text-sm font-medium">
          Tiene Medidor:
        </Label>
        <div className="mt-2">
          <span className="text-sm text-muted-foreground">
            {ficha.tienemedidor ? "SÍ" : "NO"}
          </span>
        </div>
      </div>
    </div>
  );
} 