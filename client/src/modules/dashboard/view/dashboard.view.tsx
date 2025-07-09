"use client";

import { DashboardContent } from "../components/dashboard-content";
import { Skeleton } from "@/components/ui/skeleton";

// Componente de carga
function DashboardSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
    );
}

export default function DashboardView() {
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
} 