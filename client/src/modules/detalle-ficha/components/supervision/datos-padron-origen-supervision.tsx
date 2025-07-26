"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";

interface DatosPadronOrigenSupervisionProps {
    ficha: FichaCatastro;
    cliente: Cliente | null;
    vistaSupervision: boolean;
}

export default function DatosPadronOrigenSupervision({ ficha, cliente, vistaSupervision }: DatosPadronOrigenSupervisionProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
            {/* Padrón */}
            <div className="space-y-1">
                <Label htmlFor="padron" className="text-xs font-medium">Padrón</Label>
                <Input
                    id="padron"
                    defaultValue={cliente?.codcliente?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Sector */}
            <div className="space-y-1">
                <Label htmlFor="sector" className="text-xs font-medium">Sector</Label>
                <Input
                    id="sector"
                    defaultValue={cliente?.codsector || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Manzana */}
            <div className="space-y-1">
                <Label htmlFor="manzana" className="text-xs font-medium">Manzana</Label>
                <Input
                    id="manzana"
                    defaultValue={cliente?.codmza || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Lote */}
            <div className="space-y-1">
                <Label htmlFor="lote" className="text-xs font-medium">Lote</Label>
                <Input
                    id="lote"
                    defaultValue={cliente?.lote_new || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Sub Lote */}
            <div className="space-y-1">
                <Label htmlFor="sub-lote" className="text-xs font-medium">Sub Lote</Label>
                <Input
                    id="sub-lote"
                    defaultValue={cliente?.nrosublote || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Edificio */}
            <div className="space-y-1">
                <Label htmlFor="edificio" className="text-xs font-medium">Edificio</Label>
                <Input
                    id="edificio"
                    defaultValue={"No atributos"}
                    readOnly={vistaSupervision}
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* Piso */}
            <div className="space-y-1">
                <Label htmlFor="piso" className="text-xs font-medium">Piso</Label>
                <Input
                    id="piso"
                    defaultValue={cliente?.piso?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Unidad */}
            <div className="space-y-1">
                <Label htmlFor="unidad" className="text-xs font-medium">Unidad</Label>
                <Input
                    id="unidad"
                    defaultValue={cliente?.und?.toString() || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Código Catastral */}
            <div className="space-y-1">
                <Label htmlFor="codigo-catastral" className="text-xs font-medium">Código Catastral</Label>
                <Input
                    id="codigo-catastral"
                    defaultValue={cliente?.codcatastral || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Dirección */}
            <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="direccion" className="text-xs font-medium">Dirección</Label>
                <Input
                    id="direccion"
                    defaultValue={cliente?.direcc || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Distrito */}
            <div className="space-y-1">
                <Label htmlFor="distrito" className="text-xs font-medium">Distrito</Label>
                <Input
                    id="distrito"
                    defaultValue={cliente?.coddist || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Provincia */}
            <div className="space-y-1">
                <Label htmlFor="provincia" className="text-xs font-medium">Provincia</Label>
                <Input
                    id="provincia"
                    defaultValue={cliente?.codprov || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Departamento */}
            <div className="space-y-1">
                <Label htmlFor="departamento" className="text-xs font-medium">Departamento</Label>
                <Input
                    id="departamento"
                    defaultValue={cliente?.coddpto || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Coordenada X */}
            <div className="space-y-1">
                <Label htmlFor="coordenada-x" className="text-xs font-medium">Coordenada X</Label>
                <Input
                    id="coordenada-x"
                    defaultValue={"No atributos"}
                    readOnly={vistaSupervision}
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* Coordenada Y */}
            <div className="space-y-1">
                <Label htmlFor="coordenada-y" className="text-xs font-medium">Coordenada Y</Label>
                <Input
                    id="coordenada-y"
                    defaultValue={"No atributos"}
                    readOnly={vistaSupervision}
                    className="bg-muted h-8 text-xs"
                />
            </div>

            {/* Sucursal */}
            <div className="space-y-1">
                <Label htmlFor="sucursal" className="text-xs font-medium">Sucursal</Label>
                <Input
                    id="sucursal"
                    defaultValue={cliente?.codsuc || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Referencia */}
            <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="referencia" className="text-xs font-medium">Referencia</Label>
                <Input
                    id="referencia"
                    defaultValue={cliente?.referencia || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Urbanización */}
            <div className="space-y-1">
                <Label htmlFor="urbanizacion" className="text-xs font-medium">Urbanización</Label>
                <Input
                    id="urbanizacion"
                    defaultValue={cliente?.codurbaso || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Tipo Calle */}
            <div className="space-y-1">
                <Label htmlFor="tipo-calle" className="text-xs font-medium">Tipo Calle</Label>
                <Input
                    id="tipo-calle"
                    defaultValue={cliente?.caltip || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>

            {/* Tipo Urbanización */}
            <div className="space-y-1">
                <Label htmlFor="tipo-urbanizacion" className="text-xs font-medium">Tipo Urbanización</Label>
                <Input
                    id="tipo-urbanizacion"
                    defaultValue={cliente?.urbtip || "No registrado"}
                    readOnly={vistaSupervision}
                    className="h-8 text-xs"
                />
            </div>
        </div>
    );
} 