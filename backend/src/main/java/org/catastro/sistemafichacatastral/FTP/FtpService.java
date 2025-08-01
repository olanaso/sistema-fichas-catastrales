package org.catastro.sistemafichacatastral.FTP;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.catastro.sistemafichacatastral.dto.FtpRequestDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FtpService {

    // Configuración FTP
    private static final String FTP_SERVER = "161.132.56.57";
    private static final int FTP_PORT = 21;
    private static final String FTP_USERNAME = "userFTP";
    private static final String FTP_PASSWORD = "Cusco159753";

    /**
     * Descarga un archivo específico del servidor FTP
     */
    public Map<String, Object> descargarArchivo(FtpRequestDto request) {
        Map<String, Object> resultado = new HashMap<>();
        FTPClient ftpClient = new FTPClient();

        try {
            // Conectar al servidor FTP
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USERNAME, FTP_PASSWORD);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // Verificar si el archivo existe
            FTPFile[] files = ftpClient.listFiles();
            boolean archivoEncontrado = false;
            
            for (FTPFile file : files) {
                if (file.getName().equals(request.getNombreArchivo())) {
                    archivoEncontrado = true;
                    break;
                }
            }

            if (!archivoEncontrado) {
                resultado.put("success", false);
                resultado.put("error", "Archivo no encontrado: " + request.getNombreArchivo());
                return resultado;
            }

            // Crear directorio de destino si no existe
            File directorioDestino = new File(request.getRutaDestino());
            if (!directorioDestino.exists()) {
                directorioDestino.mkdirs();
            }

            // Descargar el archivo
            String rutaCompleta = request.getRutaDestino() + File.separator + request.getNombreArchivo();
            File archivoDestino = new File(rutaCompleta);

            try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(archivoDestino))) {
                boolean descargado = ftpClient.retrieveFile(request.getNombreArchivo(), outputStream);
                
                if (descargado) {
                    resultado.put("success", true);
                    resultado.put("message", "Archivo descargado exitosamente");
                    resultado.put("archivo", request.getNombreArchivo());
                    resultado.put("ruta_destino", rutaCompleta);
                    resultado.put("tamaño", archivoDestino.length());
                    resultado.put("timestamp", LocalDateTime.now());
                } else {
                    resultado.put("success", false);
                    resultado.put("error", "Error al descargar el archivo");
                }
            }

        } catch (Exception e) {
            resultado.put("success", false);
            resultado.put("error", "Error de conexión FTP: " + e.getMessage());
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException e) {
                System.err.println("Error al cerrar conexión FTP: " + e.getMessage());
            }
        }

        return resultado;
    }

    /**
     * Obtiene una imagen como bytes desde el servidor FTP
     * Retorna null si el archivo no existe o hay un error
     */
    public byte[] obtenerImagenComoBytes(String nombreArchivo) {
        FTPClient ftpClient = new FTPClient();

        try {
            // Conectar al servidor FTP
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USERNAME, FTP_PASSWORD);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // Verificar si el archivo existe
            FTPFile[] files = ftpClient.listFiles();
            boolean archivoEncontrado = false;
            
            for (FTPFile file : files) {
                if (file.getName().equals(nombreArchivo)) {
                    archivoEncontrado = true;
                    break;
                }
            }

            if (!archivoEncontrado) {
                return null;
            }

            // Descargar el archivo a un ByteArrayOutputStream
            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                boolean descargado = ftpClient.retrieveFile(nombreArchivo, outputStream);
                
                if (descargado) {
                    return outputStream.toByteArray();
                } else {
                    return null;
                }
            }

        } catch (Exception e) {
            System.err.println("Error al obtener imagen desde FTP: " + e.getMessage());
            return null;
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException e) {
                System.err.println("Error al cerrar conexión FTP: " + e.getMessage());
            }
        }
    }

    /**
     * Verifica la conexión al servidor FTP
     */
    public Map<String, Object> verificarConexion() {
        Map<String, Object> resultado = new HashMap<>();
        FTPClient ftpClient = new FTPClient();

        try {
            // Conectar al servidor FTP
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            boolean loginExitoso = ftpClient.login(FTP_USERNAME, FTP_PASSWORD);
            
            if (loginExitoso) {
                resultado.put("success", true);
                resultado.put("message", "Conexión FTP exitosa");
                resultado.put("servidor", FTP_SERVER);
                resultado.put("puerto", FTP_PORT);
                resultado.put("usuario", FTP_USERNAME);
                resultado.put("timestamp", LocalDateTime.now());
            } else {
                resultado.put("success", false);
                resultado.put("error", "Error de autenticación FTP");
            }

        } catch (Exception e) {
            resultado.put("success", false);
            resultado.put("error", "Error de conexión FTP: " + e.getMessage());
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException e) {
                System.err.println("Error al cerrar conexión FTP: " + e.getMessage());
            }
        }

        return resultado;
    }
} 