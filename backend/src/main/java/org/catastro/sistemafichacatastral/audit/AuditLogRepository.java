package org.catastro.sistemafichacatastral.audit;

import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLogEntity, Long> {
    
    List<AuditLogEntity> findByUsuarioOrderByFechaCreacionDesc(UsuarioEntity usuario);
    
    Page<AuditLogEntity> findByUsuarioOrderByFechaCreacionDesc(UsuarioEntity usuario, Pageable pageable);
    
    List<AuditLogEntity> findByAccionOrderByFechaCreacionDesc(String accion);
    
    List<AuditLogEntity> findByFechaCreacionBetweenOrderByFechaCreacionDesc(
            LocalDateTime fechaInicio, LocalDateTime fechaFin);
    
    @Query("SELECT a FROM AuditLogEntity a WHERE a.usuario = :usuario AND a.fechaCreacion >= :fechaInicio ORDER BY a.fechaCreacion DESC")
    List<AuditLogEntity> findRecentByUsuario(@Param("usuario") UsuarioEntity usuario, @Param("fechaInicio") LocalDateTime fechaInicio);
    
    @Query("SELECT COUNT(a) FROM AuditLogEntity a WHERE a.usuario = :usuario AND a.fechaCreacion >= :fechaInicio")
    long countByUsuarioAndFechaCreacionAfter(@Param("usuario") UsuarioEntity usuario, @Param("fechaInicio") LocalDateTime fechaInicio);
} 