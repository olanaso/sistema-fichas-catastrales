package com.app.catastro.model.utils;

public enum AtributosJSON {
    RESPONSE("response"), DATA("data");

    private final String valor;

    AtributosJSON(String valor) {
        this.valor = valor;
    }

    @Override
    public String toString() {
        return valor;
    }
}
