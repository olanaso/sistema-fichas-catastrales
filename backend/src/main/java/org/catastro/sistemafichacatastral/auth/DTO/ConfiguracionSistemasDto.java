package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ConfiguracionSistemasDto {
    
    @NotBlank(message = "La API de RENIEC/RUC es obligatoria")
    @Size(max = 255, message = "La API de RENIEC/RUC no puede exceder 255 caracteres")
    private String apiReniecRuc;
    
    @NotBlank(message = "El host de la base de datos es obligatorio")
    @Size(max = 100, message = "El host de la base de datos no puede exceder 100 caracteres")
    private String hostDb;
    
    @NotBlank(message = "El usuario de la base de datos es obligatorio")
    @Size(max = 100, message = "El usuario de la base de datos no puede exceder 100 caracteres")
    private String usuarioDb;
    
    @NotBlank(message = "La contraseña de la base de datos es obligatoria")
    @Size(max = 100, message = "La contraseña de la base de datos no puede exceder 100 caracteres")
    private String passwordDb;
    
    @NotBlank(message = "El nombre de la base de datos es obligatorio")
    @Size(max = 100, message = "El nombre de la base de datos no puede exceder 100 caracteres")
    private String baseDatos;
    
    @NotBlank(message = "La conexión SICI1 es obligatoria")
    @Size(max = 255, message = "La conexión SICI1 no puede exceder 255 caracteres")
    private String conexionSici1;
    
    @NotBlank(message = "La conexión SICI2 es obligatoria")
    @Size(max = 255, message = "La conexión SICI2 no puede exceder 255 caracteres")
    private String conexionSici2;
} 