package org.catastro.sistemafichacatastral.auth;

import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.catastro.sistemafichacatastral.Usuario.UsuarioService;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class AuthService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshTokenExpiration;

    @Value("${password.reset.token.expiration}")
    private Long passwordResetTokenExpiration;

    // Refresh Token Methods
    public RefreshTokenEntity createRefreshToken(UsuarioEntity usuario) {
        // Revocar tokens existentes del usuario
        refreshTokenRepository.deleteByUsuario(usuario);

        RefreshTokenEntity refreshToken = new RefreshTokenEntity();
        refreshToken.setUsuario(usuario);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(LocalDateTime.now().plusSeconds(refreshTokenExpiration / 1000));
        refreshToken.setRevoked(false);

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshTokenEntity> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshTokenEntity verifyRefreshToken(String token) {
        RefreshTokenEntity refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token no encontrado"));

        if (refreshToken.isExpired()) {
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException("Refresh token expirado");
        }

        if (refreshToken.isRevoked()) {
            throw new RuntimeException("Refresh token revocado");
        }

        return refreshToken;
    }

    public void revokeRefreshToken(String token) {
        RefreshTokenEntity refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token no encontrado"));
        
        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
    }

    public void revokeAllUserTokens(UsuarioEntity usuario) {
        refreshTokenRepository.deleteByUsuario(usuario);
    }

    // Password Reset Methods
    public void createPasswordResetToken(UsuarioEntity usuario) {
        // Eliminar tokens existentes del usuario
        passwordResetTokenRepository.deleteByUsuario(usuario);

        PasswordResetTokenEntity resetToken = new PasswordResetTokenEntity();
        resetToken.setUsuario(usuario);
        resetToken.setToken(UUID.randomUUID().toString());
        resetToken.setExpiryDate(LocalDateTime.now().plusSeconds(passwordResetTokenExpiration / 1000));
        resetToken.setUsed(false);

        passwordResetTokenRepository.save(resetToken);

        // Enviar email
        String userName = usuario.getNombres() + " " + usuario.getApellidos();
        emailService.sendPasswordResetEmail(usuario.getEmail(), resetToken.getToken(), userName);
    }

    public PasswordResetTokenEntity verifyPasswordResetToken(String token) {
        PasswordResetTokenEntity resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token de restablecimiento no encontrado"));

        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Token de restablecimiento expirado");
        }

        if (resetToken.isUsed()) {
            throw new RuntimeException("Token de restablecimiento ya utilizado");
        }

        return resetToken;
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetTokenEntity resetToken = verifyPasswordResetToken(token);
        
        UsuarioEntity usuario = resetToken.getUsuario();
        usuario.setPassword(passwordEncoder.encode(newPassword));
        usuarioService.update(usuario.getId(), usuario);

        // Marcar token como usado
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }

    public void sendWelcomeEmail(UsuarioEntity usuario) {
        String userName = usuario.getNombres() + " " + usuario.getApellidos();
        emailService.sendWelcomeEmail(usuario.getEmail(), userName);
    }

    // Cleanup Methods
    public void cleanupExpiredTokens() {
        refreshTokenRepository.deleteExpiredTokens();
        passwordResetTokenRepository.deleteExpiredTokens();
    }
} 