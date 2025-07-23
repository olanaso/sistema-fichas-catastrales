package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AsiganacionDto {
    private Integer codcliente;
    private String codinspector;
    private String codcreador;
    private LocalDate fecha_visita;
    private String observaciones;  // opcional
    private String codbrigada;
    private String estado;
}
