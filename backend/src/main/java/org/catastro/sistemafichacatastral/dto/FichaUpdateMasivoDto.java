package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FichaUpdateDto {
    private Integer idficha;
    private String inspector;
    private String encuestador;
    private LocalDate fechaVisita;
    private String observacion;  // opcional
    private String codbrigada;
}
