package org.catastro.sistemafichacatastral.audit;

import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.catastro.sistemafichacatastral.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/audit")
@CrossOrigin(origins = "*")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @Autowired
    private SessionService sessionService;

    @GetMapping("/my-logs")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'INSPECTOR')")
    public ResponseEntity<ApiResponse<List<AuditLogEntity>>> getMyLogs() {
        try {
            var usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                List<AuditLogEntity> logs = auditService.getLogsByUsuario(usuario);
                return ResponseEntity.ok(ApiResponse.success("Logs de auditoría obtenidos", logs));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener logs: " + e.getMessage()));
        }
    }

    @GetMapping("/my-logs/paged")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'INSPECTOR')")
    public ResponseEntity<ApiResponse<Page<AuditLogEntity>>> getMyLogsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            var usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                Pageable pageable = PageRequest.of(page, size);
                Page<AuditLogEntity> logs = auditService.getLogsByUsuario(usuario, pageable);
                return ResponseEntity.ok(ApiResponse.success("Logs de auditoría obtenidos", logs));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener logs: " + e.getMessage()));
        }
    }

    @GetMapping("/by-action/{accion}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<List<AuditLogEntity>>> getLogsByAction(@PathVariable String accion) {
        try {
            List<AuditLogEntity> logs = auditService.getLogsByAccion(accion);
            return ResponseEntity.ok(ApiResponse.success("Logs de auditoría por acción obtenidos", logs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener logs: " + e.getMessage()));
        }
    }

    @GetMapping("/by-date-range")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<List<AuditLogEntity>>> getLogsByDateRange(
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin) {
        try {
            LocalDateTime inicio = LocalDateTime.parse(fechaInicio);
            LocalDateTime fin = LocalDateTime.parse(fechaFin);
            List<AuditLogEntity> logs = auditService.getLogsByDateRange(inicio, fin);
            return ResponseEntity.ok(ApiResponse.success("Logs de auditoría por rango de fechas obtenidos", logs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener logs: " + e.getMessage()));
        }
    }

    @GetMapping("/recent")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<List<AuditLogEntity>>> getRecentLogs(
            @RequestParam(defaultValue = "7") int days) {
        try {
            var usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                LocalDateTime fechaInicio = LocalDateTime.now().minusDays(days);
                List<AuditLogEntity> logs = auditService.getRecentLogsByUsuario(usuario, fechaInicio);
                return ResponseEntity.ok(ApiResponse.success("Logs recientes obtenidos", logs));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener logs: " + e.getMessage()));
        }
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<Object>> getAuditStats(
            @RequestParam(defaultValue = "30") int days) {
        try {
            var usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                LocalDateTime fechaInicio = LocalDateTime.now().minusDays(days);
                long totalActions = auditService.countActionsByUsuarioAndDate(usuario, fechaInicio);
                
                var stats = new java.util.HashMap<String, Object>();
                stats.put("totalActions", totalActions);
                stats.put("periodDays", days);
                stats.put("userEmail", usuario.getEmail());
                stats.put("userName", usuario.getNombres() + " " + usuario.getApellidos());
                
                return ResponseEntity.ok(ApiResponse.success("Estadísticas de auditoría obtenidas", stats));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener estadísticas: " + e.getMessage()));
        }
    }
} 