package org.catastro.sistemafichacatastral.audit;

import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.catastro.sistemafichacatastral.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;
    
    @Autowired
    private SessionService sessionService;

    /**
     * Registra una acción de auditoría
     */
    public void logAction(String accion, String recurso, String detalles, String resultado) {
        try {
            UsuarioEntity usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                AuditLogEntity auditLog = new AuditLogEntity();
                auditLog.setUsuario(usuario);
                auditLog.setAccion(accion);
                auditLog.setRecurso(recurso);
                auditLog.setDetalles(detalles);
                auditLog.setResultado(resultado);
                
                // Obtener información de la solicitud HTTP
                try {
                    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
                    if (attributes != null) {
                        HttpServletRequest request = attributes.getRequest();
                        auditLog.setIpAddress(getClientIpAddress(request));
                        auditLog.setUserAgent(request.getHeader("User-Agent"));
                    }
                } catch (Exception e) {
                    // Si no se puede obtener la información de la solicitud, continuar sin ella
                }
                
                auditLogRepository.save(auditLog);
            }
        } catch (Exception e) {
            // No fallar la operación principal si hay error en auditoría
            System.err.println("Error registrando auditoría: " + e.getMessage());
        }
    }

    /**
     * Registra una acción exitosa
     */
    public void logSuccess(String accion, String recurso, String detalles) {
        logAction(accion, recurso, detalles, "SUCCESS");
    }

    /**
     * Registra una acción con error
     */
    public void logError(String accion, String recurso, String detalles) {
        logAction(accion, recurso, detalles, "ERROR");
    }

    /**
     * Registra una acción con advertencia
     */
    public void logWarning(String accion, String recurso, String detalles) {
        logAction(accion, recurso, detalles, "WARNING");
    }

    /**
     * Obtiene los logs de auditoría de un usuario
     */
    public List<AuditLogEntity> getLogsByUsuario(UsuarioEntity usuario) {
        return auditLogRepository.findByUsuarioOrderByFechaCreacionDesc(usuario);
    }

    /**
     * Obtiene los logs de auditoría de un usuario con paginación
     */
    public Page<AuditLogEntity> getLogsByUsuario(UsuarioEntity usuario, Pageable pageable) {
        return auditLogRepository.findByUsuarioOrderByFechaCreacionDesc(usuario, pageable);
    }

    /**
     * Obtiene los logs de auditoría por acción
     */
    public List<AuditLogEntity> getLogsByAccion(String accion) {
        return auditLogRepository.findByAccionOrderByFechaCreacionDesc(accion);
    }

    /**
     * Obtiene los logs de auditoría en un rango de fechas
     */
    public List<AuditLogEntity> getLogsByDateRange(LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        return auditLogRepository.findByFechaCreacionBetweenOrderByFechaCreacionDesc(fechaInicio, fechaFin);
    }

    /**
     * Obtiene los logs recientes de un usuario
     */
    public List<AuditLogEntity> getRecentLogsByUsuario(UsuarioEntity usuario, LocalDateTime fechaInicio) {
        return auditLogRepository.findRecentByUsuario(usuario, fechaInicio);
    }

    /**
     * Cuenta las acciones de un usuario desde una fecha específica
     */
    public long countActionsByUsuarioAndDate(UsuarioEntity usuario, LocalDateTime fechaInicio) {
        return auditLogRepository.countByUsuarioAndFechaCreacionAfter(usuario, fechaInicio);
    }

    /**
     * Obtiene la dirección IP del cliente
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0];
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
} 