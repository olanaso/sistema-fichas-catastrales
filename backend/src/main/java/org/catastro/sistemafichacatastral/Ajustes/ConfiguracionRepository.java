package org.catastro.sistemafichacatastral.Ajustes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfiguracionRepository extends JpaRepository<ConfiguracionEntity, Integer> {
    
    /**
     * Obtiene la primera configuración del sistema
     * Como solo debe existir una configuración, obtenemos la primera
     */
    Optional<ConfiguracionEntity> findFirstByOrderByIdAsc();
    
    /**
     * Verifica si existe alguna configuración
     */
    boolean existsBy();
} 