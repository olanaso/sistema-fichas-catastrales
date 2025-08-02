"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import {
    TipoDiametro,
    TipoEstadoServicio,
    TipoPavimento,
    TipoVereda,
    TipoMaterial,
    TipoIngresoConexion,
    TipoCaja,
    TipoLocalizacionCaja,
    TipoEstadoCaja,
    TipoTapa,
    TipoEstadoTapa,
    TipoLlaveMedidor,
    TipoPosicionMedidor,
    TipoCorteServicio,
    TipoFugas,
    TipoCajaObservacion
} from "@/models/tipos";
import { buscarExacto, getData } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";

interface DatosConexionAguaSupervisionProps {
    ficha: FichaCatastro;
    cliente: Cliente | null;
}

export default function DatosConexionAguaSupervision({ ficha, cliente }: DatosConexionAguaSupervisionProps) {

    const [estadoServicio, setEstadoServicio] = useState<ComboboxOption[]>([]);
    const [pavimentacion, setPavimentacion] = useState<ComboboxOption[]>([]);
    const [vereda, setVereda] = useState<ComboboxOption[]>([]);
    const [diametros, setDiametros] = useState<ComboboxOption[]>([]);
    const [tipoMaterial, setTipoMaterial] = useState<ComboboxOption[]>([]);
    const [tipoIngreso, setTipoIngreso] = useState<ComboboxOption[]>([]);
    const [tipoCaja, setTipoCaja] = useState<ComboboxOption[]>([]);
    const [localizacionCaja, setLocalizacionCaja] = useState<ComboboxOption[]>([]);
    const [estadoCaja, setEstadoCaja] = useState<ComboboxOption[]>([]);
    const [tipoTapa, setTipoTapa] = useState<ComboboxOption[]>([]);
    const [estadoTapa, setEstadoTapa] = useState<ComboboxOption[]>([]);
    const [llaves, setLlaves] = useState<ComboboxOption[]>([]);
    const [posicionMedidor, setPosicionMedidor] = useState<ComboboxOption[]>([]);
    const [tipoCorte, setTipoCorte] = useState<ComboboxOption[]>([]);
    const [fugas, setFugas] = useState<ComboboxOption[]>([]);
    const [cajaObservacion, setCajaObservacion] = useState<ComboboxOption[]>([]);

    useEffect(() => {
        getData("tipoestservicio").then((res) => {
            setEstadoServicio(res.data.map((tipo: TipoEstadoServicio) => ({ value: tipo.estadoservicio, label: tipo.descripcion })));
        });
        buscarExacto("tipopavimento", ["tipocon"], ["001"]).then((res) => {
            setPavimentacion(res.data.map((tipo: TipoPavimento) => ({ value: tipo.pavconagu, label: tipo.descripcion })));
        });
        buscarExacto("tipovereda", ["tipocon"], ["001"]).then((res) => {
            setVereda(res.data.map((tipo: TipoVereda) => ({ value: tipo.vereda, label: tipo.descripcion })));
        });
        buscarExacto("diametros", ["tipocon"], ["001"]).then((res) => {
            setDiametros(res.data.map((tipo: TipoDiametro) => ({ value: tipo.coddiametro, label: tipo.descripcion })));
        });
        buscarExacto("tipomaterial", ["tipocon"], ["001"]).then((res) => {
            setTipoMaterial(res.data.map((tipo: TipoMaterial) => ({ value: tipo.tipomaterial, label: tipo.descripcion })));
        });
        buscarExacto("tipoingresoconex", ["tipocon"], ["001"]).then((res) => {
            setTipoIngreso(res.data.map((tipo: TipoIngresoConexion) => ({ value: tipo.tipoingreso, label: tipo.descripcion })));
        });
        buscarExacto("tipocaja", ["tipocon"], ["001"]).then((res) => {
            setTipoCaja(res.data.map((tipo: TipoCaja) => ({ value: tipo.tipocaja, label: tipo.descripcion })));
        });
        buscarExacto("tipolocalizacaja", ["tipocon"], ["001"]).then((res) => {
            setLocalizacionCaja(res.data.map((tipo: TipoLocalizacionCaja) => ({ value: tipo.loccaja, label: tipo.descripcion })));
        });
        buscarExacto("tipoestcaja", ["tipocon"], ["001"]).then((res) => {
            setEstadoCaja(res.data.map((tipo: TipoEstadoCaja) => ({ value: tipo.estadocaja, label: tipo.descripcion })));
        });
        buscarExacto("tipotapa", ["tipocon"], ["001"]).then((res) => {
            setTipoTapa(res.data.map((tipo: TipoTapa) => ({ value: tipo.tipotapa, label: tipo.descripcion })));
        });
        buscarExacto("tipoesttapa", ["tipocon"], ["001"]).then((res) => {
            setEstadoTapa(res.data.map((tipo: TipoEstadoTapa) => ({ value: tipo.esttapa, label: tipo.descripcion })));
        });
        getData("tipollavemedidor").then((res) => {
            setLlaves(res.data.map((tipo: TipoLlaveMedidor) => ({ value: tipo.llavemed, label: tipo.descripcion })));
        });
        getData("tipoposmedidor").then((res) => {
            setPosicionMedidor(res.data.map((tipo: TipoPosicionMedidor) => ({ value: tipo.posicionmed, label: tipo.descripcion })));
        });
        buscarExacto("tipocorteservicio", ["tipocon"], ["001"]).then((res) => {
            setTipoCorte(res.data.map((tipo: TipoCorteServicio) => ({ value: tipo.tipocorte, label: tipo.descripcion })));
        });
        buscarExacto("tipofugas", ["tipocon"], ["001"]).then((res) => {
            setFugas(res.data.map((tipo: TipoFugas) => ({ value: tipo.tipofugas, label: tipo.descripcion })));
        });
        buscarExacto("tipocajaobserv", ["tipocon"], ["001"]).then((res) => {
            setCajaObservacion(res.data.map((tipo: TipoCajaObservacion) => ({ value: tipo.tipocajaobserv, label: tipo.descripcion })));
        });
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {/* 33. Estado del Servicio */}
            <div className="space-y-1">
                <Label htmlFor="estado-servicio" className="text-xs font-medium">33. Estado del Servicio</Label>
                <ComboboxControlled
                    options={estadoServicio}
                    value={cliente?.estadoservicio_a || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className={`h-8 text-xs text-white
            ${!(cliente?.estadoservicio_a == ficha.estadoservicio) ?
                            "dark:bg-red-500 bg-red-500" :
                            "dark:bg-green-500 bg-green-500"}`}
                />
            </div>

            {/* 34. Pavimentación */}
            <div className="space-y-1">
                <Label htmlFor="pavimentacion" className="text-xs font-medium">34. Pavimentación</Label>
                <ComboboxControlled
                    options={pavimentacion}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 35. Vereda */}
            <div className="space-y-1">
                <Label htmlFor="vereda" className="text-xs font-medium">35. Vereda</Label>
                <ComboboxControlled
                    options={vereda}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 36. Diámetro */}
            <div className="space-y-1">
                <Label htmlFor="diametro" className="text-xs font-medium">36. Diámetro</Label>
                <ComboboxControlled
                    options={diametros}
                    value={cliente?.diametro_a || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 37. Tipo Material */}
            <div className="space-y-1">
                <Label htmlFor="tipo-material" className="text-xs font-medium">37. Tipo Material</Label>
                <ComboboxControlled
                    options={tipoMaterial}
                    value={cliente?.tipomterial || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 38. Tipo de Ingreso */}
            <div className="space-y-1">
                <Label htmlFor="tipo-ingreso" className="text-xs font-medium">38. Tipo de Ingreso</Label>
                <ComboboxControlled
                    options={tipoIngreso}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 39. Material de Caja */}
            <div className="space-y-1">
                <Label htmlFor="material-caja" className="text-xs font-medium">39. Material de Caja</Label>
                <ComboboxControlled
                    options={tipoCaja}
                    value={cliente?.materialc || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 40. Localización Caja */}
            <div className="space-y-1">
                <Label htmlFor="localizacion-caja" className="text-xs font-medium">40. Localización Caja</Label>
                <ComboboxControlled
                    options={localizacionCaja}
                    value={cliente?.loccaja_a || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className="h-8 text-xs"
                />
            </div>

            {/* 41. Estado Caja */}
            <div className="space-y-1">
                <Label htmlFor="estado-caja" className="text-xs font-medium">41. Estado Caja</Label>
                <ComboboxControlled
                    options={estadoCaja}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 42. Material de Tapa */}
            <div className="space-y-1">
                <Label htmlFor="material-tapa" className="text-xs font-medium">42. Material de Tapa</Label>
                <ComboboxControlled
                    options={tipoTapa}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 43. Estado de la Tapa */}
            <div className="space-y-1">
                <Label htmlFor="estado-tapa" className="text-xs font-medium">43. Estado de la Tapa</Label>
                <ComboboxControlled
                    options={estadoTapa}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 44. Llaves */}
            <div className="space-y-1">
                <Label htmlFor="llaves" className="text-xs font-medium">44. Llaves</Label>
                <ComboboxControlled
                    options={llaves}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 45. Posición medidor */}
            <div className="space-y-1">
                <Label htmlFor="posicion-medidor" className="text-xs font-medium">45. Posición medidor</Label>
                <ComboboxControlled
                    options={posicionMedidor}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 46. Tipo de Corte */}
            <div className="space-y-1">
                <Label htmlFor="tipo-corte" className="text-xs font-medium">46. Tipo de Corte</Label>
                <ComboboxControlled
                    options={tipoCorte}
                    value={cliente?.codmotivocorte || "No registrado"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 47. Razón del corte */}
            <div className="space-y-1">
                <Label htmlFor="razon-corte" className="text-xs font-medium">47. Razón del corte</Label>
                <Input
                    id="razon-corte"
                    defaultValue={"No atributos"}
                    readOnly
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 48. Fugas */}
            <div className="space-y-1">
                <Label htmlFor="fugas" className="text-xs font-medium">48. Fugas</Label>
                <ComboboxControlled
                    options={fugas}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* 49. Caja observación */}
            <div className="space-y-1">
                <Label htmlFor="caja-observacion" className="text-xs font-medium">49. Caja observación</Label>
                <ComboboxControlled
                    options={cajaObservacion}
                    value={"No atributos"}
                    placeholder="No registrado"
                    disabled
                    className="bg-muted h-8 text-xs"
                />
            </div>
        </div>
    );
} 