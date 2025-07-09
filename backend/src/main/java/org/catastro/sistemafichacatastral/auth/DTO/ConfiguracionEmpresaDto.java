package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ConfiguracionEmpresaDto {
    
    @NotBlank(message = "El nombre del sistema es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre del sistema debe tener entre 2 y 100 caracteres")
    private String nombreSistema;
    
    @NotBlank(message = "El nombre del correo es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre del correo debe tener entre 2 y 100 caracteres")
    private String nombreCorreo;
    
    @NotBlank(message = "La URL del cliente es obligatoria")
    @Size(max = 255, message = "La URL del cliente no puede exceder 255 caracteres")
    private String clienteUrl;
    
    @Pattern(regexp = "^[0-9]{11}$", message = "El RUC debe tener exactamente 11 dígitos numéricos")
    @Size(max = 11, message = "El RUC no puede exceder 11 caracteres")
    private String ruc;
    
    @Size(max = 200, message = "La razón social no puede exceder 200 caracteres")
    private String razonSocial;
    
    @Size(max = 300, message = "La dirección no puede exceder 300 caracteres")
    private String direccion;
    
    @Size(max = 100, message = "El país no puede exceder 100 caracteres")
    private String pais;
    
    @Size(max = 100, message = "El departamento no puede exceder 100 caracteres")
    private String departamento;
    
    @Size(max = 100, message = "La provincia no puede exceder 100 caracteres")
    private String provincia;
    
    @Size(max = 100, message = "El distrito no puede exceder 100 caracteres")
    private String distrito;
    
    @Email(message = "El formato del correo de soporte no es válido")
    @Size(max = 100, message = "El correo de soporte no puede exceder 100 caracteres")
    private String correoSoporte;
} 