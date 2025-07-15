package com.servicio.datos.service;

import com.servicio.datos.service.FileServiceAPI;
/*import com.servicio.datos.util.ErrorMessage;
import com.servicio.datos.util.FTPErrors;*/
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;
import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ProtocolCommandListener;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileServiceAPI {
  FTPClient ftpconnection;
  
  private Logger logger = LoggerFactory.getLogger(com.servicio.datos.service.FileServiceImpl.class);
  
  private final Path rootFolder = Paths.get("uploads", new String[0]);
  
  public void save(MultipartFile file) throws Exception {
    Files.copy(file.getInputStream(), this.rootFolder.resolve(file.getOriginalFilename()), new java.nio.file.CopyOption[0]);
  }
  
  public Resource load(String name) throws Exception {
    Path file = this.rootFolder.resolve(name);
    return (Resource)new UrlResource(file.toUri());
  }
  
  public void save(List<MultipartFile> files) throws Exception {
    for (MultipartFile file : files)
      save(file); 
  }
  
  public Stream<Path> loadAll() throws Exception {
    return Files.walk(this.rootFolder, 1, new java.nio.file.FileVisitOption[0]).filter(path -> !path.equals(this.rootFolder)).map(this.rootFolder::relativize);
  }
  /*
  public void connectToFTP(String host, String user, String pass)  {
    this.ftpconnection = new FTPClient();
    this.ftpconnection.addProtocolCommandListener((ProtocolCommandListener)new PrintCommandListener(new PrintWriter(System.out)));
    try {
      this.ftpconnection.connect(host);
    } catch (IOException e) {
      ErrorMessage errorMessage = new ErrorMessage(-1, "No fue posible conectarse al FTP a travdel host=" + host);
      this.logger.error(errorMessage.toString());
      throw new FTPErrors(errorMessage);
    } 
    int reply = this.ftpconnection.getReplyCode();
    if (!FTPReply.isPositiveCompletion(reply))
      try {
        this.ftpconnection.disconnect();
      } catch (IOException e) {
        ErrorMessage errorMessage = new ErrorMessage(-2, "No fue posible conectarse al FTP, el host=" + host + " entregla respuesta=" + reply);
        this.logger.error(errorMessage.toString());
        throw new FTPErrors(errorMessage);
      }  
    try {
      this.ftpconnection.login(user, pass);
    } catch (IOException e) {
      ErrorMessage errorMessage = new ErrorMessage(-3, "El usuario=" + user + ", y el pass=**** no fueron vpara la autenticaci);
      this.logger.error(errorMessage.toString());
      throw new FTPErrors(errorMessage);
    } 
    try {
      this.ftpconnection.setFileType(2);
    } catch (IOException e) {
      ErrorMessage errorMessage = new ErrorMessage(-4, "El tipo de dato para la transferencia no es v);
      this.logger.error(errorMessage.toString());
      throw new FTPErrors(errorMessage);
    } 
    this.ftpconnection.enterLocalPassiveMode();
  }
  
  public void uploadFileToFTP(File file, String ftpHostDir, String serverFilename)  {
    try {
      InputStream input = new FileInputStream(file);
      this.ftpconnection.storeFile(String.valueOf(ftpHostDir) + serverFilename, input);
    } catch (IOException e) {
      ErrorMessage errorMessage = new ErrorMessage(-5, "No se pudo subir el archivo al servidor.");
      this.logger.error(errorMessage.toString());
      throw new FTPErrors(errorMessage);
    } 
  }
  
  public void downloadFileFromFTP(String ftpRelativePath, String copytoPath) throws FTPErrors {
    FileOutputStream fos;
    try {
      fos = new FileOutputStream(copytoPath);
    } catch (FileNotFoundException e) {
      ErrorMessage errorMessage = new ErrorMessage(-6, "No se pudo obtener la referencia a la carpeta relativa donde guardar, verifique la ruta y los permisos.");
      this.logger.error(errorMessage.toString());
      throw new FTPErrors(errorMessage);
    } 
    try {
      this.ftpconnection.retrieveFile(ftpRelativePath, fos);
    } catch (IOException e) {
      ErrorMessage errorMessage = new ErrorMessage(-7, "No se pudo descargar el archivo.");
      this.logger.error(errorMessage.toString());
      throw new FTPErrors(errorMessage);
    } 
  }
  
  public void disconnectFTP() throws FTPErrors {
    if (this.ftpconnection.isConnected())
      try {
        this.ftpconnection.logout();
        this.ftpconnection.disconnect();
      } catch (IOException f) {
        throw new FTPErrors(new ErrorMessage(-8, "Ha ocurrido un error al realizar la desconexidel servidor FTP"));
      }  
  }*/
}
