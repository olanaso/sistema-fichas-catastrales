package org.catastro.sistemafichacatastral.auth;

import org.catastro.sistemafichacatastral.Usuario.UsuarioDetailsServiceImpl;
import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.catastro.sistemafichacatastral.Usuario.UsuarioService;
import org.catastro.sistemafichacatastral.auth.DTO.AuthDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangePasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.RefreshTokenDto;
import org.catastro.sistemafichacatastral.auth.DTO.ResetPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.catastro.sistemafichacatastral.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtService jwtService;
    @Autowired private UsuarioDetailsServiceImpl userDetailsService;
    @Autowired private AuthService authService;

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@Valid @RequestBody AuthDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());
            String accessToken = jwtService.generateToken(user);
            
            // Crear refresh token
            UsuarioEntity usuario = usuarioService.findByEmailOrThrow(request.getEmail());
            RefreshTokenEntity refreshToken = authService.createRefreshToken(usuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken.getToken());
            response.put("user", user);
            response.put("message", "Login exitoso");
            
            return ResponseEntity.ok(ApiResponse.success("Autenticación exitosa", response));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Credenciales inválidas: El email o la contraseña son incorrectos"));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Usuario no encontrado: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, Object>>> refreshToken(@Valid @RequestBody RefreshTokenDto request) {
        try {
            RefreshTokenEntity refreshToken = authService.verifyRefreshToken(request.getRefreshToken());
            
            UserDetails user = userDetailsService.loadUserByUsername(refreshToken.getUsuario().getEmail());
            String newAccessToken = jwtService.generateToken(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", newAccessToken);
            response.put("refreshToken", refreshToken.getToken());
            response.put("message", "Token renovado exitosamente");
            
            return ResponseEntity.ok(ApiResponse.success("Token renovado exitosamente", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Error al renovar token: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(@Valid @RequestBody RefreshTokenDto request) {
        try {
            authService.revokeRefreshToken(request.getRefreshToken());
            return ResponseEntity.ok(ApiResponse.success("Logout exitoso", "Sesión cerrada correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al cerrar sesión: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ResetPasswordDto request) {
        try {
            UsuarioEntity usuario = usuarioService.findByEmailOrThrow(request.getEmail());
            authService.createPasswordResetToken(usuario);
            
            return ResponseEntity.ok(ApiResponse.success("Email enviado", 
                "Se ha enviado un email con las instrucciones para restablecer tu contraseña"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al procesar solicitud: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ChangePasswordDto request) {
        try {
            authService.resetPassword(request.getToken(), request.getNewPassword());
            
            return ResponseEntity.ok(ApiResponse.success("Contraseña actualizada", 
                "Tu contraseña ha sido actualizada exitosamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al restablecer contraseña: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }
}
