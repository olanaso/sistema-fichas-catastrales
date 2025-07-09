package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ConfiguracionCorreoDto {
    
    @NotBlank(message = "El host del correo es obligatorio")
    @Size(max = 100, message = "El host del correo no puede exceder 100 caracteres")
    private String hostCorreo;
    
    @NotBlank(message = "La contraseña del correo es obligatoria")
    @Size(max = 100, message = "La contraseña del correo no puede exceder 100 caracteres")
    private String passwordCorreo;
    
    @NotNull(message = "El puerto del correo es obligatorio")
    @Min(value = 1, message = "El puerto del correo debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto del correo no puede exceder 65535")
    private Integer puertoCorreo;
    
    @NotBlank(message = "El usuario del correo es obligatorio")
    @Size(max = 100, message = "El usuario del correo no puede exceder 100 caracteres")
    private String usuarioCorreo;
} 