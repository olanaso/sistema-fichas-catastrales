package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.catastro.sistemafichacatastral.validation.PasswordMatch;

@Data
public class ChangeMyPasswordDto {
    
    @NotBlank(message = "La contraseña actual es obligatoria")
    private String currentPassword;
    
    @NotBlank(message = "La nueva contraseña es obligatoria")
    @Size(min = 6, max = 100, message = "La contraseña debe tener entre 6 y 100 caracteres")
    private String newPassword;
    
    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    @Size(min = 6, max = 100, message = "La confirmación de contraseña debe tener entre 6 y 100 caracteres")
    private String confirmPassword;
} 