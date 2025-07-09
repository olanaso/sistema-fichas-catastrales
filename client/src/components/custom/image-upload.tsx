"use client";

import React, { forwardRef, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  onFileChange?: (file: File) => void;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // en MB
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      value,
      onChange,
      onFileChange,
      label,
      helperText,
      error,
      className,
      accept = "image/*",
      maxSize = 5, // 5MB por defecto
      ...props
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen');
        return;
      }

      // Validar tamaño
      if (file.size > maxSize * 1024 * 1024) {
        alert(`El archivo debe ser menor a ${maxSize}MB`);
        return;
      }

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        if (onChange) onChange(result);
        if (onFileChange) onFileChange(file);
      };
      reader.readAsDataURL(file);
    };

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    };

    const removeImage = () => {
      setPreview(null);
      if (onChange) onChange("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const hasError = !!error;

    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label>{label}</Label>}
        
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            dragActive && "border-primary bg-primary/5",
            hasError && "border-red-500",
            !hasError && !dragActive && "border-gray-300 hover:border-gray-400"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-sm text-gray-600">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:text-primary/80"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir imagen
                </Button>
                <p className="mt-2">o arrastra y suelta aquí</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF hasta {maxSize}MB
              </p>
            </div>
          )}
          
          <input
            ref={(node) => {
              // Manejar ambos refs
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              fileInputRef.current = node;
            }}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            {...props}
          />
        </div>

        {/* Mensajes de ayuda y error */}
        {hasError && <p className="text-xs text-red-500">{error}</p>}
        {helperText && !preview && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload"; 