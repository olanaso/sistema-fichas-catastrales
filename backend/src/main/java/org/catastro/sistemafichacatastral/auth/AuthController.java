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

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UsuarioEntity>> register(@RequestBody UsuarioRegisterDto usuarioRegisterDto) {
        try {
            // Validaciones básicas
            if (usuarioRegisterDto.getNombres() == null || usuarioRegisterDto.getNombres().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El nombre es obligatorio"));
            }
            if (usuarioRegisterDto.getApellidos() == null || usuarioRegisterDto.getApellidos().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Los apellidos son obligatorios"));
            }
            if (usuarioRegisterDto.getEmail() == null || usuarioRegisterDto.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El email es obligatorio"));
            }
            if (usuarioRegisterDto.getPassword() == null || usuarioRegisterDto.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La contraseña es obligatoria"));
            }
            if (usuarioRegisterDto.getDni() == null || usuarioRegisterDto.getDni().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El DNI es obligatorio"));
            }
            if (usuarioRegisterDto.getEdad() == null || usuarioRegisterDto.getEdad() <= 0) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La edad debe ser mayor a 0"));
            }

            UsuarioEntity usuario = this.usuarioService.create(usuarioRegisterDto);
            
            // Enviar email de bienvenida
            try {
                authService.sendWelcomeEmail(usuario);
            } catch (Exception e) {
                // Log del error pero no fallar el registro
                System.err.println("Error enviando email de bienvenida: " + e.getMessage());
            }
            
            return ResponseEntity.ok(ApiResponse.success("Usuario registrado exitosamente con rol de administrador", usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al registrar usuario: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/register-admin")
    public ResponseEntity<ApiResponse<UsuarioEntity>> registerAdmin(@RequestBody UsuarioRegisterDto usuarioRegisterDto) {
        try {
            // Validaciones básicas
            if (usuarioRegisterDto.getNombres() == null || usuarioRegisterDto.getNombres().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El nombre es obligatorio"));
            }
            if (usuarioRegisterDto.getApellidos() == null || usuarioRegisterDto.getApellidos().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Los apellidos son obligatorios"));
            }
            if (usuarioRegisterDto.getEmail() == null || usuarioRegisterDto.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El email es obligatorio"));
            }
            if (usuarioRegisterDto.getPassword() == null || usuarioRegisterDto.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La contraseña es obligatoria"));
            }
            if (usuarioRegisterDto.getDni() == null || usuarioRegisterDto.getDni().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El DNI es obligatorio"));
            }
            if (usuarioRegisterDto.getEdad() == null || usuarioRegisterDto.getEdad() <= 0) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La edad debe ser mayor a 0"));
            }

            UsuarioEntity usuario = this.usuarioService.create(usuarioRegisterDto);
            return ResponseEntity.ok(ApiResponse.success("Administrador registrado exitosamente", usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al registrar administrador: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/register-with-role")
    public ResponseEntity<ApiResponse<UsuarioEntity>> registerWithRole(@RequestBody UsuarioRegisterDto usuarioRegisterDto) {
        try {
            // Validaciones básicas
            if (usuarioRegisterDto.getNombres() == null || usuarioRegisterDto.getNombres().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El nombre es obligatorio"));
            }
            if (usuarioRegisterDto.getApellidos() == null || usuarioRegisterDto.getApellidos().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Los apellidos son obligatorios"));
            }
            if (usuarioRegisterDto.getEmail() == null || usuarioRegisterDto.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El email es obligatorio"));
            }
            if (usuarioRegisterDto.getPassword() == null || usuarioRegisterDto.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La contraseña es obligatoria"));
            }
            if (usuarioRegisterDto.getDni() == null || usuarioRegisterDto.getDni().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El DNI es obligatorio"));
            }
            if (usuarioRegisterDto.getEdad() == null || usuarioRegisterDto.getEdad() <= 0) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La edad debe ser mayor a 0"));
            }
            if (usuarioRegisterDto.getCodigoRol() == null || usuarioRegisterDto.getCodigoRol().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El código de rol es obligatorio"));
            }

            UsuarioEntity usuario = this.usuarioService.createWithSpecificRole(usuarioRegisterDto, usuarioRegisterDto.getCodigoRol());
            return ResponseEntity.ok(ApiResponse.success("Usuario registrado exitosamente con rol: " + usuarioRegisterDto.getCodigoRol(), usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al registrar usuario: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody AuthDto request) {
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
    public ResponseEntity<ApiResponse<Map<String, Object>>> refreshToken(@RequestBody RefreshTokenDto request) {
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
    public ResponseEntity<ApiResponse<String>> logout(@RequestBody RefreshTokenDto request) {
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
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestBody ResetPasswordDto request) {
        try {
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El email es obligatorio"));
            }

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
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody ChangePasswordDto request) {
        try {
            if (request.getToken() == null || request.getToken().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El token es obligatorio"));
            }
            if (request.getNewPassword() == null || request.getNewPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La nueva contraseña es obligatoria"));
            }
            if (request.getConfirmPassword() == null || request.getConfirmPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La confirmación de contraseña es obligatoria"));
            }
            if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Las contraseñas no coinciden"));
            }
            if (request.getNewPassword().length() < 6) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La contraseña debe tener al menos 6 caracteres"));
            }

            authService.resetPassword(request.getToken(), request.getNewPassword());
            
            return ResponseEntity.ok(ApiResponse.success("Contraseña actualizada", 
                "Tu contraseña ha sido actualizada exitosamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al restablecer contraseña: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @GetMapping("/prueba")
    public ResponseEntity<ApiResponse<String>> getAuthDto() {
        return ResponseEntity.ok(ApiResponse.success("Endpoint de prueba funcionando correctamente"));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("Servicio de autenticación funcionando correctamente"));
    }

    @PostMapping("/test-login")
    public ResponseEntity<ApiResponse<String>> testLogin(@RequestBody AuthDto request) {
        try {
            // Solo validar que los datos lleguen correctamente
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El email es obligatorio"));
            }
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La contraseña es obligatoria"));
            }
            
            return ResponseEntity.ok(ApiResponse.success("Datos recibidos correctamente", 
                "Email: " + request.getEmail() + ", Password: " + request.getPassword().substring(0, Math.min(3, request.getPassword().length())) + "***"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error en test: " + e.getMessage()));
        }
    }

    @PostMapping("/test-email")
    public ResponseEntity<ApiResponse<String>> testEmail(@RequestBody ResetPasswordDto request) {
        try {
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El email es obligatorio"));
            }

            // Crear un token de prueba
            String testToken = java.util.UUID.randomUUID().toString();
            
            // Enviar email de prueba
            authService.sendWelcomeEmail(usuarioService.findByEmailOrThrow(request.getEmail()));
            
            return ResponseEntity.ok(ApiResponse.success("Email de prueba enviado", 
                "Se ha enviado un email de bienvenida a " + request.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error al enviar email: " + e.getMessage()));
        }
    }
}
