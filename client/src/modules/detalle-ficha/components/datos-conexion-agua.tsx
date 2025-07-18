"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets } from "lucide-react";
import { DetalleFichaResponse } from "../action/detalle-ficha.action";

interface DatosConexionAguaProps {
  ficha: DetalleFichaResponse;
  vistaSupervision: boolean;
}

export default function DatosConexionAgua({ ficha, vistaSupervision }: DatosConexionAguaProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div>
          <Label htmlFor="estado-servicio" className="text-sm font-medium">
            30. Estado del Servicio
          </Label>
          <Input
            id="estado-servicio"
            value={ficha.estservicio_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="pavimentacion" className="text-sm font-medium">
            31. Pavimentación
          </Label>
          <Input
            id="pavimentacion"
            value={ficha.pavimento_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="vereda" className="text-sm font-medium">
            32. Vereda
          </Label>
          <Input
            id="vereda"
            value={ficha.vereda_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="diametro" className="text-sm font-medium">
            33. Diámetro
          </Label>
          <Input
            id="diametro"
            value={ficha.diametrocampo_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-material" className="text-sm font-medium">
            34. Tipo Material
          </Label>
          <Input
            id="tipo-material"
            value={ficha.materialtubo_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-ingreso" className="text-sm font-medium">
            35. Tipo de Ingreso
          </Label>
          <Input
            id="tipo-ingreso"
            value={ficha.tipoingreso_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="material-caja" className="text-sm font-medium">
            36. Material de Caja
          </Label>
          <Input
            id="material-caja"
            value={ficha.materialcaja_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="localizacion-caja" className="text-sm font-medium">
            37. Localización Caja
          </Label>
          <Input
            id="localizacion-caja"
            value={ficha.localizacion_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-caja" className="text-sm font-medium">
            38. Estado Caja
          </Label>
          <Input
            id="estado-caja"
            value={ficha.estadocaja_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 4 */}
        <div>
          <Label htmlFor="material-tapa" className="text-sm font-medium">
            39. Material de Tapa
          </Label>
          <Input
            id="material-tapa"
            value={ficha.materialtapa_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-tapa" className="text-sm font-medium">
            40. Estado de la Tapa
          </Label>
          <Input
            id="estado-tapa"
            value={ficha.estadotapa_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="llaves" className="text-sm font-medium">
            41. Llaves
          </Label>
          <Input
            id="llaves"
            value={ficha.llaves || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 5 */}
        <div>
          <Label htmlFor="posicion-medidor" className="text-sm font-medium">
            42. Posición medidor
          </Label>
          <Input
            id="posicion-medidor"
            value={ficha.posicionmedidor || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-corte" className="text-sm font-medium">
            43. Tipo de Corte
          </Label>
          <Input
            id="tipo-corte"
            value={ficha.tipocorte_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="razon-corte" className="text-sm font-medium">
            44. Razón del corte
          </Label>
          <Input
            id="razon-corte"
            value={ficha.razoncorte || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 6 */}
        <div>
          <Label htmlFor="fugas" className="text-sm font-medium">
            45. Fugas
          </Label>
          <Input
            id="fugas"
            value={ficha.fugas_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="caja-observacion" className="text-sm font-medium">
            46. Caja observación
          </Label>
          <Input
            id="caja-observacion"
            value={ficha.tipocajaobserv_a || ""}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
} 