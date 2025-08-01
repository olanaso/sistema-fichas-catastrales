package org.catastro.sistemafichacatastral.FichasCatastrales.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActualizarFichaDto {
    private Integer idficha;
    private List<String> columnas;
    private List<String> valores;
} 