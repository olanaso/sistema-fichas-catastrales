package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.catastro.sistemafichacatastral.validation.PasswordMatch;

@Data
@PasswordMatch
public class ChangePasswordDto {
    
    @NotBlank(message = "El token es obligatorio")
    private String token;
    
    @NotBlank(message = "La nueva contraseña es obligatoria")
    @Size(min = 6, max = 100, message = "La contraseña debe tener entre 6 y 100 caracteres")
    private String newPassword;
    
    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    @Size(min = 6, max = 100, message = "La confirmación de contraseña debe tener entre 6 y 100 caracteres")
    private String confirmPassword;
} 