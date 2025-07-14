import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderColumn } from "@/components/table/table-header-column";
import { User } from "lucide-react";
import { CustomBadge } from "@/components/custom/custom-badge";
import ActionTable from "./action-table";
import { ClienteDto } from "@/models/cliente";
import {
  Calle,
  Manzana,
  Sector,
  TipoCalle,
  TipoServicio,
} from "@/models/tipos";
import { buscarPorColumna } from "@/service/obtener-data-dinamico";
import { Predio } from "@/models/predio";
import { useEffect, useState } from "react";

export const columns = (tiposData: {
  sectores: Sector[];
  manzanas: Manzana[];
  calles: Calle[];
  tipocalle: TipoCalle[];
  tiposervicios: TipoServicio[];
}): ColumnDef<ClienteDto>[] => [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <ActionTable cliente={row.original} />;
    },
  },
  {
    id: "codcatastral",
    accessorKey: "codcatastral",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Cod. Cat." />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">
            {row.original.codsuc +
              "-" +
              row.original.codsector +
              "-" +
              row.original.codmza +
              "-" +
              row.original.nrolote +
              "-" +
              row.original.nrosublote}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "codcliente",
    accessorKey: "codcliente",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Suministro" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.original.codcliente || "Sin dato"}
        </div>
      );
    },
  },
  {
    id: "propietario",
    accessorKey: "propietario",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Propietario" />;
    },
    cell: ({ row }) => {
      const ficha = row.original;
      return (
        <div className="text-start flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <div>
            <div className="font-medium">
              {ficha.propietario || "Sin propietario"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "codcalle",
    accessorKey: "codcalle",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Urb./Calle" />;
    },
    cell: ({ row }) => {
      const calle = tiposData.calles.find(
        (c) => c.codcalle === row.original.codcalle
      );
      const tipocalle = tiposData.tipocalle.find(
        (t) => t.tipocalle === calle?.tipocalle
      );
      return (
        <div className="text-start">
          <CustomBadge color="orange" className="text-xs">
            {tipocalle?.descripcioncorta
              ? tipocalle?.descripcioncorta + " " + calle?.descripcioncalle
              : calle?.descripcioncalle || "Sin calle"}{" "}
            - {row.original.nrocalle}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "tipoconstruccion",
    header: ({ column }) => (
      <TableHeaderColumn column={column} title="Tipo de Const." />
    ),
    cell: ({ row }) => (
      <PredioCampoCell
        codcliente={row.original.codcliente}
        campo="tipoconstruccion"
      />
    ),
  },
  {
    id: "nropisos",
    header: ({ column }) => (
      <TableHeaderColumn column={column} title="Nro. Pisos" />
    ),
    cell: ({ row }) => (
      <PredioCampoCell codcliente={row.original.codcliente} campo="nropisos" />
    ),
  },
  {
    id: "tiposervicio",
    accessorKey: "tiposervicio",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Tipo de Servicio" />;
    },
    cell: ({ row }) => {
      const tipoServicio = tiposData.tiposervicios.find(
        (t) => t.tiposervicio === row.original.tiposervicio
      );
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">
            {tipoServicio?.descripcion || "Sin tipo de servicio"}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "piscina",
    header: ({ column }) => (
      <TableHeaderColumn column={column} title="Piscina" />
    ),
    cell: ({ row }) => (
      <PredioCampoCell codcliente={row.original.codcliente} campo="piscina" />
    ),
  },
  {
    id: "dni",
    accessorKey: "dni",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="DNI/RUC" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="blue" className="text-xs">
            {row.original.dni || "Sin DNI"} / {row.original.ruc || "Sin RUC"}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "telefono",
    accessorKey: "telefono",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Teléfono" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">{row.original.telefono || "Sin dato"}</div>
      );
    },
  },
];

function PredioCampoCell({
  codcliente,
  campo,
}: {
  codcliente: number;
  campo: keyof Predio;
}) {
  const [valor, setValor] = useState<string | number | null>(null);

  useEffect(() => {
    if (codcliente) {
      buscarPorColumna<Predio>(
        "predio",
        "codcliente",
        codcliente.toString()
      ).then((res) => {
        const predio = res[0];
        setValor(predio ? predio[campo] ?? null : null);
      });
    }
  }, [codcliente, campo]);

  return (
    <span className="text-start">
      {valor !== null && valor !== undefined && valor !== ""
        ? valor
        : "Sin dato"}
    </span>
  );
}
