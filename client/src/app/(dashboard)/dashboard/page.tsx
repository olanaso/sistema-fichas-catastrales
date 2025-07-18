"use client";

import { Navbar } from "@/components/navbar";
import DashboardView from "@/modules/dashboard/view/dashboard.view";
import { Home, LayoutDashboard } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const breadcrumb = [
    {
      icon: <Home className="h-3 w-3" />,
      text: "Inicio",
      path: "/dashboard",
    }
  ];

  return (
    <ProtectedRoute requiredAccess="total">
      <div className="flex flex-col min-h-screen">
        <Navbar
          breadcrumb={breadcrumb}
          title="Panel de Control"
          description="Vista general de reuniones y servicios"
        />
        <main className="flex-1 mx-auto p-8 w-full">
          <div className="grid grid-cols-1 gap-8">
            <DashboardView />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 