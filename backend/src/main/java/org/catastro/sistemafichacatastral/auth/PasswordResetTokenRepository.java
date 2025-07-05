package org.catastro.sistemafichacatastral.auth;

import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetTokenEntity, Long> {
    
    Optional<PasswordResetTokenEntity> findByToken(String token);
    
    Optional<PasswordResetTokenEntity> findByUsuario(UsuarioEntity usuario);
    
    @Modifying
    @Query("DELETE FROM PasswordResetTokenEntity prt WHERE prt.usuario = :usuario")
    void deleteByUsuario(@Param("usuario") UsuarioEntity usuario);
    
    @Modifying
    @Query("DELETE FROM PasswordResetTokenEntity prt WHERE prt.expiryDate < CURRENT_TIMESTAMP")
    void deleteExpiredTokens();
} 