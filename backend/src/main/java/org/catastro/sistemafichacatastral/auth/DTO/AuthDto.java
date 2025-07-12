package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthDto {
    
    @NotBlank(message = "El usuario es obligatorio")
    @Size(max = 100, message = "El usuario no puede exceder 100 caracteres")
    private String usuario;
    
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 1, message = "La contraseña no puede estar vacía")
    private String password;
}
