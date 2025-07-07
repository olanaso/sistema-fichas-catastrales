package org.catastro.sistemafichacatastral.audit;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuditLogEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioEntity usuario;
    
    @Column(name = "accion", length = 100, nullable = false)
    private String accion;
    
    @Column(name = "recurso", length = 200, nullable = false)
    private String recurso;
    
    @Column(name = "detalles", columnDefinition = "TEXT")
    private String detalles;
    
    @Column(name = "ip_address", length = 45)
    private String ipAddress;
    
    @Column(name = "user_agent", length = 500)
    private String userAgent;
    
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;
    
    @Column(name = "resultado", length = 20)
    private String resultado; // SUCCESS, ERROR, WARNING
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
} 