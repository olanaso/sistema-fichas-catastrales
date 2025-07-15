import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
// import InspectorActionTable from "./action-table"
import { InspectorDto } from "@/models/inspector"
import { Circle, Shield, ShieldCheck, User, Building, MapPin, Group } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"
import InspectorActionTable from "./action-table"
import { GrupoTrabajo } from "@/models/grupotrabajo"

export const columns = (gruposDeTrabajo: GrupoTrabajo[]): ColumnDef<InspectorDto>[] => [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <InspectorActionTable inspector={row.original} gruposDeTrabajo={gruposDeTrabajo} />
    },
  },
  {
    id: "codigo",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código" />
    },
    cell: ({ row }) => {
      const inspector = row.original;
      const codigo = `${inspector.codemp}-${inspector.codsede}-${inspector.codinspector}`;
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{codigo}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "nombres",
    accessorKey: "nombres",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Nombres" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          {row.original.nombres || "Sin nombre"}
        </div>
      );
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
    id: "supervisor",
    accessorKey: "supervisor",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Rol" />
    },
    cell: ({ row }) => {
      const supervisor = row.original.supervisor;
      const isSupervisor = supervisor === 1;
      
      return (
        <div className="text-start flex items-center gap-2">
          {isSupervisor ? (
            <ShieldCheck className="w-4 h-4 text-green-600" />
          ) : (
            <Shield className="w-4 h-4 text-blue-600" />
          )}
          <CustomBadge 
            color={isSupervisor ? "green" : "blue"} 
            className="text-xs"
          >
            {isSupervisor ? "Supervisor" : "Inspector"}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "grupotrabajo",
    accessorKey: "grupotrabajo",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Grupo de trabajo" />
    },
    cell: ({ row }) => {
      const grupotrabajo = gruposDeTrabajo.find(grupo => grupo.codgrupo === row.original.codbrigada);
      return (
        <div className="text-start flex items-center gap-2">
          <Group className="w-4 h-4 text-green-600" />
          <CustomBadge color="green" className="text-xs">
            {grupotrabajo?.nombre || "Sin grupo de trabajo"}
          </CustomBadge>
        </div>
      )
    },
  }
] 