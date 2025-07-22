import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderColumn } from "@/components/table/table-header-column";
import { Circle, User } from "lucide-react";
import { CustomBadge } from "@/components/custom/custom-badge";
import { ClienteDto } from "@/models/cliente";
import {
  Calle,
  Manzana,
  Sector,
  TipoCalle,
  TipoServicio,
} from "@/models/tipos";
import { IconButton } from "@/components/custom/icon-button";
import { IconButtonColor } from "@/types/icon-button";

export const columns = (tiposData: {
  sectores: Sector[];
  manzanas: Manzana[];
  calles: Calle[];
  tipocalle: TipoCalle[];
  tiposervicios: TipoServicio[];
}): ColumnDef<ClienteDto>[] => [
  // {
  //   id: "actions",
  //   header: "Acciones",
  //   cell: ({ row }) => {
  //     return <ActionTable cliente={row.original} />;
  //   },
  // },
  {
    id: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.codinspector ? true : false;
      let color = estado ? "green" : "dark";
      let texto = estado ? "Asignado" : "No asignado";
      return (
        <div className="text-start">
          <IconButton
            tooltip={texto}
            color={color as IconButtonColor}
            children={<Circle className="w-4 h-4" />}
          />
        </div>
      );
    },
  },
  {
    id: "codcatastral",
    accessorKey: "codcatastral",
    header: "Cod. Cat.",
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
    header: "Suministro",
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
    header: "Propietario",
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
    header: "Urb./Calle",
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
    id: "dni",
    accessorKey: "dni",
    header: "DNI/RUC",
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
    header: "Teléfono",
    cell: ({ row }) => {
      return (
        <div className="text-start">{row.original.telefono || "Sin dato"}</div>
      );
    },
  },
];
