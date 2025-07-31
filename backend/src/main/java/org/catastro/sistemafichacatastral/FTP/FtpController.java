package org.catastro.sistemafichacatastral.FTP;

import org.catastro.sistemafichacatastral.dto.FtpRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("ftp")
public class FtpController {

    private final FtpService ftpService;

    public FtpController(FtpService ftpService) {
        this.ftpService = ftpService;
    }

    /**
     * Verifica la conexión al servidor FTP
     */
    @GetMapping("/conexion")
    public ResponseEntity<?> verificarConexion() {
        try {
            Map<String, Object> resultado = ftpService.verificarConexion();
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Lista todos los archivos disponibles en el servidor FTP
     */
    @GetMapping("/archivos")
    public ResponseEntity<?> listarArchivos() {
        try {
            Map<String, Object> resultado = ftpService.listarArchivos();
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Descarga un archivo específico del servidor FTP
     */
    @PostMapping("/descargar")
    public ResponseEntity<?> descargarArchivo(@RequestBody FtpRequestDto request) {
        try {
            if (request.getNombreArchivo() == null || request.getNombreArchivo().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Nombre de archivo es requerido"));
            }
            
            if (request.getRutaDestino() == null || request.getRutaDestino().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Ruta de destino es requerida"));
            }

            Map<String, Object> resultado = ftpService.descargarArchivo(request);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Sube un archivo al servidor FTP
     */
    @PostMapping("/subir")
    public ResponseEntity<?> subirArchivo(@RequestParam("archivo") MultipartFile archivo) {
        try {
            if (archivo.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Archivo es requerido"));
            }

            Map<String, Object> resultado = ftpService.subirArchivo(archivo);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Elimina un archivo del servidor FTP
     */
    @DeleteMapping("/eliminar/{nombreArchivo}")
    public ResponseEntity<?> eliminarArchivo(@PathVariable String nombreArchivo) {
        try {
            if (nombreArchivo == null || nombreArchivo.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Nombre de archivo es requerido"));
            }

            Map<String, Object> resultado = ftpService.eliminarArchivo(nombreArchivo);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Descarga un archivo por nombre (ruta por defecto)
     */
    @GetMapping("/descargar/{nombreArchivo}")
    public ResponseEntity<?> descargarArchivoPorNombre(@PathVariable String nombreArchivo) {
        try {
            if (nombreArchivo == null || nombreArchivo.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Nombre de archivo es requerido"));
            }

            // Ruta por defecto: directorio temporal del sistema
            String rutaPorDefecto = System.getProperty("java.io.tmpdir") + "/ftp_downloads";
            
            FtpRequestDto request = new FtpRequestDto(nombreArchivo, rutaPorDefecto);
            Map<String, Object> resultado = ftpService.descargarArchivo(request);
            
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
} 