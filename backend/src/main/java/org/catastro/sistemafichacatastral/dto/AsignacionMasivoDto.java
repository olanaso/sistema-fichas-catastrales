package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AsignacionMasivoDto {
    private List<Integer> codclientes;
    private String codinspector;
    private String codcreador;
    private LocalDate fecha_visita;
    private String observaciones;  // opcional
    private String codbrigada;
    private String estado;
}
