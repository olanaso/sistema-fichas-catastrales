"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
import { DetalleFichaResponse } from "../action/detalle-ficha.action";

interface CalidadServicioProps {
  ficha: DetalleFichaResponse;
  vistaSupervision: boolean;
}

export default function CalidadServicio({ ficha, vistaSupervision }: CalidadServicioProps) {
  const servicios = [
    { nombre: "Lavatorios", cantidad: ficha.nrolavatorios || "0", estado: "REGULAR" },
    { nombre: "Lavadora", cantidad: ficha.nrolavadoras || "0", estado: "Seleccionar" },
    { nombre: "Water", cantidad: ficha.nrowater || "1", estado: "REGULAR" },
    { nombre: "Duchas", cantidad: ficha.nroduchas || "1", estado: "REGULAR" },
    { nombre: "Urinarios", cantidad: ficha.nrourinarios || "2", estado: "REGULAR" },
    { nombre: "Grifo", cantidad: ficha.nrogrifos || "0", estado: "Seleccionar" },
    { nombre: "Piscina", cantidad: ficha.nropiscina || "0", estado: "Seleccionar" },
    { nombre: "Tanque Cisterna", cantidad: ficha.nrotanquecisterna || "0", estado: "Seleccionar" },
    { nombre: "Tanque Elevado", cantidad: ficha.nrotanqueelevado || "0", estado: "Seleccionar" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Calidad de Servicio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CALIDAD DE SERVICIO</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="horas-dia" className="text-sm font-medium">
                  69. Horas por día
                </Label>
                <Input
                  id="horas-dia"
                  value={ficha.horasxdia || "18"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dias-semana" className="text-sm font-medium">
                  70. Días por semana
                </Label>
                <Input
                  id="dias-semana"
                  value={ficha.diasxsemana || "7"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="presion-agua" className="text-sm font-medium">
                  71. Presión agua
                </Label>
                <Input
                  id="presion-agua"
                  value={ficha.presionagu || "MEDIA"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Observación */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">OBSERVACION</h3>
            <Textarea
              value={ficha.observacion || ""}
              readOnly={vistaSupervision}
              placeholder="Ingrese observaciones..."
              className="min-h-[100px]"
            />
          </div>

          {/* Ficha Incompleta / Tipo Acción Comercial */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">FICHA INCOMPLETA / TIPO ACCION COMERCIAL</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ficha-incompleta" className="text-sm font-medium">
                  71. Ficha Incompleta
                </Label>
                <Input
                  id="ficha-incompleta"
                  value={ficha.fichaincompleta || ""}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tipo-accion-comercial" className="text-sm font-medium">
                  71. Tipo Acción Comercial
                </Label>
                <Input
                  id="tipo-accion-comercial"
                  value={ficha.tipoacccomercial || "NINGUNO"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Medidas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">MEDIDAS</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="frente-lote" className="text-sm font-medium">
                  70. Frente principal de Lote (m)
                </Label>
                <Input
                  id="frente-lote"
                  value={ficha.medidalotefrente || "0.00"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="distancia-caja-agua" className="text-sm font-medium">
                  70. Distancia eje de caja de agua (m)
                </Label>
                <Input
                  id="distancia-caja-agua"
                  value={ficha.medidaejedesague || "0.00"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="distancia-caja-desague" className="text-sm font-medium">
                  70. Distancia eje de caja de desagüe (m)
                </Label>
                <Input
                  id="distancia-caja-desague"
                  value={ficha.medidaejedesague || "0.00"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Número de Servicio */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">NUMERO DE SERVICIO</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SERVICIO</TableHead>
                <TableHead>CANTIDAD</TableHead>
                <TableHead>ESTADO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicios.map((servicio, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{servicio.nombre}</TableCell>
                  <TableCell>{servicio.cantidad}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      servicio.estado === "REGULAR" 
                        ? "bg-green-100 text-green-800" 
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
    </div>
  );
} 