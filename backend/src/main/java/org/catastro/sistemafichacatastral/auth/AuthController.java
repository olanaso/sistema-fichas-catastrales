package org.catastro.sistemafichacatastral.auth;

import org.catastro.sistemafichacatastral.Usuario.UsuarioDetailsServiceImpl;
import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.catastro.sistemafichacatastral.Usuario.UsuarioService;
import org.catastro.sistemafichacatastral.auth.DTO.AuthDto;
import org.catastro.sistemafichacatastral.auth.DTO.AuthResponseDto;
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
import java.util.Date;

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
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(@Valid @RequestBody AuthDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsuario(), request.getPassword())
            );

            UserDetails user = userDetailsService.loadUserByUsername(request.getUsuario());
            String accessToken = jwtService.generateToken(user);

            // Obtener información completa del usuario
            UsuarioEntity usuario = usuarioService.findByUsuarioOrThrow(request.getUsuario());

            AuthResponseDto.UserInfoDto userInfo = AuthResponseDto.UserInfoDto.builder()
                .codusu(usuario.getCodusu())
                .usuario(usuario.getUsuario())
                .apellidopa(usuario.getApellidopa())
                .apellidoma(usuario.getApellidoma())
                .nombre(usuario.getNombre())
                .car(usuario.getCar())
                .dni(usuario.getDni())
                .fechaingreso(usuario.getFechaingreso() != null ? usuario.getFechaingreso().toString() : null)
                .direccion(usuario.getDireccion())
                .ciudad(usuario.getCiudad())
                .email(usuario.getEmail())
                .telefono(usuario.getTelefono())
                .nivel(usuario.getNivel())
                .notas(usuario.getNotas())
                .estacionactiva(usuario.getEstacionactiva())
                .estaciondefault(usuario.getEstaciondefault())
                .nropc(usuario.getNropc())
                .codempdefault(usuario.getCodempdefault())
                .codsucdefault(usuario.getCodsucdefault())
                .estareg(usuario.getEstareg())
                .creador(usuario.getCreador())
                .fechareg(usuario.getFechareg() != null ? usuario.getFechareg().toString() : null)
                .user_fondo(usuario.getUser_fondo())
                .user_avatar(usuario.getUser_avatar())
                .ipdefault(usuario.getIpdefault())
                .intranet(usuario.getIntranet())
                .foto(usuario.getFoto())
                .tipouser(usuario.getTipouser())
                .accesototal(usuario.getAccesototal())
                .codinspector(usuario.getCodinspector())
                .codsededefault(usuario.getCodsededefault())
                .activo(usuario.isActivo())
                .build();

            AuthResponseDto response = AuthResponseDto.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .expiresIn(86400000L) // 1 día en milisegundos
                .user(userInfo)
                .message("Login exitoso")
                .build();

            return ResponseEntity.ok(ApiResponse.success("Autenticación exitosa", response));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Credenciales inválidas: El usuario o la contraseña son incorrectos"));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Usuario no encontrado: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        // En una implementación más avanzada, aquí podrías invalidar el token
        // Por ahora, solo retornamos un mensaje de éxito
        return ResponseEntity.ok(ApiResponse.success("Logout exitoso", "Sesión cerrada correctamente"));
    }
}
