"use client";

import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { TipoCaja, TipoEstadoCaja, TipoEstadoTapa, TipoFugas, TipoLocalizacionCaja, TipoMaterial, TipoTapa } from "@/models/tipos";
import { getData } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";

interface DatosConexionDesagueProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosConexionDesague({ ficha, vistaSupervision }: DatosConexionDesagueProps) {

  const [tipoLocalizacionCaja, setTipoLocalizacionCaja] = useState<ComboboxOption[]>([]);
  const [tipoCaja, setTipoCaja] = useState<ComboboxOption[]>([]);
  const [tipoMaterial, setTipoMaterial] = useState<ComboboxOption[]>([]);
  const [tipoEstadoCaja, setTipoEstadoCaja] = useState<ComboboxOption[]>([]);
  const [tipoTapa, setTipoTapa] = useState<ComboboxOption[]>([]);
  const [tipoEstadoTapa, setTipoEstadoTapa] = useState<ComboboxOption[]>([]);
  const [tipoFugas, setTipoFugas] = useState<ComboboxOption[]>([]);

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
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div>
          <Label htmlFor="estado-conexion-desague" className="text-sm font-medium">
            61. Estado de Conexión desagüe
          </Label>
          <Input
            id="estado-conexion-desague"
            value={ficha.situacionconex_d || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="diametro-desague" className="text-sm font-medium">
            62. Diámetro
          </Label>
          <Input
            id="diametro-desague"
            value={ficha.coddiametro_d || "No registrado"}
            readOnly={vistaSupervision}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tipo-material-desague" className="text-sm font-medium">
            63. Tipo Material
          </Label>
          <ComboboxControlled
            options={tipoMaterial}
            value={ficha.tipomaterial_d || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        {/* Fila 2 */}
        <div>
          <Label htmlFor="caja-desague" className="text-sm font-medium">
            64. Caja
          </Label>
          <ComboboxControlled
            options={tipoCaja}
            value={ficha.tipocaja_d || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        <div>
          <Label htmlFor="localizacion-caja-desague" className="text-sm font-medium">
            65. Localización caja
          </Label>
          <ComboboxControlled
            options={tipoLocalizacionCaja}
            value={ficha.loccaja_d || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        <div>
          <Label htmlFor="estado-caja-desague" className="text-sm font-medium">
            66. Estado Caja
          </Label>
          <ComboboxControlled
            options={tipoEstadoCaja}
            value={ficha.estadocaja_d || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        {/* Fila 3 */}
        <div>
          <Label htmlFor="tapa-desague" className="text-sm font-medium">
            67. Tapa
          </Label>
          <ComboboxControlled
            options={tipoTapa}
            value={ficha.tipotapa_d || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        <div>
          <Label htmlFor="estado-tapa-desague" className="text-sm font-medium">
            68. Estado de la Tapa
          </Label>
          <ComboboxControlled
            options={tipoEstadoTapa}
            value={ficha.esttapa_d || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        <div>
          <Label htmlFor="fugas-desague" className="text-sm font-medium">
            69. Fugas
          </Label>
          <ComboboxControlled
            options={tipoFugas}
            value={ficha.fugasdesague || ""}
            placeholder="No registrado"
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>
      </div>
    </div>
  );
} 