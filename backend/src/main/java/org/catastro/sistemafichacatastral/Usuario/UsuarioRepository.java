package org.catastro.sistemafichacatastral.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    Optional<UsuarioEntity> findByDni(String dni);
    Optional<UsuarioEntity> findByEmail(String email);

    // Método para activar/desactivar usuario
    @Modifying
    @Transactional
    @Query("UPDATE UsuarioEntity u SET u.activo = :activo WHERE u.id = :id")
    void updateActivoById(@Param("id") int id, @Param("activo") boolean activo);
}
