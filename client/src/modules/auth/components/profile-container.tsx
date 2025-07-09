"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { getCurrentUser } from "../actions/auth.actions"
import { ProfileTabs } from "./profile-tabs"
import { AccountInfo } from "./account-info"
import { PasswordForm } from "./password-form"
import { UsuarioDto } from "@/models/usuario"

type TabType = "profile" | "password"

export function ProfileContainer() {
  const [activeTab, setActiveTab] = useState<TabType>("profile")
  const [userData, setUserData] = useState<UsuarioDto | null>(null)
  const [loading, setLoading] = useState(false)

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const result = await getCurrentUser()
        if (result.success && result.data) {
          setUserData(result.data)
        } else {
          toast.error(result.error || "Error al cargar los datos del usuario")
        }
      } catch (error) {
        toast.error("Error al cargar los datos del usuario")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleUserUpdate = (updatedData: Partial<UsuarioDto>) => {
    if (userData) {
      setUserData({ ...userData, ...updatedData })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 xs:p-4">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen xs:p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Configuración de Cuenta</h1>
          <p className=" mt-2">Administra tu información personal y configuración de seguridad</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar con tabs verticales */}
          <div className="lg:col-span-1">
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <AccountInfo userData={userData} />
            )}

            {activeTab === "password" && (
              <PasswordForm userId={userData.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 