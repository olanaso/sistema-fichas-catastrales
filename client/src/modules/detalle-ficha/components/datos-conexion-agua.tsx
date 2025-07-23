"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets } from "lucide-react";
import { FichaCatastro } from "@/models/fichacatastro";

interface DatosConexionAguaProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosConexionAgua({ ficha, vistaSupervision }: DatosConexionAguaProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div>
          <Label htmlFor="estado-servicio" className="text-sm font-medium">
            33. Estado del Servicio
          </Label>
          <Input
            id="estado-servicio"
            value={ficha.estadoservicio || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="pavimentacion" className="text-sm font-medium">
            34. Pavimentación
          </Label>
          <Input
            id="pavimentacion"
            value={ficha.pavconagu_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="vereda" className="text-sm font-medium">
            35. Vereda
          </Label>
          <Input
            id="vereda"
            value={ficha.vereda_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="diametro" className="text-sm font-medium">
            36. Diámetro
          </Label>
          <Input
            id="diametro"
            value={ficha.coddiametro_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-material" className="text-sm font-medium">
            37. Tipo Material
          </Label>
          <Input
            id="tipo-material"
            value={ficha.tipomaterial_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-ingreso" className="text-sm font-medium">
            38. Tipo de Ingreso
          </Label>
          <Input
            id="tipo-ingreso"
            value={ficha.tipoingreso || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="material-caja" className="text-sm font-medium">
            39. Material de Caja
          </Label>
          <Input
            id="material-caja"
            value={ficha.tipocaja_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="localizacion-caja" className="text-sm font-medium">
            40. Localización Caja
          </Label>
          <Input
            id="localizacion-caja"
            value={ficha.loccaja_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-caja" className="text-sm font-medium">
            41. Estado Caja
          </Label>
          <Input
            id="estado-caja"
            value={ficha.estadocaja_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 4 */}
        <div>
          <Label htmlFor="material-tapa" className="text-sm font-medium">
            42. Material de Tapa
          </Label>
          <Input
            id="material-tapa"
            value={ficha.tipotapa_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="estado-tapa" className="text-sm font-medium">
            43. Estado de la Tapa
          </Label>
          <Input
            id="estado-tapa"
            value={ficha.esttapa_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="llaves" className="text-sm font-medium">
            44. Llaves
          </Label>
          <Input
            id="llaves"
            value={ficha.llavemed || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 5 */}
        <div>
          <Label htmlFor="posicion-medidor" className="text-sm font-medium">
            45. Posición medidor
          </Label>
          <Input
            id="posicion-medidor"
            value={ficha.posicionmed || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-corte" className="text-sm font-medium">
            46. Tipo de Corte
          </Label>
          <Input
            id="tipo-corte"
            value={ficha.tipocorte_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="razon-corte" className="text-sm font-medium">
            47. Razón del corte
          </Label>
          <Input
            id="razon-corte"
            value={ficha.tipocerrado || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        {/* Fila 6 */}
        <div>
          <Label htmlFor="fugas" className="text-sm font-medium">
            48. Fugas
          </Label>
          <Input
            id="fugas"
            value={ficha.tipofugas_a || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="caja-observacion" className="text-sm font-medium">
            49. Caja observación
          </Label>
          <Input
            id="caja-observacion"
            value={ficha.tipocajaobserv || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
} 