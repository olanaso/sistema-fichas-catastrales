package org.catastro.sistemafichacatastral.Ajustes;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.file.upload-dir:uploads}")
    private String uploadDir;

    @Value("${app.file.logo-dir:logos}")
    private String logoDir;

    /**
     * Guarda un archivo de logo y retorna la ruta relativa
     */
    public String saveLogoFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // Validar tipo de archivo
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("El archivo debe ser una imagen");
        }

        // Validar tamaño (máximo 5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("El archivo no puede exceder 5MB");
        }

        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDir, logoDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        
        String filename = "logo_" + UUID.randomUUID().toString() + fileExtension;
        Path filePath = uploadPath.resolve(filename);

        // Guardar archivo
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Retornar ruta relativa para almacenar en BD
        return "/" + logoDir + "/" + filename;
    }

    /**
     * Elimina un archivo de logo
     */
    public void deleteLogoFile(String logoPath) {
        if (logoPath == null || logoPath.trim().isEmpty()) {
            return;
        }

        try {
            // Remover el slash inicial si existe
            if (logoPath.startsWith("/")) {
                logoPath = logoPath.substring(1);
            }

            Path filePath = Paths.get(uploadDir, logoPath);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        } catch (IOException e) {
            // Log el error pero no lanzar excepción
            System.err.println("Error al eliminar archivo: " + e.getMessage());
        }
    }

    /**
     * Obtiene la ruta completa del archivo
     */
    public Path getFilePath(String relativePath) {
        if (relativePath == null || relativePath.trim().isEmpty()) {
            return null;
        }

        // Remover el slash inicial si existe
        if (relativePath.startsWith("/")) {
            relativePath = relativePath.substring(1);
        }

        return Paths.get(uploadDir, relativePath);
    }

    /**
     * Verifica si un archivo existe
     */
    public boolean fileExists(String relativePath) {
        Path filePath = getFilePath(relativePath);
        return filePath != null && Files.exists(filePath);
    }
} 