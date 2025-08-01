"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets } from "lucide-react";
import { FichaCatastro } from "@/models/fichacatastro";
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
import { Cliente } from "@/models/cliente";

interface DatosConexionAguaProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
  vistaSupervision: boolean;
  handleActualizarAtributos: (atributo: string, valor: string) => void;
}

export default function DatosConexionAgua({ ficha, cliente, vistaSupervision, handleActualizarAtributos }: DatosConexionAguaProps) {
  // Estado local para manejar los valores actualizados
  const [valoresActualizados, setValoresActualizados] = useState<{ [key: string]: string }>({});

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
    // Estado del Servicio
    getData("tipoestservicio").then((res) => {
      setEstadoServicio(res.data.map((tipo: TipoEstadoServicio) => ({ value: tipo.estadoservicio, label: tipo.descripcion })));
    });

    // Pavimentación
    buscarExacto("tipopavimento", ["tipocon"], ["001"]).then((res) => {
      setPavimentacion(res.data.map((tipo: TipoPavimento) => ({ value: tipo.pavconagu, label: tipo.descripcion })));
    });

    // Vereda
    buscarExacto("tipovereda", ["tipocon"], ["001"]).then((res) => {
      setVereda(res.data.map((tipo: TipoVereda) => ({ value: tipo.vereda, label: tipo.descripcion })));
    });

    // Diámetros
    buscarExacto("diametros", ["tipocon"], ["001"]).then((res) => {
      setDiametros(res.data.map((tipo: TipoDiametro) => ({ value: tipo.coddiametro, label: tipo.descripcion })));
    });

    // Tipo Material
    buscarExacto("tipomaterial", ["tipocon"], ["001"]).then((res) => {
      setTipoMaterial(res.data.map((tipo: TipoMaterial) => ({ value: tipo.tipomaterial, label: tipo.descripcion })));
    });

    // Tipo Ingreso
    buscarExacto("tipoingresoconex", ["tipocon"], ["001"]).then((res) => {
      setTipoIngreso(res.data.map((tipo: TipoIngresoConexion) => ({ value: tipo.tipoingreso, label: tipo.descripcion })));
    });

    // Tipo Caja
    buscarExacto("tipocaja", ["tipocon"], ["001"]).then((res) => {
      setTipoCaja(res.data.map((tipo: TipoCaja) => ({ value: tipo.tipocaja, label: tipo.descripcion })));
    });

    // Localización Caja
    buscarExacto("tipolocalizacaja", ["tipocon"], ["001"]).then((res) => {
      setLocalizacionCaja(res.data.map((tipo: TipoLocalizacionCaja) => ({ value: tipo.loccaja, label: tipo.descripcion })));
    });

    // Estado Caja
    buscarExacto("tipoestcaja", ["tipocon"], ["001"]).then((res) => {
      setEstadoCaja(res.data.map((tipo: TipoEstadoCaja) => ({ value: tipo.estadocaja, label: tipo.descripcion })));
    });

    // Tipo Tapa
    buscarExacto("tipotapa", ["tipocon"], ["001"]).then((res) => {
      setTipoTapa(res.data.map((tipo: TipoTapa) => ({ value: tipo.tipotapa, label: tipo.descripcion })));
    });

    // Estado Tapa
    buscarExacto("tipoesttapa", ["tipocon"], ["001"]).then((res) => {
      setEstadoTapa(res.data.map((tipo: TipoEstadoTapa) => ({ value: tipo.esttapa, label: tipo.descripcion })));
    });

    // Llaves
    getData("tipollavemedidor").then((res) => {
      setLlaves(res.data.map((tipo: TipoLlaveMedidor) => ({ value: tipo.llavemed, label: tipo.descripcion })));
    });

    // Posición Medidor
    getData("tipoposmedidor").then((res) => {
      setPosicionMedidor(res.data.map((tipo: TipoPosicionMedidor) => ({ value: tipo.posicionmed, label: tipo.descripcion })));
    });

    // Tipo Corte
    buscarExacto("tipocorteservicio", ["tipocon"], ["001"]).then((res) => {
      setTipoCorte(res.data.map((tipo: TipoCorteServicio) => ({ value: tipo.tipocorte, label: tipo.descripcion })));
    });

    // Fugas
    buscarExacto("tipofugas", ["tipocon"], ["001"]).then((res) => {
      setFugas(res.data.map((tipo: TipoFugas) => ({ value: tipo.tipofugas, label: tipo.descripcion })));
    });

    // Caja Observación
    buscarExacto("tipocajaobserv", ["tipocon"], ["001"]).then((res) => {
      setCajaObservacion(res.data.map((tipo: TipoCajaObservacion) => ({ value: tipo.tipocajaobserv, label: tipo.descripcion })));
    });
  }, []);

  // Función para obtener el valor actual (del estado local o de ficha)
  const obtenerValor = (campo: string, valorOriginal: string | number | null | undefined) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {/* Estado del Servicio */}
        <div className="space-y-1">
          <Label htmlFor="estado-servicio" className="text-xs font-medium">
            33. Estado del Servicio
          </Label>
          <ComboboxControlled
            options={estadoServicio}
            value={obtenerValor("estadoservicio", ficha.estadoservicio)}
            placeholder="No registrado"
            className={`h-8 text-xs text-white
              ${!vistaSupervision ?
                "" :
                !(cliente?.estadoservicio_a == ficha.estadoservicio) ?
                "dark:bg-red-500 bg-red-500" :
                "dark:bg-green-500 bg-green-500"}`}
            onChange={(e) => manejarCambio("estadoservicio", e.toString())}
          />
        </div>

        {/* Pavimentación */}
        <div className="space-y-1">
          <Label htmlFor="pavimentacion" className="text-xs font-medium">
            34. Pavimentación
          </Label>
          <ComboboxControlled
            options={pavimentacion}
            value={obtenerValor("pavconagu_a", ficha.pavconagu_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("pavconagu_a", e.toString())}
          />
        </div>

        {/* Vereda */}
        <div className="space-y-1">
          <Label htmlFor="vereda" className="text-xs font-medium">
            35. Vereda
          </Label>
          <ComboboxControlled
            options={vereda}
            value={obtenerValor("vereda_a", ficha.vereda_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("vereda_a", e.toString())}
          />
        </div>

        {/* Diámetro */}
        <div className="space-y-1">
          <Label htmlFor="diametro" className="text-xs font-medium">
            36. Diámetro
          </Label>
          <ComboboxControlled
            options={diametros}
            value={obtenerValor("coddiametro_a", ficha.coddiametro_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("coddiametro_a", e.toString())}
          />
        </div>

        {/* Tipo Material */}
        <div className="space-y-1">
          <Label htmlFor="tipo-material" className="text-xs font-medium">
            37. Tipo Material
          </Label>
          <ComboboxControlled
            options={tipoMaterial}
            value={obtenerValor("tipomaterial_a", ficha.tipomaterial_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipomaterial_a", e.toString())}
          />
        </div>

        {/* Tipo de Ingreso */}
        <div className="space-y-1">
          <Label htmlFor="tipo-ingreso" className="text-xs font-medium">
            38. Tipo de Ingreso
          </Label>
          <ComboboxControlled
            options={tipoIngreso}
            value={obtenerValor("tipoingreso", ficha.tipoingreso)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipoingreso", e.toString())}
          />
        </div>

        {/* Material de Caja */}
        <div className="space-y-1">
          <Label htmlFor="material-caja" className="text-xs font-medium">
            39. Material de Caja
          </Label>
          <ComboboxControlled
            options={tipoCaja}
            value={obtenerValor("tipocaja_a", ficha.tipocaja_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipocaja_a", e.toString())}
          />
        </div>

        {/* Localización Caja */}
        <div className="space-y-1">
          <Label htmlFor="localizacion-caja" className="text-xs font-medium">
            40. Localización Caja
          </Label>
          <ComboboxControlled
            options={localizacionCaja}
            value={obtenerValor("loccaja_a", ficha.loccaja_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("loccaja_a", e.toString())}
          />
        </div>

        {/* Estado Caja */}
        <div className="space-y-1">
          <Label htmlFor="estado-caja" className="text-xs font-medium">
            41. Estado Caja
          </Label>
          <ComboboxControlled
            options={estadoCaja}
            value={obtenerValor("estadocaja_a", ficha.estadocaja_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("estadocaja_a", e.toString())}
          />
        </div>

        {/* Material de Tapa */}
        <div className="space-y-1">
          <Label htmlFor="material-tapa" className="text-xs font-medium">
            42. Material de Tapa
          </Label>
          <ComboboxControlled
            options={tipoTapa}
            value={obtenerValor("tipotapa_a", ficha.tipotapa_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipotapa_a", e.toString())}
          />
        </div>

        {/* Estado de la Tapa */}
        <div className="space-y-1">
          <Label htmlFor="estado-tapa" className="text-xs font-medium">
            43. Estado de la Tapa
          </Label>
          <ComboboxControlled
            options={estadoTapa}
            value={obtenerValor("esttapa_a", ficha.esttapa_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("esttapa_a", e.toString())}
          />
        </div>

        {/* Llaves */}
        <div className="space-y-1">
          <Label htmlFor="llaves" className="text-xs font-medium">
            44. Llaves
          </Label>
          <ComboboxControlled
            options={llaves}
            value={obtenerValor("llavemed", ficha.llavemed)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("llavemed", e.toString())}
          />
        </div>

        {/* Posición medidor */}
        <div className="space-y-1">
          <Label htmlFor="posicion-medidor" className="text-xs font-medium">
            45. Posición medidor
          </Label>
          <ComboboxControlled
            options={posicionMedidor}
            value={obtenerValor("posicionmed", ficha.posicionmed)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("posicionmed", e.toString())}
          />
        </div>

        {/* Tipo de Corte */}
        <div className="space-y-1">
          <Label htmlFor="tipo-corte" className="text-xs font-medium">
            46. Tipo de Corte
          </Label>
          <ComboboxControlled
            options={tipoCorte}
            value={obtenerValor("tipocorte_a", ficha.tipocorte_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipocorte_a", e.toString())}
          />
        </div>

        {/* Razón del corte */}
        <div className="space-y-1">
          <Label htmlFor="razon-corte" className="text-xs font-medium">
            47. Razón del corte
          </Label>
          <Input
            id="razon-corte"
            value={obtenerValor("tipocerrado", ficha.tipocerrado)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipocerrado", e.target.value)}
          />
        </div>

        {/* Fugas */}
        <div className="space-y-1">
          <Label htmlFor="fugas" className="text-xs font-medium">
            48. Fugas
          </Label>
          <ComboboxControlled
            options={fugas}
            value={obtenerValor("tipofugas_a", ficha.tipofugas_a)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipofugas_a", e.toString())}
          />
        </div>

        {/* Caja observación */}
        <div className="space-y-1">
          <Label htmlFor="caja-observacion" className="text-xs font-medium">
            49. Caja observación
          </Label>
          <ComboboxControlled
            options={cajaObservacion}
            value={obtenerValor("tipocajaobserv", ficha.tipocajaobserv)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tipocajaobserv", e.toString())}
          />
        </div>
      </div>
    </div>
  );
} 