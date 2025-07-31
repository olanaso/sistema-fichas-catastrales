"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import { TipoDiametro, TipoEstadoMedidor, TipoFacturacion, TipoLectura, TipoMarcaMedidor } from "@/models/tipos";
import { buscarExacto, getData } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";

interface DatosMedidorSupervisionProps {
    ficha: FichaCatastro;
    cliente: Cliente | null;
}

export default function DatosMedidorSupervision({ ficha, cliente }: DatosMedidorSupervisionProps) {

    const [diametros, setDiametros] = useState<ComboboxOption[]>([]);
    const [marcas, setMarcas] = useState<ComboboxOption[]>([]);
    const [tipoFacturacion, setTipoFacturacion] = useState<ComboboxOption[]>([]);
    const [tipoLectura, setTipoLectura] = useState<ComboboxOption[]>([]);
    const [estadoMedidor, setEstadoMedidor] = useState<ComboboxOption[]>([]);

    const opcionesSiNo: ComboboxOption[] = [
        { value: "1", label: "SÍ" },
        { value: "0", label: "NO" }
    ];

    useEffect(() => {
        buscarExacto("diametros", ["tipocon"], ["001"]).then((res) => {
            setDiametros(res.data.map((diametro: TipoDiametro) => ({ value: diametro.coddiametro, label: diametro.descripcion })));
        });
        getData("tipomarcamedidor").then((res) => {
            setMarcas(res.data.map((marca: TipoMarcaMedidor) => ({ value: marca.marcamed, label: marca.descripcion })));
        });
        getData("tipofacturacion").then((res) => {
            setTipoFacturacion(res.data.map((tipo: TipoFacturacion) => ({ value: tipo.tipofacturacion, label: tipo.descripcion })));
        });
        getData("tipolectura").then((res) => {
            setTipoLectura(res.data.map((tipo: TipoLectura) => ({ value: tipo.tipolectura, label: tipo.descripcion })));
        });
        getData("tipoestmedidor").then((res) => {
            setEstadoMedidor(res.data.map((estado: TipoEstadoMedidor) => ({ value: estado.estadomed, label: estado.descripcion })));
        });
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {/* 50. Número Medidor */}
            <div className="space-y-1">
                <Label htmlFor="numero-medidor" className="text-xs font-medium">50. Número Medidor</Label>
                <Input
                    id="numero-medidor"
                    defaultValue={cliente?.nro_medidor?.toString() || "No registrado"}
                    readOnly
                    disabled
                    className={`h-8 text-xs text-white
            ${!(cliente?.nro_medidor == ficha.nromed) ?
                            "dark:bg-red-500 bg-red-500" :
                            "dark:bg-green-500 bg-green-500"
                        }`}
                />
            </div>

            {/* 51. Año */}
            <div className="space-y-1">
                <Label htmlFor="ano" className="text-xs font-medium">51. Año</Label>
                <Input
                    id="ano"
                    defaultValue={"No atributos"}
                    readOnly
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 52. Lectura Medidor */}
            <div className="space-y-1">
                <Label htmlFor="lectura-medidor" className="text-xs font-medium">52. Lectura Medidor</Label>
                <Input
                    id="lectura-medidor"
                    defaultValue={"No atributos"}
                    readOnly
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* Número medidor Sistema */}
            <div className="space-y-1">
                <Label htmlFor="numero-medidor-sistema" className="text-xs font-medium text-red-600">Número medidor Sistema</Label>
                <Input
                    id="numero-medidor-sistema"
                    defaultValue={cliente?.nro_medidor || "No registrado"}
                    readOnly
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 53. Fecha de Instalación */}
            <div className="space-y-1">
                <Label htmlFor="fecha-instalacion" className="text-xs font-medium">53. Fecha de Instalación</Label>
                <Input
                    id="fecha-instalacion"
                    defaultValue={cliente?.fecha_inst || "No registrado"}
                    readOnly
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 54. Marca */}
            <div className="space-y-1">
                <Label htmlFor="marca" className="text-xs font-medium">54. Marca</Label>
                <ComboboxControlled
                    options={marcas}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 55. Diámetro del Medidor */}
            <div className="space-y-1">
                <Label htmlFor="diametro-medidor" className="text-xs font-medium">55. Diámetro del Medidor</Label>
                <ComboboxControlled
                    options={diametros}
                    value={cliente?.diametro_m || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 56. Lectura */}
            <div className="space-y-1">
                <Label htmlFor="lectura" className="text-xs font-medium">56. Lectura</Label>
                <Input
                    id="lectura"
                    defaultValue={"No atributos"}
                    readOnly
                    disabled
                    className={`bg-muted h-8 text-xs text-white
            ${!(ficha.lectura == "No atributos") ?
                            "dark:bg-red-500 bg-red-500" :
                            "dark:bg-green-500 bg-green-500"}`}
                />
            </div>

            {/* 57. Tipo Facturación */}
            <div className="space-y-1">
                <Label htmlFor="tipo-facturacion" className="text-xs font-medium">57. Tipo Facturación</Label>
                <ComboboxControlled
                    options={tipoFacturacion}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className={`bg-muted h-8 text-xs text-white
            ${!(ficha.tipofacturacion == "No atributos") ?
                            "dark:bg-red-500 bg-red-500" :
                            "dark:bg-green-500 bg-green-500"}`}
                />
            </div>

            {/* 58. Tipo de Lectura */}
            <div className="space-y-1">
                <Label htmlFor="tipo-lectura" className="text-xs font-medium">58. Tipo de Lectura</Label>
                <ComboboxControlled
                    options={tipoLectura}
                    value={"No atributos"}
                    placeholder="Seleccionar tipo"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 59. Estado del Medidor */}
            <div className="space-y-1">
                <Label htmlFor="estado-medidor" className="text-xs font-medium">59. Estado del Medidor</Label>
                <ComboboxControlled
                    options={estadoMedidor}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className={`bg-muted h-8 text-xs text-white
            ${!(ficha.estadomed == "No atributos") ?
                            "dark:bg-red-500 bg-red-500" :
                            "dark:bg-green-500 bg-green-500"}`}
                />
            </div>

            {/* 60. Operativo */}
            <div className="space-y-1">
                <Label htmlFor="operativo" className="text-xs font-medium">60. Operativo</Label>
                <ComboboxControlled
                    options={opcionesSiNo}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* Tiene Medidor */}
            <div className="space-y-1">
                <Label htmlFor="tiene-medidor" className="text-xs font-medium">Tiene Medidor</Label>
                <ComboboxControlled
                    options={opcionesSiNo}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>
        </div>
    );
} 