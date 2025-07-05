package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.Rol.RolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    Optional<UsuarioEntity> findByRol(RolEntity rol);
    Optional<UsuarioEntity> findByDni(String dni);
    Optional<UsuarioEntity> findByEmail(String email);
    
    @Query("SELECT u FROM UsuarioEntity u LEFT JOIN FETCH u.rol WHERE u.email = :email")
    Optional<UsuarioEntity> findByEmailWithRoles(@Param("email") String email);
}
