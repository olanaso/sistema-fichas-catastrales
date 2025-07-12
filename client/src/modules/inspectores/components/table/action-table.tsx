"use client";

import { useState, useTransition } from "react";
import { Edit, Trash2, Power } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import UpdateInspectorForm from "../forms/update-inspector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/custom/loading-button";
import { toast } from "sonner";
import { InspectorDto } from "@/models/inspector";
import { useInspectores } from "../../context/inspectores-context";

interface InspectorActionTableProps {
  inspector: InspectorDto;
}

export default function InspectorActionTable({ inspector }: InspectorActionTableProps) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const { refreshData, pagination } = useInspectores();

  const [isPending, startTransition] = useTransition();

  const handleUpdateSuccess = () => {
    refreshData(pagination.page, pagination.pageSize);
  };

  return (
    <div className="flex gap-2">

      {/* Dialog para actualizar el inspector */}
      <UpdateInspectorForm
        inspector={inspector}
        onSuccess={handleUpdateSuccess}
        onCancel={() => setIsOpenUpdate(false)}
      />
    </div>
  );
} 