package org.catastro.sistemafichacatastral.FichasCatastrales.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnidadUsoDto {
    private Integer codcliente;
    private String tarifa;
    private String actividad;
    private Integer cantidad;
    private String razonsocial;
    private String referencia;
    private Integer idficha;
} 