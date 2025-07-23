"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FichaCatastro } from "@/models/fichacatastro";

interface CalidadServicioProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function CalidadServicio({ ficha, vistaSupervision }: CalidadServicioProps) {
  const servicios = [
    { nombre: "Lavatorios", cantidad: ficha.nrolavatorios || "-", estado: ficha.estadolavatorios || "No registrado" },
    { nombre: "Lavadora", cantidad: ficha.nrolavadoras || "-", estado: ficha.estadolavadoras || "No registrado" },
    { nombre: "Water", cantidad: ficha.nrowater || "-", estado: ficha.estadowater || "No registrado" },
    { nombre: "Duchas", cantidad: ficha.nroduchas || "-", estado: ficha.estadoduchas || "No registrado" },
    { nombre: "Urinarios", cantidad: ficha.nrourinarios || "-", estado: ficha.estadourinarios || "No registrado" },
    { nombre: "Grifo", cantidad: ficha.nrogrifos || "-", estado: ficha.estadogrifos || "No registrado" },
    { nombre: "Piscina", cantidad: ficha.nropiscina || "-", estado: ficha.estadopiscina || "No registrado" },
    { nombre: "Tanque Cisterna", cantidad: ficha.nrotanquecisterna || "-", estado: ficha.estadotanquecisterna || "No registrado" },
    { nombre: "Tanque Elevado", cantidad: ficha.nrotanqueelevado || "-", estado: ficha.estadotanqueelevado || "No registrado" }
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
                  70. Horas/día
                </Label>
                <Input
                  id="horas-dia"
                  value={ficha.horasxdia || "No registrado"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dias-semana" className="text-sm font-medium">
                  71. Días/sem
                </Label>
                <Input
                  id="dias-semana"
                  value={ficha.diasxsemana || "No registrado"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="presion-agua" className="text-sm font-medium">
                  72. Presión Agua
                </Label>
                <Input
                  id="presion-agua"
                  value={ficha.presionagu || "No registrado"}
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
                  73. Ficha Incompleta
                </Label>
                <Input
                  id="ficha-incompleta"
                  value={ficha.fichaincompleta || "No registrado"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tipo-accion-comercial" className="text-sm font-medium">
                  74. Tipo Acción Comercial
                </Label>
                <Input
                  id="tipo-accion-comercial"
                  value={ficha.tipoacccomercial || "No registrado"}
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
                  75. Frente principal de Lote (m)
                </Label>
                <Input
                  id="frente-lote"
                  value={ficha.medidalotefrente || "No registrado"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="distancia-caja-agua" className="text-sm font-medium">
                  76. Distancia eje de caja de agua (m)
                </Label>
                <Input
                  id="distancia-caja-agua"
                  value={ficha.medidaejeagua || "No registrado"}
                  readOnly={vistaSupervision}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="distancia-caja-desague" className="text-sm font-medium">
                  77. Distancia eje de caja de desagüe (m)
                </Label>
                <Input
                  id="distancia-caja-desague"
                  value={ficha.medidaejedesague || "No registrado"}
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
                  <TableCell className="text-center">{servicio.cantidad}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${servicio.estado === "REGULAR"
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