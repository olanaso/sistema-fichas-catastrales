package com.servicio.datos.service;

//import com.servicio.datos.util.FTPErrors;
import java.io.File;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileServiceAPI {
  void save(MultipartFile paramMultipartFile) throws Exception;
  
  Resource load(String paramString) throws Exception;
  
  void save(List<MultipartFile> paramList) throws Exception;
  
  Stream<Path> loadAll() throws Exception;
  /*
  void connectToFTP(String paramString1, String paramString2, String paramString3) throws FTPErrors;
  
  void uploadFileToFTP(File paramFile, String paramString1, String paramString2) throws FTPErrors;
  
  void downloadFileFromFTP(String paramString1, String paramString2) throws FTPErrors;
  
  void disconnectFTP() throws FTPErrors;*/
}
