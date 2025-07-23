"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Settings, 
  Plus, 
  Minus,
  Building2
} from "lucide-react";
import { FichaCatastro } from "@/models/fichacatastro";

interface DatosUsuarioProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosUsuario({ ficha, vistaSupervision }: DatosUsuarioProps) {
  return (
    <div className="space-y-6">
      {/* Información del usuario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Columna 1 */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="tipo-usuario" className="text-sm font-medium">
              20. Tipo de Usuario
            </Label>
            <Input
              id="tipo-usuario"
              value={ficha.tipousuario || "ACTIVO"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="nombres" className="text-sm font-medium">
              21. Usuario/Nombres/Razón Social
            </Label>
            <Input
              id="nombres"
              value={ficha.propietario || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dni" className="text-sm font-medium">
              22. DNI/RUC
            </Label>
            <Input
              id="dni"
              value={ficha.dni || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="habitantes" className="text-sm font-medium">
              23. Nº habitantes
            </Label>
            <Input
              id="habitantes"
              value={ficha.habitantes || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="responsable" className="text-sm font-medium">
              24. Responsable
            </Label>
            <Input
              id="responsable"
              value={ficha.tiporesponsable || "PROPIETARIO"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>
        </div>

        {/* Columna 2 */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="telefono" className="text-sm font-medium">
              25. Teléfono
            </Label>
            <Input
              id="telefono"
              value={ficha.celular || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contrato" className="text-sm font-medium">
              26. Nº Contrato
            </Label>
            <Input
              id="contrato"
              value={ficha.nrocontrato || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="reservorio" className="text-sm font-medium">
              27. Reservorio Conectado
            </Label>
            <Input
              id="reservorio"
              value={ficha.codreservorio?.toString() || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="sector" className="text-sm font-medium">
              28. Sector Abastecimiento
            </Label>
            <Input
              id="sector"
              value={ficha.codsectorabast || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="categoria" className="text-sm font-medium">
              29. Categoría
            </Label>
            <Input
              id="categoria"
              value={ficha.catetar || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>
        </div>

        {/* Columna 3 */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="razon-social" className="text-sm font-medium">
              30. Razón Social
            </Label>
            <Input
              id="razon-social"
              value={ficha.razonsocial || "No registrado"}
              readOnly={vistaSupervision}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Información del sistema */}
      <Card className="bg-red-50 border-red-200 dark:bg-gray-900 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="space-y-2 text-red-700 dark:text-gray-300">
            <p className="text-sm">
              <span className="font-semibold">Categoria Sistema:</span> {ficha.catetar || "DOMESTICO I"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Actividad Sistema:</span> {ficha.actividad || "VIVIENDA"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Unidades de Uso Sistema:</span> {"No atributos"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sección de tarifas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">ASIGNAR TARIFAS</h3>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-md font-medium">DETALLE DE TARIFAS</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="categoria-tarifa" className="text-sm font-medium">
                31. Categoría
              </Label>
              <Input
                id="categoria-tarifa"
                value={ficha.catetar || "DOMESTICO I"}
                readOnly={vistaSupervision}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tipo-actividad" className="text-sm font-medium">
                32. Tipo Actividad
              </Label>
              <Input
                id="tipo-actividad"
                value={ficha.actividad || "VIVIENDA"}
                readOnly={vistaSupervision}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="razon-social-tarifa" className="text-sm font-medium">
                Razón Social
              </Label>
              <Input
                id="razon-social-tarifa"
                value={ficha.razonsocial || "No registrado"}
                readOnly={vistaSupervision}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referencia" className="text-sm font-medium">
                Referencia
              </Label>
              <Input
                id="referencia"
                value=""
                readOnly={vistaSupervision}
                className="mt-1"
              />
            </div>

            <div className="flex items-end">
              <Button size="sm" variant="outline" className="w-10 h-10">
                <Minus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 