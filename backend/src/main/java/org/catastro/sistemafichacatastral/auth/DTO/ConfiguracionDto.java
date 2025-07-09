package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ConfiguracionDto {
    
    @NotBlank(message = "El nombre del sistema es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre del sistema debe tener entre 2 y 100 caracteres")
    private String nombreSistema;
    
    @NotBlank(message = "El nombre del correo es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre del correo debe tener entre 2 y 100 caracteres")
    private String nombreCorreo;
    
    @NotBlank(message = "La conexión SICI1 es obligatoria")
    @Size(max = 255, message = "La conexión SICI1 no puede exceder 255 caracteres")
    private String conexionSici1;
    
    @NotBlank(message = "La conexión SICI2 es obligatoria")
    @Size(max = 255, message = "La conexión SICI2 no puede exceder 255 caracteres")
    private String conexionSici2;
    
    @Size(max = 255, message = "El logo no puede exceder 255 caracteres")
    private String logo;
    
    @NotBlank(message = "La URL del cliente es obligatoria")
    @Size(max = 255, message = "La URL del cliente no puede exceder 255 caracteres")
    private String clienteUrl;
} 