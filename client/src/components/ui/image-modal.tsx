"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, title }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="relative">
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Título */}
          <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-md">
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          
          {/* Imagen */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'text-white text-center p-8';
                errorDiv.innerHTML = `
                  <div class="text-4xl mb-4">📷</div>
                  <p class="text-lg">Error al cargar la imagen</p>
                  <p class="text-sm text-gray-300">La imagen no pudo ser mostrada</p>
                `;
                target.parentNode?.appendChild(errorDiv);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
