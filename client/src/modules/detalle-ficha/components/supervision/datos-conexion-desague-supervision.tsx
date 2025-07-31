"use client";

import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import { TipoCaja, TipoDiametro, TipoEstadoCaja, TipoEstadoServicio, TipoEstadoTapa, TipoFugas, TipoLocalizacionCaja, TipoMaterial, TipoTapa } from "@/models/tipos";
import { buscarExacto, getData } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";

interface DatosConexionDesagueSupervisionProps {
    ficha: FichaCatastro;
    cliente: Cliente | null;
}

export default function DatosConexionDesagueSupervision({ ficha, cliente }: DatosConexionDesagueSupervisionProps) {

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
            {/* 61. Estado de Conexión desagüe */}
            <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="estado-conexion-desague" className="text-xs font-medium">61. Estado de Conexión desagüe</Label>
                <ComboboxControlled
                    options={tipoEstadoServicio}
                    value={cliente?.estadoservicio_d || "No registrado"}
                    placeholder="No registrado"
                    className={`h-8 text-xs text-white
            ${!(cliente?.estadoservicio_d == ficha.situacionconex_d) ?
                            "dark:bg-red-500 bg-red-500" :
                            "dark:bg-green-500 bg-green-500"}`}
                    disabled
                />
            </div>

            {/* 62. Diámetro */}
            <div className="space-y-1">
                <Label htmlFor="diametro-desague" className="text-xs font-medium">62. Diámetro</Label>
                <ComboboxControlled
                    options={tipoDiametro}
                    value={cliente?.diametro_d || "No registrado"}
                    placeholder="No registrado"
                    className="h-8 text-xs"
                    disabled
                />
            </div>

            {/* 63. Tipo Material */}
            <div className="space-y-1">
                <Label htmlFor="tipo-material-desague" className="text-xs font-medium">63. Tipo Material</Label>
                <ComboboxControlled
                    options={tipoMaterial}
                    value={cliente?.tipomterial_d || "No registrado"}
                    placeholder="No registrado"
                    className="h-8 text-xs"
                    disabled
                />
            </div>

            {/* 64. Caja */}
            <div className="space-y-1">
                <Label htmlFor="caja-desague" className="text-xs font-medium">64. Caja</Label>
                <ComboboxControlled
                    options={tipoCaja}
                    value={cliente?.caja_d || "No registrado"}
                    placeholder="No registrado"
                    className="h-8 text-xs"
                    disabled
                />
            </div>

            {/* 65. Localización caja */}
            <div className="space-y-1">
                <Label htmlFor="localizacion-caja-desague" className="text-xs font-medium">65. Localización caja</Label>
                <ComboboxControlled
                    options={tipoLocalizacionCaja}
                    value={"No atributos"}
                    placeholder="No registrado"
                    className="bg-muted h-8 text-xs"
                    disabled
                />
            </div>

            {/* 66. Estado Caja */}
            <div className="space-y-1">
                <Label htmlFor="estado-caja-desague" className="text-xs font-medium">66. Estado Caja</Label>
                <ComboboxControlled
                    options={tipoEstadoCaja}
                    value={"No atributos"}
                    placeholder="No registrado"
                    className="bg-muted h-8 text-xs"
                    disabled
                />
            </div>

            {/* 67. Tapa */}
            <div className="space-y-1">
                <Label htmlFor="tapa-desague" className="text-xs font-medium">67. Tapa</Label>
                <ComboboxControlled
                    options={tipoTapa}
                    value={"No atributos"}
                    placeholder="No registrado"
                    className="bg-muted h-8 text-xs"
                    disabled
                />
            </div>

            {/* 68. Estado de la Tapa */}
            <div className="space-y-1">
                <Label htmlFor="estado-tapa-desague" className="text-xs font-medium">68. Estado de la Tapa</Label>
                <ComboboxControlled
                    options={tipoEstadoTapa}
                    value={"No atributos"}
                    placeholder="No registrado"
                    className="bg-muted h-8 text-xs"
                    disabled
                />
            </div>

            {/* 69. Fugas */}
            <div className="space-y-1">
                <Label htmlFor="fugas-desague" className="text-xs font-medium">69. Fugas</Label>
                <ComboboxControlled
                    options={tipoFugas}
                    value={"No atributos"}
                    placeholder="No registrado"
                    className="bg-muted h-8 text-xs"
                    disabled
                />
            </div>
        </div>
    );
} 