import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import AcctionTable from "./action-table"
import { UsuarioDto } from "@/models/usuario"
import { Circle, Shield, ShieldCheck } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"

export const columns: ColumnDef<UsuarioDto>[] = [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <AcctionTable usuario={row.original} />
    },
  },
  {
    id: "dni",
    accessorKey: "dni",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="DNI" />
    },
  },
  {
    id: "nombre",
    accessorFn: (row) => `${row.nombre} ${row.apellidopa} ${row.apellidoma}`,
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Nombre" />
    },
    cell: ({ row }) => {
      const nombre = row.original.nombre || '';
      const apellidopa = row.original.apellidopa || '';
      const apellidoma = row.original.apellidoma || '';
      return <div className="text-start">
        {nombre} {apellidopa} {apellidoma}
      </div>
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Email" />
    },
  },
  {
    id: "accesototal",
    accessorKey: "accesototal",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Nivel de Acceso" />
    },
    cell: ({ row }) => {
      const accesototal = row.original.accesototal;
      const isAccesoTotal = accesototal === 1;
      
      return (
        <div className="text-start flex items-center gap-2">
          {isAccesoTotal ? (
            <ShieldCheck className="w-4 h-4 text-green-600" />
          ) : (
            <Shield className="w-4 h-4 text-blue-600" />
          )}
          <CustomBadge 
            color={isAccesoTotal ? "green" : "blue"} 
            className="text-xs"
          >
            {isAccesoTotal ? "Acceso Total" : "Acceso Limitado"}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "codusu",
    accessorKey: "codusu",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código" />
    },
    cell: ({ row }) => {
      return <div className="text-start">
        <CustomBadge color="purple" className="text-xs">{row.original.codusu}</CustomBadge>
      </div>
    },
  },
  {
    id: "activo",
    accessorKey: "activo",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Estado" />
    },
    cell: ({ row }) => {
      const activo = row.original.activo
      let icon = <Circle />
      if (activo) {
        icon = <Circle className="text-green-500 bg-green-500/10 p-1 rounded-full" />
      } else {
        icon = <Circle className="text-red-500 bg-red-500/10 p-1 rounded-full" />
      }
      return <div className="text-start flex items-center gap-2">{icon} {activo ? "Activo" : "Inactivo"}</div>
    },
  }
]