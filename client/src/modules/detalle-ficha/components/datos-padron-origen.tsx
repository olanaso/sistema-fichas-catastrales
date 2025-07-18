"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "lucide-react";
import { DetalleFichaResponse } from "../action/detalle-ficha.action";

interface DatosPadronOrigenProps {
  ficha: DetalleFichaResponse;
  vistaSupervision: boolean;
}

export default function DatosPadronOrigen({ ficha, vistaSupervision }: DatosPadronOrigenProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div>
          <Label htmlFor="padron" className="text-sm font-medium">
            Padrón
          </Label>
          <Input
            id="padron"
            value={ficha.codcatastral || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="sector" className="text-sm font-medium">
            Sector
          </Label>
          <Input
            id="sector"
            value={ficha.sector || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="manzana" className="text-sm font-medium">
            Manzana
          </Label>
          <Input
            id="manzana"
            value={ficha.mzna || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="lote" className="text-sm font-medium">
            Lote
          </Label>
          <Input
            id="lote"
            value={ficha.lote || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="sub-lote" className="text-sm font-medium">
            Sub Lote
          </Label>
          <Input
            id="sub-lote"
            value={ficha.sublote || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="edificio" className="text-sm font-medium">
            Edificio
          </Label>
          <Input
            id="edificio"
            value={ficha.urbanizacion || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="piso" className="text-sm font-medium">
            Piso
          </Label>
          <Input
            id="piso"
            value={ficha.nropisos || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="unidad" className="text-sm font-medium">
            Unidad
          </Label>
          <Input
            id="unidad"
            value={ficha.nromuni || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="codigo-catastral" className="text-sm font-medium">
            Código Catastral
          </Label>
          <Input
            id="codigo-catastral"
            value={ficha.codcatastral || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 4 */}
        <div>
          <Label htmlFor="direccion" className="text-sm font-medium">
            Dirección
          </Label>
          <Input
            id="direccion"
            value={ficha.calle || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="distrito" className="text-sm font-medium">
            Distrito
          </Label>
          <Input
            id="distrito"
            value={ficha.coddist || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="provincia" className="text-sm font-medium">
            Provincia
          </Label>
          <Input
            id="provincia"
            value={ficha.coddist || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 5 */}
        <div>
          <Label htmlFor="departamento" className="text-sm font-medium">
            Departamento
          </Label>
          <Input
            id="departamento"
            value={ficha.codsector_new || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="coordenada-x" className="text-sm font-medium">
            Coordenada X
          </Label>
          <Input
            id="coordenada-x"
            value={ficha.posicionx || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="coordenada-y" className="text-sm font-medium">
            Coordenada Y
          </Label>
          <Input
            id="coordenada-y"
            value={ficha.posiciony || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Información del Padrón</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <span className="font-medium">Padrón Completo:</span> {ficha.codcatastral || ""} - {ficha.sector || ""} - {ficha.mzna || ""} - {ficha.lote || ""}
          </div>
          <div>
            <span className="font-medium">Ubicación:</span> {ficha.coddist || ""}, {ficha.codsector_new || ""}
          </div>
        </div>
      </div>
    </div>
  );
} 