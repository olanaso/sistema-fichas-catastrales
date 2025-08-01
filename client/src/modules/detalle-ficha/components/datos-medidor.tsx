"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FichaCatastro } from "@/models/fichacatastro";
import { TipoDiametro, TipoEstadoMedidor, TipoFacturacion, TipoLectura, TipoMarcaMedidor } from "@/models/tipos";
import { buscarExacto, getData } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Cliente } from "@/models/cliente";

interface DatosMedidorProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
  vistaSupervision: boolean;
  handleActualizarAtributos: (atributo: string, valor: string) => void;
}

export default function DatosMedidor({ ficha, cliente, vistaSupervision, handleActualizarAtributos }: DatosMedidorProps) {
  // Estado local para manejar los valores actualizados
  const [valoresActualizados, setValoresActualizados] = useState<{ [key: string]: string }>({});

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

  // Función para obtener el valor actual (del estado local o de ficha)
  const obtenerValor = (campo: string, valorOriginal: string | number | Date | null | undefined) => {
    return valoresActualizados[campo] !== undefined 
      ? valoresActualizados[campo] 
      : valorOriginal?.toString() || "No registrado";
  };

  // Función para manejar cambios
  const manejarCambio = (campo: string, valor: string) => {
    setValoresActualizados(prev => ({ ...prev, [campo]: valor }));
    handleActualizarAtributos(campo, valor);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {/* Número Medidor */}
        <div className="space-y-1">
          <Label htmlFor="numero-medidor" className="text-xs font-medium">
            50. Número Medidor
          </Label>
          <Input
            id="numero-medidor"
            value={obtenerValor("nromed", ficha.nromed)}
            className={`h-8 text-xs text-white
              ${!vistaSupervision ?
                "" :
                !(cliente?.nro_medidor == ficha.nromed) ?
                "dark:bg-red-500 bg-red-500" :
                "dark:bg-green-500 bg-green-500"
              }`}
            onChange={(e) => manejarCambio("nromed", e.target.value)}
          />
        </div>

        {/* Año */}
        <div className="space-y-1">
          <Label htmlFor="ano" className="text-xs font-medium">
            51. Año
          </Label>
          <Input
            id="ano"
            value={obtenerValor("anio", ficha.anio)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("anio", e.target.value)}
          />
        </div>

        {/* Lectura Medidor */}
        <div className="space-y-1">
          <Label htmlFor="lectura-medidor" className="text-xs font-medium">
            52. Lectura Medidor
          </Label>
          <Input
            id="lectura-medidor"
            value={obtenerValor("lecturaultima", ficha.lecturaultima)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("lecturaultima", e.target.value)}
          />
        </div>

        {/* Número medidor Sistema */}
        <div className="space-y-1">
          <Label htmlFor="numero-medidor-sistema" className="text-xs font-medium text-red-600">
            Número medidor Sistema
          </Label>
          <Input
            id="numero-medidor-sistema"
            value={obtenerValor("nromed_new", ficha.nromed_new)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("nromed_new", e.target.value)}
          />
        </div>

        {/* Fecha de Instalación */}
        <div className="space-y-1">
          <Label htmlFor="fecha-instalacion" className="text-xs font-medium">
            53. Fecha de Instalación
          </Label>
          <Input
            id="fecha-instalacion"
            value={obtenerValor("fechainstalacion", ficha.fechainstalacion)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("fechainstalacion", e.target.value)}
          />
        </div>

        {/* Marca */}
        <div className="space-y-1">
          <Label htmlFor="marca" className="text-xs font-medium">
            54. Marca
          </Label>
          <ComboboxControlled
            options={marcas}
            value={obtenerValor("marcamed", ficha.marcamed)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("marcamed", e.toString())}
          />
        </div>

        {/* Diámetro del Medidor */}
        <div className="space-y-1">
          <Label htmlFor="diametro-medidor" className="text-xs font-medium">
            55. Diámetro del Medidor
          </Label>
          <ComboboxControlled
            options={diametros}
            value={obtenerValor("coddiametro_m", ficha.coddiametro_m)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("coddiametro_m", e.toString())}
          />
        </div>

        {/* Lectura */}
        <div className="space-y-1">
          <Label htmlFor="lectura" className="text-xs font-medium">
            56. Lectura
          </Label>
          <Input
            id="lectura"
            value={obtenerValor("lectura", ficha.lectura)}
            className={`bg-muted h-8 text-xs text-white
              ${!vistaSupervision ?
                "" :
                !(ficha.lectura == "No atributos") ?
                "dark:bg-red-500 bg-red-500" :
                "dark:bg-green-500 bg-green-500"}`}
            onChange={(e) => manejarCambio("lectura", e.target.value)}
          />
        </div>

        {/* Tipo Facturación */}
        <div className="space-y-1">
          <Label htmlFor="tipo-facturacion" className="text-xs font-medium">
            57. Tipo Facturación
          </Label>
          <ComboboxControlled
            options={tipoFacturacion}
            value={obtenerValor("tipofacturacion", ficha.tipofacturacion)}
            placeholder="No registrado"
            className={`bg-muted h-8 text-xs text-white
              ${!vistaSupervision ?
                "" :
                !(ficha.tipofacturacion == "No atributos") ?
                "dark:bg-red-500 bg-red-500" :
                "dark:bg-green-500 bg-green-500"}`}
            onChange={(e) => manejarCambio("tipofacturacion", e.toString())}
          />
        </div>

        {/* Tipo de Lectura */}
        <div className="space-y-1">
          <Label htmlFor="tipo-lectura" className="text-xs font-medium">
            58. Tipo de Lectura
          </Label>
          <ComboboxControlled
            options={tipoLectura}
            value={obtenerValor("tipolectura", ficha.tipolectura)}
            placeholder="Seleccionar tipo"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipolectura", e.toString())}
          />
        </div>

        {/* Estado del Medidor */}
        <div className="space-y-1">
          <Label htmlFor="estado-medidor" className="text-xs font-medium">
            59. Estado del Medidor
          </Label>
          <ComboboxControlled
            options={estadoMedidor}
            value={obtenerValor("estadomed", ficha.estadomed)}
            placeholder="No registrado"
            className={`bg-muted h-8 text-xs text-white
              ${!vistaSupervision ?
                "" :
                !(ficha.estadomed == "No atributos") ?
                "dark:bg-red-500 bg-red-500" :
                "dark:bg-green-500 bg-green-500"}`}
            onChange={(e) => manejarCambio("estadomed", e.toString())}
          />
        </div>

        {/* Operativo */}
        <div className="space-y-1">
          <Label htmlFor="operativo" className="text-xs font-medium">
            60. Operativo
          </Label>
          <ComboboxControlled
            options={opcionesSiNo}
            value={obtenerValor("medidoroperativo", ficha.medidoroperativo)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("medidoroperativo", e.toString())}
          />
        </div>

        {/* Tiene Medidor */}
        <div className="space-y-1">
          <Label htmlFor="tiene-medidor" className="text-xs font-medium">
            Tiene Medidor
          </Label>
          <ComboboxControlled
            options={opcionesSiNo}
            value={obtenerValor("tienemedidor", ficha.tienemedidor)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tienemedidor", e.toString())}
          />
        </div>
      </div>
    </div>
  );
} 