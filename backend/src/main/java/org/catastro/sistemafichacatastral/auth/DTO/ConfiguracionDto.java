package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ConfiguracionDto {
    
    // Campos obligatorios existentes
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
    
    @NotBlank(message = "La URL del cliente es obligatoria")
    @Size(max = 255, message = "La URL del cliente no puede exceder 255 caracteres")
    private String clienteUrl;
    
    // Campos opcionales existentes
    @Size(max = 255, message = "El logo no puede exceder 255 caracteres")
    private String logo;
    
    // Campo para el archivo de logo (no se valida con Bean Validation)
    private MultipartFile logoFile;
    
    // Nuevos campos - Datos de la empresa (opcionales)
    @Pattern(regexp = "^[0-9]{11}$", message = "El RUC debe tener exactamente 11 dígitos numéricos")
    @Size(max = 11, message = "El RUC no puede exceder 11 caracteres")
    private String ruc;
    
    @Size(max = 200, message = "La razón social no puede exceder 200 caracteres")
    private String razonSocial;
    
    @Size(max = 300, message = "La dirección no puede exceder 300 caracteres")
    private String direccion;
    
    @Size(max = 200, message = "El nombre comercial no puede exceder 200 caracteres")
    private String nombreComercial;
    
    @Size(max = 100, message = "El país no puede exceder 100 caracteres")
    private String pais;
    
    @Size(max = 100, message = "El departamento no puede exceder 100 caracteres")
    private String departamento;
    
    @Size(max = 100, message = "La provincia no puede exceder 100 caracteres")
    private String provincia;
    
    @Size(max = 100, message = "El distrito no puede exceder 100 caracteres")
    private String distrito;
    
    // Nuevos campos - Configuración de correo (opcionales)
    @Email(message = "El formato del correo de soporte no es válido")
    @Size(max = 100, message = "El correo de soporte no puede exceder 100 caracteres")
    private String correoSoporte;
    
    @Size(max = 100, message = "El host del correo no puede exceder 100 caracteres")
    private String hostCorreo;
    
    @Size(max = 100, message = "La contraseña del correo no puede exceder 100 caracteres")
    private String passwordCorreo;
    
    @Min(value = 1, message = "El puerto del correo debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto del correo no puede exceder 65535")
    private Integer puertoCorreo;
    
    @Size(max = 100, message = "El usuario del correo no puede exceder 100 caracteres")
    private String usuarioCorreo;
    
    // Nuevos campos - APIs externas (opcionales)
    @Size(max = 255, message = "La API de RENIEC/RUC no puede exceder 255 caracteres")
    private String apiReniecRuc;

    // Nuevos campos - Configuración de base de datos PostgreSQL (opcionales)
    @Size(max = 100, message = "El host de la base de datos no puede exceder 100 caracteres")
    private String hostDb;

    @Size(max = 100, message = "El usuario de la base de datos no puede exceder 100 caracteres")
    private String usuarioDb;

    @Size(max = 100, message = "La contraseña de la base de datos no puede exceder 100 caracteres")
    private String passwordDb;

    @Size(max = 100, message = "El nombre de la base de datos no puede exceder 100 caracteres")
    private String baseDatos;
} 