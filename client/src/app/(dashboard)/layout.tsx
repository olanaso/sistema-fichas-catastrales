"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ConfiguracionProvider } from "@/modules/configuracion/context/configuracion-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ConfiguracionProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1">
            <main>{children}</main>
          </div>
        </div>
      </ConfiguracionProvider>
    </SidebarProvider>
  );
}
