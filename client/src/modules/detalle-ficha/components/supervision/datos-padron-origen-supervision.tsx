"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";

interface DatosPadronOrigenSupervisionProps {
    ficha: FichaCatastro;
    cliente: Cliente | null;
}

export default function DatosPadronOrigenSupervision({ ficha, cliente }: DatosPadronOrigenSupervisionProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fila 1 */}
                <div>
                    <Label htmlFor="padron" className="text-sm font-medium">
                        Padrón
                    </Label>
                    <Input
                        id="padron"
                        defaultValue={"No atributos"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="sector" className="text-sm font-medium">
                        Sector
                    </Label>
                    <Input
                        id="sector"
                        defaultValue={cliente?.codsector || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="manzana" className="text-sm font-medium">
                        Manzana
                    </Label>
                    <Input
                        id="manzana"
                        defaultValue={cliente?.codmza || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                {/* Fila 2 */}
                <div>
                    <Label htmlFor="lote" className="text-sm font-medium">
                        Lote
                    </Label>
                    <Input
                        id="lote"
                        defaultValue={cliente?.lote_new || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="sub-lote" className="text-sm font-medium">
                        Sub Lote
                    </Label>
                    <Input
                        id="sub-lote"
                        defaultValue={cliente?.nrosublote || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="edificio" className="text-sm font-medium">
                        Edificio
                    </Label>
                    <Input
                        id="edificio"
                        defaultValue={"No atributos"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                {/* Fila 3 */}
                <div>
                    <Label htmlFor="piso" className="text-sm font-medium">
                        Piso
                    </Label>
                    <Input
                        id="piso"
                        defaultValue={cliente?.piso?.toString() || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="unidad" className="text-sm font-medium">
                        Unidad
                    </Label>
                    <Input
                        id="unidad"
                        defaultValue={cliente?.und?.toString() || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="codigo-catastral" className="text-sm font-medium">
                        Código Catastral
                    </Label>
                    <Input
                        id="codigo-catastral"
                        defaultValue={cliente?.codcatastral || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                {/* Fila 4 */}
                <div>
                    <Label htmlFor="direccion" className="text-sm font-medium">
                        Dirección
                    </Label>
                    <Input
                        id="direccion"
                        defaultValue={cliente?.direcc || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="distrito" className="text-sm font-medium">
                        Distrito
                    </Label>
                    <Input
                        id="distrito"
                        defaultValue={cliente?.coddist || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="provincia" className="text-sm font-medium">
                        Provincia
                    </Label>
                    <Input
                        id="provincia"
                        defaultValue={cliente?.codprov || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                {/* Fila 5 */}
                <div>
                    <Label htmlFor="departamento" className="text-sm font-medium">
                        Departamento
                    </Label>
                    <Input
                        id="departamento"
                        defaultValue={cliente?.coddpto || "No registrado"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="coordenada-x" className="text-sm font-medium">
                        Coordenada X
                    </Label>
                    <Input
                        id="coordenada-x"
                        defaultValue={"No atributos"}
                        readOnly
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="coordenada-y" className="text-sm font-medium">
                        Coordenada Y
                    </Label>
                    <Input
                        id="coordenada-y"
                        defaultValue={"No atributos"}
                        readOnly
                        className="mt-1"
                    />
                </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Información del Padrón del Sistema</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                        <span className="font-medium">Padrón Completo:</span> {cliente?.codcatastral || ""} - {cliente?.codsector || ""} - {cliente?.codmza || ""} - {cliente?.lote_new || ""}
                    </div>
                    <div>
                        <span className="font-medium">Ubicación:</span> {cliente?.codprov || ""}, {cliente?.codsector || ""}
                    </div>
                </div>
            </div>
        </div>
    );
} 