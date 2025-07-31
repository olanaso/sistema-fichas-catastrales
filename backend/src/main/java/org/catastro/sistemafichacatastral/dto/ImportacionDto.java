package org.catastro.sistemafichacatastral.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImportacionDto {
    private String usuario;
    private String contrasena;
    private String observacion;
} 