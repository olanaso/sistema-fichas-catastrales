package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

import java.util.Map;

@Data
public class JsonInsertRequest {
    private String tabla;
    private Map<String, Object> datos;
}
