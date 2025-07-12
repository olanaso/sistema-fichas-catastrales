package org.catastro.sistemafichacatastral.auth.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String accessToken;
    private String tokenType;
    private Long expiresIn;
    private UserInfoDto user;
    private String message;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfoDto {
        private String codusu;
        private String usuario;
        private String apellidopa;
        private String apellidoma;
        private String nombre;
        private String car;
        private String dni;
        private String fechaingreso;
        private String direccion;
        private String ciudad;
        private String email;
        private String telefono;
        private String nivel;
        private String notas;
        private String estacionactiva;
        private String estaciondefault;
        private String nropc;
        private String codempdefault;
        private String codsucdefault;
        private short estareg;
        private String creador;
        private String fechareg;
        private String user_fondo;
        private String user_avatar;
        private String ipdefault;
        private short intranet;
        private String foto;
        private String tipouser;
        private int accesototal;
        private String codinspector;
        private String codsededefault;
        private boolean activo;
    }
} 