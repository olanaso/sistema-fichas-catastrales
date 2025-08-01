package org.catastro.sistemafichacatastral.FTP;

import org.catastro.sistemafichacatastral.dto.FtpRequestDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("ftp")
@CrossOrigin(origins = "*")
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

    /**
     * Sirve una imagen desde el servidor FTP
     * Retorna la imagen como un stream de bytes para poder mostrarla en el navegador
     */
    @GetMapping("/imagen/{nombreArchivo}")
    public ResponseEntity<byte[]> servirImagen(@PathVariable String nombreArchivo) {
        try {
            if (nombreArchivo == null || nombreArchivo.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            byte[] imagenBytes = ftpService.obtenerImagenComoBytes(nombreArchivo);
            
            if (imagenBytes == null || imagenBytes.length == 0) {
                return ResponseEntity.notFound().build();
            }

            // Determinar el tipo MIME basado en la extensión del archivo
            String contentType = determinarTipoMIME(nombreArchivo);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentLength(imagenBytes.length);
            headers.setCacheControl("public, max-age=3600"); // Cache por 1 hora
            
            return new ResponseEntity<>(imagenBytes, headers, HttpStatus.OK);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Determina el tipo MIME basado en la extensión del archivo
     */
    private String determinarTipoMIME(String nombreArchivo) {
        String extension = nombreArchivo.toLowerCase();
        if (extension.endsWith(".jpg") || extension.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (extension.endsWith(".png")) {
            return "image/png";
        } else if (extension.endsWith(".gif")) {
            return "image/gif";
        } else if (extension.endsWith(".bmp")) {
            return "image/bmp";
        } else if (extension.endsWith(".webp")) {
            return "image/webp";
        } else {
            return "application/octet-stream";
        }
    }
} 