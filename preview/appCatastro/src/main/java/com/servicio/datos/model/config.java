package com.servicio.datos.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

public class config {

	 String pathPDF;
	  
	  String DataSourceClass;
	  
	  String DataSourceURL;
	  
	  String DataSourcePuerto;
	  
	  public config() {}
	  
	  public config(String pathPDF, String DataSourceClass, String DataSourceURL, String DataSourcePuerto) {
	    this.pathPDF = pathPDF;
	    this.DataSourceClass = DataSourceClass;
	    this.DataSourceURL = DataSourceURL;
	    this.DataSourcePuerto = DataSourcePuerto;
	  }
	  
	  public String getPathPDF() {
	    return this.pathPDF;
	  }
	  
	  public String getDataSourceClass() {
	    return this.DataSourceClass;
	  }
	  
	  public String getDataSourceURL() {
	    return this.DataSourceURL;
	  }
	  
	  public String getDataSourcePuerto() {
	    return this.DataSourcePuerto;
	  }
	  
	  public void setPathPDF(String pathPDF) {
	    this.pathPDF = pathPDF;
	  }
	  
	  public void setDataSourceClass(String DataSourceClass) {
	    this.DataSourceClass = DataSourceClass;
	  }
	  
	  public void setDataSourceURL(String DataSourceURL) {
	    this.DataSourceURL = DataSourceURL;
	  }
	  
	  public void setDataSourcePuerto(String DataSourcePuerto) {
	    this.DataSourcePuerto = DataSourcePuerto;
	  }
	  
}
