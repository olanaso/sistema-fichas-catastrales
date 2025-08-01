"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { ComboboxOption } from "@/types/combobox";
import { Calle, Manzana, Sector, Sucursal, Urbanizacion } from "@/models/modulos";
import { useEffect, useState } from "react";
import { TipoAbastecimiento, TipoAlmacenaje, TipoConstruccion, TipoServicio } from "@/models/tipos";
import { buscarExacto, getData } from "@/service/data.actions";
import { Cliente } from "@/models/cliente";
import { FichaCatastro } from "@/models/fichacatastro";

interface DatosInmuebleSupervisionProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
}

export default function DatosInmuebleSupervision({ ficha, cliente }: DatosInmuebleSupervisionProps) {
  // Opciones para los combobox (estos datos vendrían del backend)
  const [region, setRegion] = useState<string>("CUSCO");
  const [sucursal, setSucursal] = useState<ComboboxOption[]>([]);
  const [sector, setSector] = useState<ComboboxOption[]>([]);
  const [mzna, setMzna] = useState<ComboboxOption[]>([]);
  const [calle, setCalle] = useState<ComboboxOption[]>([]);
  const [tipoConstruccion, setTipoConstruccion] = useState<ComboboxOption[]>([]);
  const [tipoServicio, setTipoServicio] = useState<ComboboxOption[]>([]);
  const [abastecimiento, setAbastecimiento] = useState<ComboboxOption[]>([]);
  const [almacenaje, setAlmacenaje] = useState<ComboboxOption[]>([]);
  const [urbanizacion, setUrbanizacion] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    getData("sucursales").then((res) => {
      setSucursal(res.data.map((sucursal: Sucursal) => ({ value: sucursal.codsuc, label: sucursal.nombre })));
    });
    buscarExacto("sectores", ["codsuc"], [ficha.codsuc || ""]).then((res) => {
      setSector(res.data.map((sector: Sector) => ({ value: sector.codsector, label: sector.descripcion })));
    });
    buscarExacto("manzanas", ["codsuc", "codsector"], [ficha.codsuc || "", ficha.codsector_new || ""]).then((res) => {
      setMzna(res.data.map((mzna: Manzana) => ({ value: mzna.codmza, label: mzna.descripcion })));
    });
    getData("calles").then((res) => {
      setCalle(res.data.map((calle: Calle) => ({ value: calle.codcalle, label: calle.descripcioncalle })));
    });
    getData("tipoconstruccion").then((res) => {
      setTipoConstruccion(res.data.map((tipo: TipoConstruccion) => ({ value: tipo.tipoconstruccion, label: tipo.descripcion })));
    });
    getData("tiposervicio").then((res) => {
      setTipoServicio(res.data.map((tipo: TipoServicio) => ({ value: tipo.tiposervicio, label: tipo.descripcion })));
    });
    getData("tipoabastecimiento").then((res) => {
      setAbastecimiento(res.data.map((tipo: TipoAbastecimiento) => ({ value: tipo.tipoaba, label: tipo.descripcion })));
    });
    getData("tipoalmacenaje").then((res) => {
      setAlmacenaje(res.data.map((tipo: TipoAlmacenaje) => ({ value: tipo.codalmacenaje, label: tipo.descripcion })));
    });
    buscarExacto("urbanmae", ["codsuc"], [ficha.codsuc || ""]).then((res) => {
      setUrbanizacion(res.data.map((urbanizacion: Urbanizacion) => ({ value: urbanizacion.codurbaso, label: urbanizacion.tipourba + " " + urbanizacion.descripcionurba })));
    });
  }, []);

  const opcionesPiscina: ComboboxOption[] = [
    { value: "000", label: "N.D." },
    { value: "002", label: "NO" },
    { value: "001", label: "SI" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {/* 1. Región */}
      <div className="space-y-1">
        <Label htmlFor="region" className="text-xs font-medium">1. Región</Label>
        <Input
          id="region"
          defaultValue={region}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 2. Sucursal */}
      <div className="space-y-1">
        <Label htmlFor="sucursal" className="text-xs font-medium">2. Sucursal</Label>
        <ComboboxControlled
          options={sucursal}
          value={cliente?.codsuc || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 3. Sector */}
      <div className="space-y-1">
        <Label htmlFor="sector" className="text-xs font-medium">3. Sector</Label>
        <ComboboxControlled
          options={sector}
          value={cliente?.codsector || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 4. Mzna */}
      <div className="space-y-1">
        <Label htmlFor="mzna" className="text-xs font-medium">4. Mzna</Label>
        <ComboboxControlled
          options={mzna}
          value={cliente?.codmza || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 5. Lote */}
      <div className="space-y-1">
        <Label htmlFor="lote" className="text-xs font-medium">5. Lote</Label>
        <Input
          id="lote"
          defaultValue={cliente?.nrolote || "No registrado"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 6. Sub lote */}
      <div className="space-y-1">
        <Label htmlFor="sublote" className="text-xs font-medium">6. Sub lote</Label>
        <Input
          id="sublote"
          defaultValue={cliente?.nrosublote || "No registrado"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 7. N° de Suministro */}
      <div className="space-y-1">
        <Label htmlFor="suministro" className="text-xs font-medium">7. N° Suministro</Label>
        <Input
          id="suministro"
          defaultValue={cliente?.codcliente || "No registrado"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 8. Calle/Jiron/Avenida/Pasaje */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="calle" className="text-xs font-medium">8. Calle/Jiron/Avenida/Pasaje</Label>
        <Input
          id="calle"
          defaultValue={cliente?.direcc || "No registrado"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 9. Cuadra */}
      <div className="space-y-1">
        <Label htmlFor="cuadra" className="text-xs font-medium">9. Cuadra</Label>
        <Input
          id="cuadra"
          defaultValue={"No atributo"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 10. N Muni */}
      <div className="space-y-1">
        <Label htmlFor="nromuni" className="text-xs font-medium">10. N Muni</Label>
        <Input
          id="nromuni"
          defaultValue={"No atributo"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 11. Mz Muni */}
      <div className="space-y-1">
        <Label htmlFor="mzmuni" className="text-xs font-medium">11. Mz Muni</Label>
        <Input
          id="mzmuni"
          defaultValue={"No atributo"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 12. Lt Muni */}
      <div className="space-y-1">
        <Label htmlFor="ltmuni" className="text-xs font-medium">12. Lt Munis</Label>
        <Input
          id="ltmuni"
          defaultValue={"No atributo"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 13. Urbanización/Asociación/AA.HH. */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="urbanizacion" className="text-xs font-medium">13. Urbanización/Asociación/AA.HH.</Label>
        <ComboboxControlled
          options={urbanizacion}
          value={cliente?.codurbaso || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 14. Tipo de Construcción */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="tipoconstruccion" className="text-xs font-medium">14. Tipo de Construcción</Label>
        <ComboboxControlled
          options={tipoConstruccion}
          value={cliente?.constru || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 15. Numero de Pisos */}
      <div className="space-y-1">
        <Label htmlFor="nropisos" className="text-xs font-medium">15. N° Pisos</Label>
        <Input
          id="nropisos"
          defaultValue={cliente?.piso || "No registrado"}
          readOnly
          className="bg-muted h-8 text-xs"
        />
      </div>

      {/* 16. Tipo Servicio */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="tiposervicio" className="text-xs font-medium">16. Tipo Servicio</Label>
        <ComboboxControlled
          options={tipoServicio}
          value={cliente?.tiposervicio || ""}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className={`h-8 text-xs text-white
            ${!(cliente?.tiposervicio == ficha.tiposervicio) ?
              "dark:bg-red-500 bg-red-500" :
              "dark:bg-green-500 bg-green-500"}`}
        />
      </div>

      {/* 17. Abastecimiento */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="abastecimiento" className="text-xs font-medium">17. Abastecimiento</Label>
        <ComboboxControlled
          options={abastecimiento}
          value={cliente?.codmzaab || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 18. Piscina */}
      <div className="space-y-1">
        <Label htmlFor="piscina" className="text-xs font-medium">18. Piscina</Label>
        <ComboboxControlled
          options={opcionesPiscina}
          value={cliente?.piscina || "No registrado"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>

      {/* 19. Reservorio/Almacenaje */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="almacenaje" className="text-xs font-medium">19. Reservorio/Almacenaje</Label>
        <ComboboxControlled
          options={almacenaje}
          value={"No atributo"}
          onChange={() => { }}
          placeholder="No registrado"
          disabled
          className="h-8 text-xs"
        />
      </div>
    </div>
  );
} 