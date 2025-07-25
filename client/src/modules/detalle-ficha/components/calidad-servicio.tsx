"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FichaCatastro } from "@/models/fichacatastro";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import { TipoAccionComercial, TipoFichaIncompleta, TipoPresionAgua } from "@/models/tipos";
import { ComboboxOption } from "@/types/combobox";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";

interface CalidadServicioProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function CalidadServicio({ ficha, vistaSupervision }: CalidadServicioProps) {

  const [tipoAccionComercial, setTipoAccionComercial] = useState<ComboboxOption[]>([]);
  const [tipoFichaIncompleta, setTipoFichaIncompleta] = useState<ComboboxOption[]>([]);
  const [tipoPresionAgua, setTipoPresionAgua] = useState<ComboboxOption[]>([]);
  

  useEffect(() => {
    getData("tipoacccomercial").then((res) => {
      setTipoAccionComercial(res.data.map((tipo: TipoAccionComercial) => ({ value: tipo.tipoacccomercial, label: tipo.descripcion })));
    });
    getData("tipofichaincompleta").then((res) => {
      setTipoFichaIncompleta(res.data.map((tipo: TipoFichaIncompleta) => ({ value: tipo.tipofichaincompleta, label: tipo.descripcion })));
    });
    getData("tipopresionagu").then((res) => {
      setTipoPresionAgua(res.data.map((tipo: TipoPresionAgua) => ({ value: tipo.tipopresionagu, label: tipo.descripcion })));
    });
  }, []);

  const servicios = [
    { nombre: "Lavatorios", cantidad: ficha.nrolavatorios || "-", estado: ficha.estadolavatorios || "-" },
    { nombre: "Lavadora", cantidad: ficha.nrolavadoras || "-", estado: ficha.estadolavadoras || "-" },
    { nombre: "Water", cantidad: ficha.nrowater || "-", estado: ficha.estadowater || "-" },
    { nombre: "Duchas", cantidad: ficha.nroduchas || "-", estado: ficha.estadoduchas || "-" },
    { nombre: "Urinarios", cantidad: ficha.nrourinarios || "-", estado: ficha.estadourinarios || "-" },
    { nombre: "Grifo", cantidad: ficha.nrogrifos || "-", estado: ficha.estadogrifos || "-" },
    { nombre: "Piscina", cantidad: ficha.nropiscina || "-", estado: ficha.estadopiscina || "-" },
    { nombre: "Tanque Cisterna", cantidad: ficha.nrotanquecisterna || "-", estado: ficha.estadotanquecisterna || "-" },
    { nombre: "Tanque Elevado", cantidad: ficha.nrotanqueelevado || "-", estado: ficha.estadotanqueelevado || "-" }
  ];

  return (
    <div className="overflow-y-auto space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Columna izquierda */}
        <div className="space-y-4">
          {/* Calidad de Servicio */}
          <div className="rounded-lg">
            <h3 className="text-base font-semibold mb-3">CALIDAD DE SERVICIO</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="horas-dia" className="text-xs font-medium">
                  70. Horas/día
                </Label>
                <Input
                  id="horas-dia"
                  defaultValue={ficha.horasxdia || "No registrado"}
                  readOnly={vistaSupervision}
                  className="h-8 text-sm mt-1"
                  type="number"
                  max="24"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="dias-semana" className="text-xs font-medium">
                  71. Días/sem
                </Label>
                <Input
                  id="dias-semana"
                  defaultValue={ficha.diasxsemana || "No registrado"}
                  readOnly={vistaSupervision}
                  className="h-8 text-sm mt-1"
                  type="number"
                  max="7"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="presion-agua" className="text-xs font-medium">
                  72. Presión Agua
                </Label>
                <ComboboxControlled
                  options={tipoPresionAgua}
                  value={ficha.presionagu || ""}
                  placeholder="No registrado"
                  className="h-8 text-xs"
                  disabled={vistaSupervision}
                />
              </div>
            </div>
          </div>

          {/* Medidas */}
          <div className="rounded-lg">
            <h3 className="text-base font-semibold mb-3">MEDIDAS</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="frente-lote" className="text-xs font-medium">
                  75. Frente principal de Lote (m)
                </Label>
                <Input
                  id="frente-lote"
                  defaultValue={ficha.medidalotefrente || "No registrado"}
                  readOnly={vistaSupervision}
                  className="h-8 text-sm mt-1"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="distancia-caja-agua" className="text-xs font-medium">
                  76. Distancia eje de caja de agua (m)
                </Label>
                <Input
                  id="distancia-caja-agua"
                  defaultValue={ficha.medidaejeagua || "No registrado"}
                  readOnly={vistaSupervision}
                  className="h-8 text-sm mt-1"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="distancia-caja-desague" className="text-xs font-medium">
                  77. Distancia eje de caja de desagüe (m)
                </Label>
                <Input
                  id="distancia-caja-desague"
                  defaultValue={ficha.medidaejedesague || "No registrado"}
                  readOnly={vistaSupervision}
                  className="h-8 text-sm mt-1"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Ficha Incompleta / ACCIÓN COMERCIAL */}
          <div className="rounded-lg">
            <h3 className="text-base font-semibold mb-3">FICHA INCOMPLETA / ACCIÓN COMERCIAL</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ficha-incompleta" className="text-xs font-medium">
                  73. Ficha Incompleta
                </Label>
                <ComboboxControlled
                  options={tipoFichaIncompleta}
                  value={ficha.fichaincompleta || ""}
                  placeholder="No registrado"
                  className="h-8 text-xs"
                  disabled={vistaSupervision}
                />
              </div>

              <div>
                <Label htmlFor="tipo-accion-comercial" className="text-xs font-medium">
                  74. Tipo Acción Comercial
                </Label>
                <ComboboxControlled
                  options={tipoAccionComercial}
                  value={ficha.tipoacccomercial || ""}
                  placeholder="No registrado"
                  className="h-8 text-xs"
                  disabled={vistaSupervision}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-4">
          {/* Número de Servicio */}
          <div className="rounded-lg p-1">
            <h3 className="text-base font-semibold mb-3">NÚMERO DE SERVICIO</h3>
            <div className="overflow-x-auto">
              <Table className="text-sm">
                <TableHeader>
                  <TableRow className="h-8">
                    <TableHead className="text-xs font-semibold">SERVICIO</TableHead>
                    <TableHead className="text-xs font-semibold text-center w-20">CANT.</TableHead>
                    <TableHead className="text-xs font-semibold text-center">ESTADO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicios.map((servicio, index) => (
                    <TableRow key={index} className="h-8">
                      <TableCell className="font-medium text-xs py-1">{servicio.nombre}</TableCell>
                      <TableCell className="text-center text-xs py-1">{servicio.cantidad}</TableCell>
                      <TableCell className="py-1 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${servicio.estado === "REGULAR"
                          ? "bg-green-100 text-green-800"
                          : servicio.estado === "1"
                            ? "bg-blue-100 text-blue-800"
                            : servicio.estado === "0"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-600"
                          }`}>
                          {servicio.estado}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Observación */}
          <div className="rounded-lg p-1">
            <h3 className="text-base font-semibold mb-3">OBSERVACIÓN</h3>
            <Textarea
              defaultValue={ficha.observacion || ""}
              readOnly={vistaSupervision}
              placeholder="Ingrese observaciones..."
              className="min-h-[80px] text-sm resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 