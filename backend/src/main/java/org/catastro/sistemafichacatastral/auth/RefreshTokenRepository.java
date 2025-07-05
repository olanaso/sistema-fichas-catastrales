package org.catastro.sistemafichacatastral.auth;

import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    
    Optional<RefreshTokenEntity> findByToken(String token);
    
    Optional<RefreshTokenEntity> findByUsuario(UsuarioEntity usuario);
    
    @Modifying
    @Query("DELETE FROM RefreshTokenEntity rt WHERE rt.usuario = :usuario")
    void deleteByUsuario(@Param("usuario") UsuarioEntity usuario);
    
    @Modifying
    @Query("DELETE FROM RefreshTokenEntity rt WHERE rt.expiryDate < CURRENT_TIMESTAMP")
    void deleteExpiredTokens();
} 