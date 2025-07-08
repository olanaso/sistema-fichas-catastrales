package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.Rol.RolEntity;
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
    
    @Query("SELECT u FROM UsuarioEntity u LEFT JOIN FETCH u.rol WHERE u.email = :email")
    Optional<UsuarioEntity> findByEmailWithRoles(@Param("email") String email);
    
    // Métodos de filtrado
    @Query("SELECT DISTINCT u FROM UsuarioEntity u LEFT JOIN FETCH u.rol WHERE " +
           "(:rol IS NULL OR :rol MEMBER OF u.rol) AND " +
           "(:nombre IS NULL OR LOWER(u.nombres) LIKE LOWER(CONCAT('%', :nombre, '%')) OR " +
           "LOWER(u.apellidos) LIKE LOWER(CONCAT('%', :nombre, '%')))")
    List<UsuarioEntity> findByRolAndNombre(@Param("rol") RolEntity rol, @Param("nombre") String nombre);

    @Query("SELECT DISTINCT u FROM UsuarioEntity u LEFT JOIN FETCH u.rol WHERE " +
           "(:rol IS NULL OR :rol MEMBER OF u.rol)")
    List<UsuarioEntity> findByRol(@Param("rol") RolEntity rol);

    @Query("SELECT DISTINCT u FROM UsuarioEntity u LEFT JOIN FETCH u.rol WHERE " +
           "LOWER(u.nombres) LIKE LOWER(CONCAT('%', :nombre, '%')) OR " +
           "LOWER(u.apellidos) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<UsuarioEntity> findByNombre(@Param("nombre") String nombre);
    
    // Método para activar/desactivar usuario
    @Modifying
    @Transactional
    @Query("UPDATE UsuarioEntity u SET u.activo = :activo WHERE u.id = :id")
    void updateActivoById(@Param("id") int id, @Param("activo") boolean activo);
}
