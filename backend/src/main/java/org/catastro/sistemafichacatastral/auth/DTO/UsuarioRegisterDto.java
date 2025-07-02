package org.catastro.sistemafichacatastral.auth.DTO;

import lombok.Data;

@Data
public class UsuarioRegisterDto {
    private String nombres;
    private String apellidos;
    private String email;
    private String password;
    private String dni;
    private Integer edad;
    private Integer idRol;
}
