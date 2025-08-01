"use client";

import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cliente } from "@/models/cliente";
import { FichaCatastro } from "@/models/fichacatastro";
import { TipoCaja, TipoDiametro, TipoEstadoCaja, TipoEstadoServicio, TipoEstadoTapa, TipoFugas, TipoLocalizacionCaja, TipoMaterial, TipoTapa } from "@/models/tipos";
import { buscarExacto, getData } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";

interface DatosConexionDesagueProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
  vistaSupervision: boolean;
  handleActualizarAtributos: (atributo: string, valor: string) => void;
}

export default function DatosConexionDesague({ ficha, cliente, vistaSupervision, handleActualizarAtributos }: DatosConexionDesagueProps) {
  // Estado local para manejar los valores actualizados
  const [valoresActualizados, setValoresActualizados] = useState<{ [key: string]: string }>({});

  const [tipoLocalizacionCaja, setTipoLocalizacionCaja] = useState<ComboboxOption[]>([]);
  const [tipoCaja, setTipoCaja] = useState<ComboboxOption[]>([]);
  const [tipoMaterial, setTipoMaterial] = useState<ComboboxOption[]>([]);
  const [tipoEstadoCaja, setTipoEstadoCaja] = useState<ComboboxOption[]>([]);
  const [tipoTapa, setTipoTapa] = useState<ComboboxOption[]>([]);
  const [tipoEstadoTapa, setTipoEstadoTapa] = useState<ComboboxOption[]>([]);
  const [tipoFugas, setTipoFugas] = useState<ComboboxOption[]>([]);
  const [tipoDiametro, setTipoDiametro] = useState<ComboboxOption[]>([]);
  const [tipoEstadoServicio, setTipoEstadoServicio] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    getData("tipomaterial").then((res) => {
      setTipoMaterial(res.data.map((tipo: TipoMaterial) => ({ value: tipo.tipomaterial, label: tipo.descripcion })));
    });
    getData("tipocaja").then((res) => {
      setTipoCaja(res.data.map((tipo: TipoCaja) => ({ value: tipo.tipocaja, label: tipo.descripcion })));
    });
    getData("tipolocalizacaja").then((res) => {
      setTipoLocalizacionCaja(res.data.map((tipo: TipoLocalizacionCaja) => ({ value: tipo.loccaja, label: tipo.descripcion })));
    });
    getData("tipoestcaja").then((res) => {
      setTipoEstadoCaja(res.data.map((tipo: TipoEstadoCaja) => ({ value: tipo.estadocaja, label: tipo.descripcion })));
    });
    getData("tipotapa").then((res) => {
      setTipoTapa(res.data.map((tipo: TipoTapa) => ({ value: tipo.tipotapa, label: tipo.descripcion })));
    });
    getData("tipoesttapa").then((res) => {
      setTipoEstadoTapa(res.data.map((tipo: TipoEstadoTapa) => ({ value: tipo.esttapa, label: tipo.descripcion })));
    });
    getData("tipofugas").then((res) => {
      setTipoFugas(res.data.map((tipo: TipoFugas) => ({ value: tipo.tipofugas, label: tipo.descripcion })));
    });
    buscarExacto("diametros", ["tipocon"], ["002"]).then((res) => {
      setTipoDiametro(res.data.map((tipo: TipoDiametro) => ({ value: tipo.coddiametro, label: tipo.descripcion })));
    });
    getData("tipoestservicio").then((res) => {
      setTipoEstadoServicio(res.data.map((tipo: TipoEstadoServicio) => ({ value: tipo.estadoservicio, label: tipo.descripcion })));
    });
  }, []);

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
    <div className=" overflow-y-auto">
      <div className="rounded-lg">
        <div className="space-y-3">
          {/* Fila 1 - Estado de conexión */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <Label htmlFor="estado-conexion-desague" className="text-xs font-medium">
                61. Estado de Conexión desagüe
              </Label>
              <ComboboxControlled
                options={tipoEstadoServicio}
                value={obtenerValor("situacionconex_d", ficha.situacionconex_d)}
                placeholder="No registrado"
                className={`h-8 text-xs text-white
                  ${!vistaSupervision ?
                    "" :
                    !(cliente?.estadoservicio_d == ficha.situacionconex_d) ?
                    "dark:bg-red-500 bg-red-500" :
                    "dark:bg-green-500 bg-green-500"}`}
                onChange={(e) => manejarCambio("situacionconex_d", e.toString())}
              />
            </div>

            <div>
              <Label htmlFor="diametro-desague" className="text-xs font-medium">
                62. Diámetro
              </Label>
              <ComboboxControlled
                options={tipoDiametro}
                value={obtenerValor("coddiametro_d", ficha.coddiametro_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("coddiametro_d", e.toString())}
              />
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="tipo-material-desague" className="text-xs font-medium">
                63. Tipo Material
              </Label>
              <ComboboxControlled
                options={tipoMaterial}
                value={obtenerValor("tipomaterial_d", ficha.tipomaterial_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("tipomaterial_d", e.toString())}
              />
            </div>

            <div>
              <Label htmlFor="caja-desague" className="text-xs font-medium">
                64. Caja
              </Label>
              <ComboboxControlled
                options={tipoCaja}
                value={obtenerValor("tipocaja_d", ficha.tipocaja_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("tipocaja_d", e.toString())}
              />
            </div>

            <div>
              <Label htmlFor="localizacion-caja-desague" className="text-xs font-medium">
                65. Localización caja
              </Label>
              <ComboboxControlled
                options={tipoLocalizacionCaja}
                value={obtenerValor("loccaja_d", ficha.loccaja_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("loccaja_d", e.toString())}
              />
            </div>
          </div>

          {/* Fila 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="estado-caja-desague" className="text-xs font-medium">
                66. Estado Caja
              </Label>
              <ComboboxControlled
                options={tipoEstadoCaja}
                value={obtenerValor("estadocaja_d", ficha.estadocaja_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("estadocaja_d", e.toString())}
              />
            </div>

            <div>
              <Label htmlFor="tapa-desague" className="text-xs font-medium">
                67. Tapa
              </Label>
              <ComboboxControlled
                options={tipoTapa}
                value={obtenerValor("tipotapa_d", ficha.tipotapa_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("tipotapa_d", e.toString())}
              />
            </div>

            <div>
              <Label htmlFor="estado-tapa-desague" className="text-xs font-medium">
                68. Estado de la Tapa
              </Label>
              <ComboboxControlled
                options={tipoEstadoTapa}
                value={obtenerValor("esttapa_d", ficha.esttapa_d)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("esttapa_d", e.toString())}
              />
            </div>
          </div>

          {/* Fila 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <Label htmlFor="fugas-desague" className="text-xs font-medium">
                69. Fugas
              </Label>
              <ComboboxControlled
                options={tipoFugas}
                value={obtenerValor("fugasdesague", ficha.fugasdesague)}
                placeholder="No registrado"
                className="h-8 text-xs mt-1"
                onChange={(e) => manejarCambio("fugasdesague", e.toString())}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 