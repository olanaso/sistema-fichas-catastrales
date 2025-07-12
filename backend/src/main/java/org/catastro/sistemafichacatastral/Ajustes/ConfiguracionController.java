package org.catastro.sistemafichacatastral.Ajustes;
import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin(origins = "*")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService configuracionService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> getConfiguracion() {
        try {
            ConfiguracionEntity configuracion = configuracionService.getConfiguracion();
            return ResponseEntity.ok(ApiResponse.success("Configuración obtenida exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener configuración: " + e.getMessage()));
        }
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> getConfiguracionPublica() {
        try {
            ConfiguracionEntity configuracion = configuracionService.getConfiguracion();
            return ResponseEntity.ok(ApiResponse.success("Configuración pública obtenida exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener configuración pública: " + e.getMessage()));
        }
    }

    @PostMapping("/actualizar")
    public ResponseEntity<?> actualizarConfiguracion(@RequestBody String dataJson) {
        try {
            String resultado = configuracionService.actualizarConfiguracionJson(dataJson);
            return ResponseEntity.ok().body(Map.of("success", true, "message", resultado));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

} 