package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UsuarioUpdateDto {    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String nombres;
    
    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(min = 2, max = 50, message = "Los apellidos deben tener entre 2 y 50 caracteres")
    private String apellidos;
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El formato del email no es válido")
    @Size(max = 100, message = "El email no puede exceder 100 caracteres")
    private String email;
    
    @NotBlank(message = "El DNI es obligatorio")
    @Pattern(regexp = "^[0-9]{8}$", message = "El DNI debe tener exactamente 8 dígitos numéricos")
    private String dni;
    
    @NotNull(message = "El estado del usuario es obligatorio")
    private Boolean activo;
    
    @NotNull(message = "El ID del rol es obligatorio")
    @Min(value = 1, message = "El ID del rol debe ser mayor a 0")
    private Integer idRol;
} 