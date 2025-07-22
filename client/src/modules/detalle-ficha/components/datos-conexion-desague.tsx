"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Waves } from "lucide-react";
import { FichaCatastro } from "@/models/fichacatastro";

interface DatosConexionDesagueProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosConexionDesague({ ficha, vistaSupervision }: DatosConexionDesagueProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div>
          <Label htmlFor="estado-conexion-desague" className="text-sm font-medium">
            60. Estado de Conexión desagüe
          </Label>
          <Input
            id="estado-conexion-desague"
            value={ficha.situacionconex_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="diametro-desague" className="text-sm font-medium">
            61. Diámetro
          </Label>
          <Input
            id="diametro-desague"
            value={ficha.coddiametro_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-material-desague" className="text-sm font-medium">
            62. Tipo Material
          </Label>
          <Input
            id="tipo-material-desague"
            value={ficha.tipomaterial_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="caja-desague" className="text-sm font-medium">
            63. Caja
          </Label>
          <Input
            id="caja-desague"
            value={ficha.concajadesague?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="localizacion-caja-desague" className="text-sm font-medium">
            64. Localización caja
          </Label>
          <Input
            id="localizacion-caja-desague"
            value={ficha.loccaja_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-caja-desague" className="text-sm font-medium">
            65. Estado Caja
          </Label>
          <Input
            id="estado-caja-desague"
            value={ficha.estadocaja_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="tapa-desague" className="text-sm font-medium">
            66. Tapa
          </Label>
          <Input
            id="tapa-desague"
            value={ficha.tipotapa_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-tapa-desague" className="text-sm font-medium">
            67. Estado de la Tapa
          </Label>
          <Input
            id="estado-tapa-desague"
            value={ficha.esttapa_d?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="fugas-desague" className="text-sm font-medium">
            68. Fugas
          </Label>
          <Input
            id="fugas-desague"
            value={ficha.fugasdesague?.toString() || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 text-red-600 text-sm">
        <p>Estado Caja: {ficha.estadocaja_d?.toString() || ""} | Estado Tapa: {ficha.esttapa_d?.toString() || ""}</p>
      </div>
    </div>
  );
} 