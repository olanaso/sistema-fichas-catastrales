"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { ComboboxOption } from "@/types/combobox";
import { FichaCatastro } from "@/models/fichacatastro";

interface DatosInmuebleProps {
  ficha: FichaCatastro;
  vistaSupervision: boolean;
}

export default function DatosInmueble({ ficha, vistaSupervision }: DatosInmuebleProps) {
  // Opciones para los combobox (estos datos vendrían del backend)
  const opcionesSucursal: ComboboxOption[] = [
    { value: "004", label: "SAN SEBASTIAN" },
    { value: "001", label: "OTRA SUCURSAL" }
  ];

  const opcionesSector: ComboboxOption[] = [
    { value: "000", label: "SECTOR 011" },
    { value: "001", label: "SECTOR 012" }
  ];

  const opcionesCalle: ComboboxOption[] = [
    { value: "104", label: "LA MOLINA" },
    { value: "105", label: "OTRA CALLE" }
  ];

  const opcionesUrbanizacion: ComboboxOption[] = [
    { value: "937", label: "LA MOLINA" },
    { value: "938", label: "OTRA URBANIZACIÓN" }
  ];

  const opcionesTipoConstruccion: ComboboxOption[] = [
    { value: "013", label: "CASA" },
    { value: "014", label: "DEPARTAMENTO" }
  ];

  const opcionesTipoServicio: ComboboxOption[] = [
    { value: "001", label: "AGUA" },
    { value: "004", label: "AGUA Y DESAGÜE" }
  ];

  const opcionesAbastecimiento: ComboboxOption[] = [
    { value: "001", label: "RED PÚBLICA" },
    { value: "002", label: "POZO" }
  ];

  const opcionesPiscina: ComboboxOption[] = [
    { value: "002", label: "NO" },
    { value: "001", label: "SI" }
  ];

  const opcionesAlmacenaje: ComboboxOption[] = [
    { value: "000", label: "NO TIENE" },
    { value: "001", label: "TIENE" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 1. Región */}
      <div className="space-y-2">
        <Label htmlFor="region">1. Región</Label>
        <Input
          id="region"
          value={"-----No atributos-----"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 2. Sucursal */}
      <div className="space-y-2">
        <Label htmlFor="sucursal">2. Sucursal</Label>
        <ComboboxControlled
          options={opcionesSucursal}
          value={ficha.codsuc || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar sucursal..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 3. Sector */}
      <div className="space-y-2">
        <Label htmlFor="sector">3. Sector</Label>
        <ComboboxControlled
          options={opcionesSector}
          value={ficha.codsector_new || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar sector..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 4. Mzna */}
      <div className="space-y-2">
        <Label htmlFor="mzna">4. Mzna</Label>
        <Input
          id="mzna"
          value={ficha.codmza_new || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 5. Lote */}
      <div className="space-y-2">
        <Label htmlFor="lote">5. Lote</Label>
        <Input
          id="lote"
          value={ficha.nrolote_new || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 6. Sub lote */}
      <div className="space-y-2">
        <Label htmlFor="sublote">6. Sub lote</Label>
        <Input
          id="sublote"
          value={ficha.nrosublote_new || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 7. N° de Suministro */}
      <div className="space-y-2">
        <Label htmlFor="suministro">7. N° de Suministro</Label>
        <Input
          id="suministro"
          value={ficha.codcliente || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 7. Calle/Jiron/Avenida/Pasaje */}
      <div className="space-y-2">
        <Label htmlFor="calle">8. Calle/Jiron/Avenida/Pasaje</Label>
        <Input
          id="calle"
          value={ficha.direccion || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 8. Cuadra */}
      <div className="space-y-2">
        <Label htmlFor="cuadra">9. Cuadra</Label>
        <Input
          id="cuadra"
          value={ficha.cuadra?.toString() || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 9. N Muni */}
      <div className="space-y-2">
        <Label htmlFor="nromuni">10. N Muni</Label>
        <Input
          id="nromuni"
          value={ficha.nromunic?.toString() || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 10. Mz Muni */}
      <div className="space-y-2">
        <Label htmlFor="mzmuni">11. Mz Muni</Label>
        <Input
          id="mzmuni"
          value={ficha.mzamunic?.toString() || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 11. Lt Muni */}
      <div className="space-y-2">
        <Label htmlFor="ltmuni">12. Lt Muni</Label>
        <Input
          id="ltmuni"
          value={ficha.ltemunic?.toString() || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 12. Urbanización/Asociación/AA.HH. */}
      <div className="space-y-2">
        <Label htmlFor="urbanizacion">13. Urbanización/Asociación/AA.HH.</Label>
        <ComboboxControlled
          options={opcionesUrbanizacion}
          value={ficha.urbanizacion || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar urbanización..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 13. Tipo de Construcción */}
      <div className="space-y-2">
        <Label htmlFor="tipoconstruccion">14. Tipo de Construcción</Label>
        <ComboboxControlled
          options={opcionesTipoConstruccion}
          value={ficha.tipoconstruccion?.toString() || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar tipo..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 14. Numero de Pisos */}
      <div className="space-y-2">
        <Label htmlFor="nropisos">15. Numero de Pisos</Label>
        <Input
          id="nropisos"
          value={ficha.nropisos || "No registrado"}
          readOnly={vistaSupervision}
          className="bg-muted"
        />
      </div>

      {/* 15. Tipo Servicio */}
      <div className="space-y-2">
        <Label htmlFor="tiposervicio">16. Tipo Servicio</Label>
        <ComboboxControlled
          options={opcionesTipoServicio}
          value={ficha.tiposervicio || ""}
          onChange={() => { }}
          placeholder="Seleccionar servicio..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 16. Abastecimiento */}
      <div className="space-y-2">
        <Label htmlFor="abastecimiento">17. Abastecimiento</Label>
        <ComboboxControlled
          options={opcionesAbastecimiento}
          value={ficha.tipoaba || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar abastecimiento..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 17. Piscina */}
      <div className="space-y-2">
        <Label htmlFor="piscina">18. Piscina</Label>
        <ComboboxControlled
          options={opcionesPiscina}
          value={ficha.piscina || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar..."
          disabled={vistaSupervision}
        />
      </div>

      {/* 18. Reservorio/Almacenaje */}
      <div className="space-y-2">
        <Label htmlFor="almacenaje">19. Reservorio/Almacenaje</Label>
        <ComboboxControlled
          options={opcionesAlmacenaje}
          value={ficha.codalmacenaje || "No registrado"}
          onChange={() => { }}
          placeholder="Seleccionar..."
          disabled={vistaSupervision}
        />
      </div>
    </div>
  );
} 