"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";
import { buscarExacto, getData } from "@/service/data.actions";
import {
    TipoActividad,
    TipoCategoria,
    TipoResponsable,
    TipoUsuario,
} from "@/models/tipos";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";

interface DatosUsuarioSupervisionProps {
    ficha: FichaCatastro;
    cliente: Cliente | null;
    vistaSupervision: boolean;
}

export default function DatosUsuarioSupervision({
    ficha,
    cliente,
    vistaSupervision,
}: DatosUsuarioSupervisionProps) {
    const [tipoUsuario, setTipoUsuario] = useState<ComboboxOption[]>([]);
    const [tipoResponsable, setTipoResponsable] = useState<ComboboxOption[]>([]);
    const [tipoCategoria, setTipoCategoria] = useState<ComboboxOption[]>([]);
    const [tipoActividad, setTipoActividad] = useState<ComboboxOption[]>([]);

    useEffect(() => {
        getData("tipousuario").then((res) => {
            setTipoUsuario(
                res.data.map((tipo: TipoUsuario) => ({
                    value: tipo.tipousuario,
                    label: tipo.descripcion,
                }))
            );
        });
        getData("tiporesponsable").then((res) => {
            setTipoResponsable(
                res.data.map((tipo: TipoResponsable) => ({
                    value: tipo.tiporesponsable,
                    label: tipo.descripcion,
                }))
            );
        });
        getData("tipocategoria").then((res) => {
            setTipoCategoria(
                res.data.map((tipo: TipoCategoria) => ({
                    value: tipo.tipocategoria,
                    label: tipo.descripcion,
                }))
            );
        });
        getData("tipoactividad").then((res) => {
            setTipoActividad(
                res.data.map((tipo: TipoActividad) => ({
                    value: tipo.actividad,
                    label: tipo.descripcion,
                }))
            );
        });
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* 20. Tipo de Usuario */}
            <div className="space-y-1">
                <Label htmlFor="tipo-usuario" className="text-xs font-medium">20. Tipo Usuario</Label>
                <ComboboxControlled
                    options={tipoUsuario}
                    value={cliente?.tipousuario || "No registrado"}
                    placeholder="No registrado"
                    className={`h-8 text-xs text-white
            ${!(cliente?.tipousuario == ficha.tipousuario) &&
                        "dark:bg-red-500 bg-red-500"}`}
                    disabled={vistaSupervision}
                />
            </div>

            {/* 21. Usuario/Nombres/Razón Social */}
            <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="nombres" className="text-xs font-medium">21. Usuario/Nombres/Razón Social</Label>
                <Input
                    id="nombres"
                    defaultValue={cliente?.propietario || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* 22. DNI/RUC */}
            <div className="space-y-1">
                <Label htmlFor="dni" className="text-xs font-medium">22. DNI/RUC</Label>
                <Input
                    id="dni"
                    defaultValue={cliente?.dni || cliente?.ruc || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* 23. Nº habitantes */}
            <div className="space-y-1">
                <Label htmlFor="habitantes" className="text-xs font-medium">23. Nº Habitantes</Label>
                <Input
                    id="habitantes"
                    defaultValue={"No atributos"}
                    readOnly={vistaSupervision}
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 24. Responsable */}
            <div className="space-y-1">
                <Label htmlFor="responsable" className="text-xs font-medium">24. Responsable</Label>
                <ComboboxControlled
                    options={tipoResponsable}
                    value={cliente?.tiporesponsable || "No registrado"}
                    placeholder="No registrado"
                    className="h-8 text-xs"
                    disabled={vistaSupervision}
                />
            </div>

            {/* 25. Teléfono */}
            <div className="space-y-1">
                <Label htmlFor="telefono" className="text-xs font-medium">25. Teléfono</Label>
                <Input
                    id="telefono"
                    defaultValue={cliente?.telefono || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* 26. Nº Contrato */}
            <div className="space-y-1">
                <Label htmlFor="contrato" className="text-xs font-medium">26. Nº Contrato</Label>
                <Input
                    id="contrato"
                    defaultValue={cliente?.nrocontrato?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* 27. Reservorio Conectado */}
            <div className="space-y-1">
                <Label htmlFor="reservorio" className="text-xs font-medium">27. Reservorio Conectado</Label>
                <Input
                    id="reservorio"
                    defaultValue={cliente?.tiporeser || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* 28. Sector Abastecimiento */}
            <div className="space-y-1">
                <Label htmlFor="sector" className="text-xs font-medium">28. Sector Abastecimiento</Label>
                <Input
                    id="sector"
                    defaultValue={"No atributos"}
                    readOnly={vistaSupervision}
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 29. Categoría */}
            <div className="space-y-1">
                <Label htmlFor="categoria" className="text-xs font-medium">29. Categoría</Label>
                <ComboboxControlled
                    options={tipoCategoria}
                    value={cliente?.catetar || "No registrado"}
                    placeholder="No registrado"
                    className={`h-8 text-xs text-white
            ${!(cliente?.catetar == ficha.catetar_new) &&
                        "dark:bg-red-500 bg-red-500"}`}
                    disabled={vistaSupervision}
                />
            </div>

            {/* 30. Razón Social */}
            <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="razon-social" className="text-xs font-medium">30. Razón Social</Label>
                <Input
                    id="razon-social"
                    defaultValue={cliente?.nombrecomercial || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Actividad */}
            <div className="space-y-1">
                <Label htmlFor="actividad" className="text-xs font-medium">Actividad</Label>
                <ComboboxControlled
                    options={tipoActividad}
                    value={cliente?.actividad || "No registrado"}
                    placeholder="No registrado"
                    className="h-8 text-xs"
                    disabled={vistaSupervision}
                />
            </div>

            {/* Email */}
            <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                <Input
                    id="email"
                    defaultValue={cliente?.email || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Estado Registro */}
            <div className="space-y-1">
                <Label htmlFor="estado-registro" className="text-xs font-medium">Estado Registro</Label>
                <Input
                    id="estado-registro"
                    defaultValue={cliente?.estadoregistro?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Estado Servicio */}
            <div className="space-y-1">
                <Label htmlFor="estado-servicio" className="text-xs font-medium">Estado Servicio</Label>
                <Input
                    id="estado-servicio"
                    defaultValue={cliente?.estadoservicio || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Unidades de Uso */}
            <div className="space-y-1">
                <Label htmlFor="unidad-dom" className="text-xs font-medium">Unidad Doméstica</Label>
                <Input
                    id="unidad-dom"
                    defaultValue={cliente?.unidaddom?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="unidad-com" className="text-xs font-medium">Unidad Comercial</Label>
                <Input
                    id="unidad-com"
                    defaultValue={cliente?.unidadcom?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="unidad-ind" className="text-xs font-medium">Unidad Industrial</Label>
                <Input
                    id="unidad-ind"
                    defaultValue={cliente?.unidadind?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="unidad-soc" className="text-xs font-medium">Unidad Social</Label>
                <Input
                    id="unidad-soc"
                    defaultValue={cliente?.unidadsoc?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="unidad-est" className="text-xs font-medium">Unidad Estatal</Label>
                <Input
                    id="unidad-est"
                    defaultValue={cliente?.unidadest?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>
        </div>
    );
} 