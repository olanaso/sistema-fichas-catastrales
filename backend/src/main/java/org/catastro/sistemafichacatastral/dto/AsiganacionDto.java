package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FichaUpdateDto {
    private Integer codcliente;
    private String codinspector;
    private String codcreador;
    private LocalDate fecha_visita;
    private String observacion;  // opcional
    private String codbrigada;
    private String estado;
}
