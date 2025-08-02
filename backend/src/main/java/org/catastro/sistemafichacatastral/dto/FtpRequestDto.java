package org.catastro.sistemafichacatastral.dto;

public class FtpRequestDto {
    private String nombreArchivo;
    private String rutaDestino;

    // Constructores
    public FtpRequestDto() {}

    public FtpRequestDto(String nombreArchivo, String rutaDestino) {
        this.nombreArchivo = nombreArchivo;
        this.rutaDestino = rutaDestino;
    }

    // Getters y Setters
    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public String getRutaDestino() {
        return rutaDestino;
    }

    public void setRutaDestino(String rutaDestino) {
        this.rutaDestino = rutaDestino;
    }

    @Override
    public String toString() {
        return "FtpRequestDto{" +
                "nombreArchivo='" + nombreArchivo + '\'' +
                ", rutaDestino='" + rutaDestino + '\'' +
                '}';
    }
} 