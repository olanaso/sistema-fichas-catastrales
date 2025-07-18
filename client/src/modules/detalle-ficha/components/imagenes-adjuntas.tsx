"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Upload, Eye, X, MapPin } from "lucide-react";
import { DetalleFichaResponse } from "../action/detalle-ficha.action";

interface ImagenesAdjuntasProps {
  ficha: DetalleFichaResponse;
  vistaSupervision: boolean;
}

export default function ImagenesAdjuntas({ ficha, vistaSupervision }: ImagenesAdjuntasProps) {
  const imagenes = [
    {
      id: "caja-agua",
      titulo: "Foto de caja de Agua",
      icono: "💧",
      imagen: ficha.fotocajaagua || null
    },
    {
      id: "caja-desague",
      titulo: "Foto Caja Desague",
      icono: "🚰",
      imagen: ficha.fotocajadesague || null
    },
    {
      id: "fachada",
      titulo: "Foto Fachada",
      icono: "🏠",
      imagen: ficha.fotofachada || null
    },
    {
      id: "detalle-1",
      titulo: "Detalle 1",
      icono: "📌",
      imagen: ficha.fotodetalle4 || null
    },
    {
      id: "detalle-2",
      titulo: "Detalle 2",
      icono: "📌",
      imagen: ficha.fotodetalle4 || null
    },
    {
      id: "detalle-3",
      titulo: "Detalle 3",
      icono: "📌",
      imagen: ficha.fotodetalle4 || null
    }
  ];

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
                
                {item.imagen ? (
                  <div className="relative">
                    <img 
                      src={item.imagen} 
                      alt={item.titulo}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="w-8 h-8 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={vistaSupervision}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Seleccionar...
                    </Button>
                  </div>
                )}
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
                
                {item.imagen ? (
                  <div className="relative">
                    <img 
                      src={item.imagen} 
                      alt={item.titulo}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="w-8 h-8 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={vistaSupervision}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Seleccionar...
                    </Button>
                  </div>
                )}
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
    </div>
  );
} 