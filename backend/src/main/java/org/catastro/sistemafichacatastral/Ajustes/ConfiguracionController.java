package org.catastro.sistemafichacatastral.Ajustes;

import org.catastro.sistemafichacatastral.audit.AuditService;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionDto;
import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin(origins = "*")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService configuracionService;

    @Autowired
    private AuditService auditService;

    /**
     * Obtiene la configuración del sistema
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> getConfiguracion() {
        try {
            ConfiguracionEntity configuracion = configuracionService.getConfiguracion();
            return ResponseEntity.ok(ApiResponse.success("Configuración obtenida exitosamente", configuracion));
        } catch (Exception e) {
            auditService.logError("OBTENER_CONFIGURACION", "/configuracion", 
                "Error al obtener configuración: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener configuración: " + e.getMessage()));
        }
    }

    /**
     * Actualiza la configuración del sistema
     */
    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> updateConfiguracion(@Valid @RequestBody ConfiguracionDto configuracionDto) {
        try {
            ConfiguracionEntity configuracion = configuracionService.updateConfiguracion(configuracionDto);
            
            String accion = configuracionService.existeConfiguracion() ? "actualizada" : "creada";
            auditService.logSuccess("ACTUALIZAR_CONFIGURACION", "/configuracion", 
                "Configuración " + accion + " exitosamente");
            
            return ResponseEntity.ok(ApiResponse.success("Configuración " + accion + " exitosamente", configuracion));
        } catch (Exception e) {
            auditService.logError("ACTUALIZAR_CONFIGURACION", "/configuracion", 
                "Error al actualizar configuración: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar configuración: " + e.getMessage()));
        }
    }

    /**
     * Obtiene la configuración pública (sin restricciones de seguridad)
     * Para uso en el frontend público
     */
    @GetMapping("/public")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> getConfiguracionPublica() {
        try {
            ConfiguracionEntity configuracion = configuracionService.getConfiguracion();
            return ResponseEntity.ok(ApiResponse.success("Configuración pública obtenida exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener configuración pública: " + e.getMessage()));
        }
    }
} 