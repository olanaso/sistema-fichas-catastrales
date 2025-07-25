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
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";
import { getData } from "@/service/data.actions";
import { TipoActividad, TipoCategoria, TipoResponsable, TipoUsuario } from "@/models/tipos";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";

interface DatosUsuarioProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosUsuario({ ficha, vistaSupervision }: DatosUsuarioProps) {

  const [tipoUsuario, setTipoUsuario] = useState<ComboboxOption[]>([]);
  const [tipoResponsable, setTipoResponsable] = useState<ComboboxOption[]>([]);
  const [tipoCategoria, setTipoCategoria] = useState<ComboboxOption[]>([]);
  const [tipoActividad, setTipoActividad] = useState<ComboboxOption[]>([]);
  const [sectorAbastecimiento, setSectorAbastecimiento] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    getData("tipousuario").then((res) => {
      setTipoUsuario(res.data.map((tipo: TipoUsuario) => ({ value: tipo.tipousuario, label: tipo.descripcion })));
    });
    getData("tiporesponsable").then((res) => {
      setTipoResponsable(res.data.map((tipo: TipoResponsable) => ({ value: tipo.tiporesponsable, label: tipo.descripcion })));
    });
    getData("tipocategoria").then((res) => {
      setTipoCategoria(res.data.map((tipo: TipoCategoria) => ({ value: tipo.tipocategoria, label: tipo.descripcion })));
    });
    getData("tipoactividad").then((res) => {
      setTipoActividad(res.data.map((tipo: TipoActividad) => ({ value: tipo.actividad, label: tipo.descripcion })));
    });
    // getData("sectorabastecimiento").then((res) => {
    //   setSectorAbastecimiento(res.data.map((tipo: ) => ({ value: tipo.sectorabastecimiento, label: tipo.descripcion })));
    // });
  }, []);

  return (
    <div className="space-y-4">
      {/* Información del usuario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {/* 20. Tipo de Usuario */}
        <div className="space-y-1">
          <Label htmlFor="tipo-usuario" className="text-xs font-medium">20. Tipo Usuario</Label>
          <ComboboxControlled
            options={tipoUsuario}
            value={ficha.tipousuario || "ACTIVO"}
            placeholder="Seleccionar..."
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        {/* 21. Usuario/Nombres/Razón Social */}
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="nombres" className="text-xs font-medium">21. Usuario/Nombres/Razón Social</Label>
          <Input
            id="nombres"
            value={ficha.propietario || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>

        {/* 22. DNI/RUC */}
        <div className="space-y-1">
          <Label htmlFor="dni" className="text-xs font-medium">22. DNI/RUC</Label>
          <Input
            id="dni"
            value={ficha.dni || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>

        {/* 23. Nº habitantes */}
        <div className="space-y-1">
          <Label htmlFor="habitantes" className="text-xs font-medium">23. Nº Habitantes</Label>
          <Input
            id="habitantes"
            value={ficha.habitantes || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>

        {/* 24. Responsable */}
        <div className="space-y-1">
          <Label htmlFor="responsable" className="text-xs font-medium">24. Responsable</Label>
          <ComboboxControlled
            options={tipoResponsable}
            value={ficha.tiporesponsable || "PROPIETARIO"}
            placeholder="Seleccionar..."
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        {/* 25. Teléfono */}
        <div className="space-y-1">
          <Label htmlFor="telefono" className="text-xs font-medium">25. Teléfono</Label>
          <Input
            id="telefono"
            value={ficha.celular || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>

        {/* 26. Nº Contrato */}
        <div className="space-y-1">
          <Label htmlFor="contrato" className="text-xs font-medium">26. Nº Contrato</Label>
          <Input
            id="contrato"
            value={ficha.nrocontrato || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>

        {/* 27. Reservorio Conectado */}
        <div className="space-y-1">
          <Label htmlFor="reservorio" className="text-xs font-medium">27. Reservorio Conectado</Label>
          <Input
            id="reservorio"
            value={ficha.codreservorio?.toString() || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>

        {/* 28. Sector Abastecimiento */}
        <div className="space-y-1">
          <Label htmlFor="sector" className="text-xs font-medium">28. Sector Abastecimiento</Label>
          <ComboboxControlled
            options={tipoResponsable}
            value={ficha.codsectorabast || "No registrado"}
            placeholder="Seleccionar..."
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        {/* 29. Categoría */}
        <div className="space-y-1">
          <Label htmlFor="categoria" className="text-xs font-medium">29. Categoría</Label>
          <ComboboxControlled
            options={tipoCategoria}
            value={ficha.catetar_new || "No registrado"}
            placeholder="Seleccionar..."
            className="h-8 text-xs"
            disabled={vistaSupervision}
          />
        </div>

        {/* 30. Razón Social */}
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="razon-social" className="text-xs font-medium">30. Razón Social</Label>
          <Input
            id="razon-social"
            value={ficha.razonsocial || "No registrado"}
            readOnly={vistaSupervision}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {/* Información del sistema */}
      <Card className="bg-red-50 border-red-200 dark:bg-gray-900 dark:border-gray-800">
        <CardContent className="p-3">
          <div className="space-y-1 flex items-center justify-between text-red-700 dark:text-gray-300">
            <p className="text-xs">
              <span className="font-semibold">Categoria Sistema:</span> {ficha.catetar || "DOMESTICO I"}
            </p>
            <p className="text-xs">
              <span className="font-semibold">Actividad Sistema:</span> {ficha.actividad || "VIVIENDA"}
            </p>
            <p className="text-xs">
              <span className="font-semibold">Unidades de Uso Sistema:</span> {"No atributos"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sección de tarifas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">ASIGNAR TARIFAS</h3>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="text-sm font-medium">DETALLE DE TARIFAS</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* 31. Categoría */}
            <div className="space-y-1">
              <Label htmlFor="categoria-tarifa" className="text-xs font-medium">31. Categoría {ficha.catetar}</Label>
              <ComboboxControlled
                options={tipoCategoria}
                value={ficha.catetar}
                placeholder="Seleccionar..."
                className="h-8 text-xs"
                disabled={vistaSupervision}
              />
            </div>

            {/* 32. Tipo Actividad */}
            <div className="space-y-1">
              <Label htmlFor="tipo-actividad" className="text-xs font-medium">32. Tipo Actividad</Label>
              <ComboboxControlled
                options={tipoActividad}
                value={ficha.actividad || "VIVIENDA"}
                placeholder="Seleccionar..."
                className="h-8 text-xs"
                disabled={vistaSupervision}
              />
            </div>

            {/* Razón Social */}
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="razon-social-tarifa" className="text-xs font-medium">Razón Social</Label>
              <Input
                id="razon-social-tarifa"
                value={ficha.razonsocial || "No registrado"}
                readOnly={vistaSupervision}
                className="h-8 text-xs"
              />
            </div>

            {/* Referencia */}
            <div className="space-y-1">
              <Label htmlFor="referencia" className="text-xs font-medium">Referencia</Label>
              <Input
                id="referencia"
                value=""
                readOnly={vistaSupervision}
                className="h-8 text-xs"
              />
            </div>

            {/* Botón eliminar */}
            <div className="flex items-end">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Minus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 