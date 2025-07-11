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

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
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
}
