"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import { useState } from "react";

interface DatosPadronOrigenProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
  handleActualizarAtributos: (atributo: string, valor: string) => void;
}

export default function DatosPadronOrigen({ ficha, cliente, handleActualizarAtributos }: DatosPadronOrigenProps) {
  // Estado local para manejar los valores actualizados
  const [valoresActualizados, setValoresActualizados] = useState<{ [key: string]: string }>({});

  // Función para obtener el valor actual (del estado local o de ficha)
  const obtenerValor = (campo: string, valorOriginal: string | number | null | undefined) => {
    return valoresActualizados[campo] !== undefined 
      ? valoresActualizados[campo] 
      : valorOriginal?.toString() || "No registrado";
  };

  // Función para manejar cambios
  const manejarCambio = (campo: string, valor: string) => {
    setValoresActualizados(prev => ({ ...prev, [campo]: valor }));
    handleActualizarAtributos(campo, valor);
  };

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
            value={obtenerValor("nrocatastro", ficha.nrocatastro)}
            className="mt-1"
            onChange={(e) => manejarCambio("nrocatastro", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="sector" className="text-sm font-medium">
            Sector
          </Label>
          <Input
            id="sector"
            value={obtenerValor("codsector_new", ficha.codsector_new)}
            className="mt-1"
            onChange={(e) => manejarCambio("codsector_new", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="manzana" className="text-sm font-medium">
            Manzana
          </Label>
          <Input
            id="manzana"
            value={obtenerValor("codmza_new", ficha.codmza_new)}
            className="mt-1"
            onChange={(e) => manejarCambio("codmza_new", e.target.value)}
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="lote" className="text-sm font-medium">
            Lote
          </Label>
          <Input
            id="lote"
            value={obtenerValor("nrolote_new", ficha.nrolote_new)}
            className="mt-1"
            onChange={(e) => manejarCambio("nrolote_new", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="sub-lote" className="text-sm font-medium">
            Sub Lote
          </Label>
          <Input
            id="sub-lote"
            value={obtenerValor("nrosublote", ficha.nrosublote)}
            className="mt-1"
            onChange={(e) => manejarCambio("nrosublote", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="edificio" className="text-sm font-medium">
            Edificio
          </Label>
          <Input
            id="edificio"
            value={obtenerValor("edificio", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("edificio", e.target.value)}
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="piso" className="text-sm font-medium">
            Piso
          </Label>
          <Input
            id="piso"
            value={obtenerValor("piso", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("piso", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="unidad" className="text-sm font-medium">
            Unidad
          </Label>
          <Input
            id="unidad"
            value={obtenerValor("unidad", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("unidad", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="codigo-catastral" className="text-sm font-medium">
            Código Catastral
          </Label>
          <Input
            id="codigo-catastral"
            value={obtenerValor("nrocatastro", ficha.nrocatastro)}
            className="mt-1"
            onChange={(e) => manejarCambio("nrocatastro", e.target.value)}
          />
        </div>

        {/* Fila 4 */}
        <div>
          <Label htmlFor="direccion" className="text-sm font-medium">
            Dirección
          </Label>
          <Input
            id="direccion"
            value={obtenerValor("direccion", ficha.direccion)}
            className="mt-1"
            onChange={(e) => manejarCambio("direccion", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="distrito" className="text-sm font-medium">
            Distrito
          </Label>
          <Input
            id="distrito"
            value={obtenerValor("distrito", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("distrito", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="provincia" className="text-sm font-medium">
            Provincia
          </Label>
          <Input
            id="provincia"
            value={obtenerValor("codprov", ficha.codprov)}
            className="mt-1"
            onChange={(e) => manejarCambio("codprov", e.target.value)}
          />
        </div>

        {/* Fila 5 */}
        <div>
          <Label htmlFor="departamento" className="text-sm font-medium">
            Departamento
          </Label>
          <Input
            id="departamento"
            value={obtenerValor("departamento", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("departamento", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="coordenada-x" className="text-sm font-medium">
            Coordenada X
          </Label>
          <Input
            id="coordenada-x"
            value={obtenerValor("coordenada_x", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("coordenada_x", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="coordenada-y" className="text-sm font-medium">
            Coordenada Y
          </Label>
          <Input
            id="coordenada-y"
            value={obtenerValor("coordenada_y", "No atributos")}
            className="mt-1"
            onChange={(e) => manejarCambio("coordenada_y", e.target.value)}
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Información del Padrón</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <span className="font-medium">Padrón Completo:</span> {ficha.nrocatastro?.toString() || ""} - {ficha.codsector_new || ""} - {ficha.codmza_new || ""} - {ficha.nrolote_new || ""}
          </div>
          <div>
            <span className="font-medium">Ubicación:</span> {ficha.codprov || ""}, {ficha.codsector_new || ""}
          </div>
        </div>
      </div>
    </div>
  );
} 