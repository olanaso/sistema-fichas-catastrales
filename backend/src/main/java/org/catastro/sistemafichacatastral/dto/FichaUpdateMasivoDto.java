package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class FichaUpdateMasivoDto {
    private List<Integer> idfichas;
    private String inspector;
    private String encuestador;
    private LocalDate fechaVisita;
    private String observacion;  // opcional
    private String codbrigada;
}
