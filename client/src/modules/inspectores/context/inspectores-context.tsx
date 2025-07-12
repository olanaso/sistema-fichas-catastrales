"use client";

import { InspectorDto } from "@/models/inspector";
import { DataProvider, useData } from "../../usuarios/context/data-context";

interface InspectoresProviderProps {
  children: React.ReactNode;
}

export function InspectoresProvider({ children }: InspectoresProviderProps) {
  return (
    <DataProvider<InspectorDto> 
      tableName="inspectores" 
      initialPageSize={10}
    >
      {children}
    </DataProvider>
  );
}

export function useInspectores() {
  return useData<InspectorDto>();
} 