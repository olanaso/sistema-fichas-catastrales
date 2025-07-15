package com.servicio.datos.controller;


import com.servicio.datos.model.Response;
import com.servicio.datos.service.ParamaeService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.servicio.datos.model.ParamaeResponse;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import java.io.InputStream;

@RestController
public class FileFTPController {
	@Autowired
	private ParamaeService paramaeService;

	 
  @PostMapping({"datos/uploadFTP"})
  public Response uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
   
    Response empresaResponse = new Response();
    ParamaeResponse paramaeResponse = new ParamaeResponse();
    FTPClient ftp = new FTPClient();
    
    if (file == null || file.isEmpty()) {
      empresaResponse.setMessage("Por favor seleccione un archivo");
      empresaResponse.setSuccess(false);
      return empresaResponse;
    } 
    
    paramaeResponse= this.paramaeService.fijaruta();
    String ext_name = file.getOriginalFilename().substring(0, 4);
    String FTP_ADDRESS = paramaeResponse.getHost();
	String LOGIN = paramaeResponse.getUsuario();
	String PSW = paramaeResponse.getClave();
	int CRGIMG = paramaeResponse.getCargaimg();
   
    
	if(CRGIMG==1) {
		
		 if (ext_name.equals("CAT_")) {
			 
			 	ftp = new FTPClient();
				ftp.connect(FTP_ADDRESS);
				ftp.login(LOGIN, PSW);
				ftp.enterLocalPassiveMode(); 
				ftp.setFileType(FTP.BINARY_FILE_TYPE);
				
				boolean result = ftp.storeFile( file.getOriginalFilename(), file.getInputStream());
				InputStream inputStream = ftp.retrieveFileStream(file.getOriginalFilename());
				
				if(result!=false &&  inputStream!=null) {
					empresaResponse.setMessage("Archivo cargado correctamente");
				    empresaResponse.setSuccess(true);
				    ftp.logout();
					ftp.disconnect();
				}else {
					empresaResponse.setMessage("No existe Archivo");
				    empresaResponse.setSuccess(false);
				    ftp.logout();
					ftp.disconnect();
				}
			      return empresaResponse;
			      
			} 
		 if (ext_name.equals("BDM_")) {
		    	
		    	ftp = new FTPClient();
				ftp.connect(FTP_ADDRESS);
				ftp.login(LOGIN, PSW);
				ftp.enterLocalPassiveMode(); 
				ftp.setFileType(FTP.BINARY_FILE_TYPE);
				
				boolean result = ftp.storeFile("bd_lecturasMovil/" + file.getOriginalFilename(), file.getInputStream());
				InputStream inputStream = ftp.retrieveFileStream("/bd_lecturasMovil/"+file.getOriginalFilename());
				
				if(result!=false &&  inputStream!=null) {
					
					empresaResponse.setMessage("Archivo cargado correctamente");
				      empresaResponse.setSuccess(true);
				}else {
					empresaResponse.setMessage("No existe Archivo");
				      empresaResponse.setSuccess(false);
				}
					
				
			      return empresaResponse;
		    	
		    	
				} 
		} 

    empresaResponse.setMessage("Error en carga de Archivo");
    empresaResponse.setSuccess(false);
    return empresaResponse;
  }
  
  @PostMapping({"datos/verificaImagen"})
  public Response verificaImg(@RequestParam("file") String file) throws IOException {
   
    Response empresaResponse = new Response();
    ParamaeResponse paramaeResponse = new ParamaeResponse();
    FTPClient ftp = new FTPClient();
    
    if (file == null || file.isEmpty()) {
      empresaResponse.setMessage("Por favor seleccione un archivo");
      empresaResponse.setSuccess(false);
      return empresaResponse;
    } 
    
    paramaeResponse= this.paramaeService.fijaruta();
    String ruta=paramaeResponse.getRuta();
    String FTP_ADDRESS = paramaeResponse.getHost();
	String LOGIN = paramaeResponse.getUsuario();
	String PSW = paramaeResponse.getClave();
	int CRGIMG = paramaeResponse.getCargaimg();
   
    
	if(CRGIMG==1) {
			
		     
		
		ftp = new FTPClient();
		ftp.connect(FTP_ADDRESS);
		ftp.login(LOGIN, PSW);
		ftp.enterLocalPassiveMode(); 
		ftp.setFileType(FTP.BINARY_FILE_TYPE);

		try {
		    String filename = file;
		    String[] fileNames = ftp.listNames(filename);
		
		    if (fileNames != null && fileNames.length == 1) {
		        empresaResponse.setMessage("El archivo existe en el servidor FTP");
		        empresaResponse.setSuccess(true);
		    } else {
		        empresaResponse.setMessage("El archivo NO existe en el servidor FTP");
		        empresaResponse.setSuccess(false);
		    }
		} catch (IOException e) {
		    empresaResponse.setMessage("Error al verificar el archivo en el servidor FTP");
		    empresaResponse.setSuccess(false);
		}

	
		return empresaResponse;
		    
	}
	
	
    
    
    empresaResponse.setMessage("Error en busqueda de Archivo");
    empresaResponse.setSuccess(false);
    return empresaResponse;
  }
  
  
 

}
