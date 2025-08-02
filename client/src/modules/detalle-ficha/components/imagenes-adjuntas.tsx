"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Upload, Eye, MapPin } from "lucide-react";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import { config } from "@/lib/config";
import ImageModal from "@/components/ui/image-modal";

interface ImagenesAdjuntasProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
  handleActualizarAtributos: (atributo: string, valor: string) => void;
}

interface ImagenInfo {
  id: string;
  titulo: string;
  icono: string;
  nombreArchivo: string | null;
  url: string | null;
  esImagen: boolean;
  existe: boolean;
}

export default function ImagenesAdjuntas({ ficha, cliente, handleActualizarAtributos }: ImagenesAdjuntasProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<{ url: string; titulo: string } | null>(null);

  // Función para validar si un archivo es una imagen
  const esArchivoImagen = (nombreArchivo: string): boolean => {
    if (!nombreArchivo) return false;
    const extension = nombreArchivo.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '');
  };

  // Función para construir la URL de la imagen
  const construirUrlImagen = (nombreArchivo: string | null): string | null => {
    if (!nombreArchivo || nombreArchivo.trim() === '') return null;
    return `${config.api.baseUrl}/ftp/imagen/${nombreArchivo}`;
  };

  // Función para validar si existe la imagen
  const validarExistenciaImagen = (nombreArchivo: string | null): boolean => {
    return !!(nombreArchivo && nombreArchivo.trim() !== '');
  };

  // Configurar las imágenes con validaciones
  const imagenes: ImagenInfo[] = [
    {
      id: "caja-agua",
      titulo: "Foto de caja de Agua",
      icono: "💧",
      nombreArchivo: ficha.fotocajaagua || null,
      url: construirUrlImagen(ficha.fotocajaagua || null),
      existe: validarExistenciaImagen(ficha.fotocajaagua || null),
      esImagen: esArchivoImagen(ficha.fotocajaagua || '')
    },
    {
      id: "caja-desague",
      titulo: "Foto Caja Desague",
      icono: "🚰",
      nombreArchivo: ficha.fotocajadesague || null,
      url: construirUrlImagen(ficha.fotocajadesague || null),
      existe: validarExistenciaImagen(ficha.fotocajadesague || null),
      esImagen: esArchivoImagen(ficha.fotocajadesague || '')
    },
    {
      id: "fachada",
      titulo: "Foto Fachada",
      icono: "🏠",
      nombreArchivo: ficha.fotofachada || null,
      url: construirUrlImagen(ficha.fotofachada || null),
      existe: validarExistenciaImagen(ficha.fotofachada || null),
      esImagen: esArchivoImagen(ficha.fotofachada || '')
    },
    {
      id: "detalle-1",
      titulo: "Detalle 1",
      icono: "📌",
      nombreArchivo: ficha.fotodetalle4 || null,
      url: construirUrlImagen(ficha.fotodetalle4 || null),
      existe: validarExistenciaImagen(ficha.fotodetalle4 || null),
      esImagen: esArchivoImagen(ficha.fotodetalle4 || '')
    },
    {
      id: "detalle-2",
      titulo: "Detalle 2",
      icono: "📌",
      nombreArchivo: ficha.fotodetalle5 || null,
      url: construirUrlImagen(ficha.fotodetalle5 || null),
      existe: validarExistenciaImagen(ficha.fotodetalle5 || null),
      esImagen: esArchivoImagen(ficha.fotodetalle5 || '')
    },
    {
      id: "detalle-3",
      titulo: "Detalle 3",
      icono: "📌",
      nombreArchivo: ficha.fotodetalle4 || null, // Mismo que detalle 1
      url: construirUrlImagen(ficha.fotodetalle4 || null),
      existe: validarExistenciaImagen(ficha.fotodetalle4 || null),
      esImagen: esArchivoImagen(ficha.fotodetalle4 || '')
    }
  ];

  // Función para abrir el modal
  const abrirModal = (imagen: ImagenInfo) => {
    if (imagen.url && imagen.existe && imagen.esImagen) {
      setImagenSeleccionada({
        url: imagen.url,
        titulo: imagen.titulo
      });
      setModalAbierto(true);
    }
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setImagenSeleccionada(null);
  };

  // Función para renderizar el contenido de la imagen
  const renderizarContenidoImagen = (imagen: ImagenInfo) => {
    if (!imagen.existe) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <div className="text-gray-400 mb-2">📷</div>
          <p className="text-sm text-gray-500">No hay fotografía</p>
        </div>
      );
    }

    if (!imagen.esImagen) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <div className="text-gray-400 mb-2">📄</div>
          <p className="text-sm text-gray-500">No es una imagen</p>
          <p className="text-xs text-gray-400">Archivo: {imagen.nombreArchivo}</p>
        </div>
      );
    }

    return (
      <div className="relative">
        <img
          src={imagen.url!}
          alt={imagen.titulo}
          className="w-full h-32 object-cover rounded border"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const errorDiv = target.parentNode?.querySelector('.error-message');
            if (errorDiv) {
              (errorDiv as HTMLElement).style.display = 'block';
            }
          }}
        />
        <div className="absolute top-2 right-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-8 h-8 p-0 bg-white/80 hover:bg-white text-black"
            onClick={() => abrirModal(imagen)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
        {/* Mensaje de error oculto por defecto */}
        <div className="error-message hidden border-2 border-dashed border-gray-300 rounded-lg p-4 text-center absolute inset-0 bg-white">
          <div className="text-gray-400 mb-2">⚠️</div>
          <p className="text-sm text-gray-500">Error al cargar imagen</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sección de conexión nueva o faltante */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conexión nueva o faltante</h3>

        {/* Primera fila de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {imagenes.slice(0, 3).map((item) => (
            <Card key={item.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{item.icono}</span>
                  <h4 className="font-medium text-sm">{item.titulo}</h4>
                </div>
                {renderizarContenidoImagen(item)}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Segunda fila de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {imagenes.slice(3, 6).map((item) => (
            <Card key={item.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{item.icono}</span>
                  <h4 className="font-medium text-sm">{item.titulo}</h4>
                </div>
                {renderizarContenidoImagen(item)}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sección de croquis */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Dibujar croquis mano alzada</h3>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50">
          <div className="w-full h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Área de dibujo</p>
              <p className="text-xs text-gray-400">Haga clic para comenzar a dibujar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de imagen */}
      {imagenSeleccionada && (
        <ImageModal
          isOpen={modalAbierto}
          onClose={cerrarModal}
          imageUrl={imagenSeleccionada.url}
          title={imagenSeleccionada.titulo}
        />
      )}
    </div>
  );
} 