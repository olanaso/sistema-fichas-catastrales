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
     * Lista todos los archivos disponibles en el servidor FTP
     */
    public Map<String, Object> listarArchivos() {
        Map<String, Object> resultado = new HashMap<>();
        FTPClient ftpClient = new FTPClient();

        try {
            // Conectar al servidor FTP
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USERNAME, FTP_PASSWORD);
            ftpClient.enterLocalPassiveMode();

            // Obtener lista de archivos
            FTPFile[] files = ftpClient.listFiles();
            List<Map<String, Object>> archivos = new ArrayList<>();

            for (FTPFile file : files) {
                if (file.isFile()) {
                    Map<String, Object> archivo = new HashMap<>();
                    archivo.put("nombre", file.getName());
                    archivo.put("tamaño", file.getSize());
                    archivo.put("fecha_modificacion", file.getTimestamp().getTime());
                    archivos.add(archivo);
                }
            }

            resultado.put("success", true);
            resultado.put("archivos", archivos);
            resultado.put("total_archivos", archivos.size());
            resultado.put("timestamp", LocalDateTime.now());

        } catch (Exception e) {
            resultado.put("success", false);
            resultado.put("error", "Error al listar archivos: " + e.getMessage());
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
     * Sube un archivo al servidor FTP
     */
    public Map<String, Object> subirArchivo(MultipartFile archivo) {
        Map<String, Object> resultado = new HashMap<>();
        FTPClient ftpClient = new FTPClient();

        try {
            // Conectar al servidor FTP
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USERNAME, FTP_PASSWORD);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // Subir el archivo
            try (InputStream inputStream = archivo.getInputStream()) {
                boolean subido = ftpClient.storeFile(archivo.getOriginalFilename(), inputStream);
                
                if (subido) {
                    resultado.put("success", true);
                    resultado.put("message", "Archivo subido exitosamente");
                    resultado.put("archivo", archivo.getOriginalFilename());
                    resultado.put("tamaño", archivo.getSize());
                    resultado.put("timestamp", LocalDateTime.now());
                } else {
                    resultado.put("success", false);
                    resultado.put("error", "Error al subir el archivo");
                }
            }

        } catch (Exception e) {
            resultado.put("success", false);
            resultado.put("error", "Error al subir archivo: " + e.getMessage());
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
     * Elimina un archivo del servidor FTP
     */
    public Map<String, Object> eliminarArchivo(String nombreArchivo) {
        Map<String, Object> resultado = new HashMap<>();
        FTPClient ftpClient = new FTPClient();

        try {
            // Conectar al servidor FTP
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USERNAME, FTP_PASSWORD);
            ftpClient.enterLocalPassiveMode();

            // Eliminar el archivo
            boolean eliminado = ftpClient.deleteFile(nombreArchivo);
            
            if (eliminado) {
                resultado.put("success", true);
                resultado.put("message", "Archivo eliminado exitosamente");
                resultado.put("archivo", nombreArchivo);
                resultado.put("timestamp", LocalDateTime.now());
            } else {
                resultado.put("success", false);
                resultado.put("error", "Error al eliminar el archivo o archivo no encontrado");
            }

        } catch (Exception e) {
            resultado.put("success", false);
            resultado.put("error", "Error al eliminar archivo: " + e.getMessage());
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