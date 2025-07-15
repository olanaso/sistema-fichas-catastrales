package com.servicio.datos.util;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ftp.FTPClient;
//import org.hibernate.validator.internal.util.logging.LoggerFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;

/**
 * Obtener el valor del archivo de configuración Obtener el valor a través de la clave
 * @author Administrator
 *
 */
public class PropertiesUtil {
	private static Logger log=LoggerFactory.getLogger(PropertiesUtil.class);
	//
	//  private Logger logger = LoggerFactory.getLogger(com.servicio.datos.service.FTPServiceImpl.class);
	private static  Properties properties;
	private static final String name="application.properties";
	static {
		try {
			properties=new Properties();
			properties.load(new InputStreamReader(PropertiesUtil.class.getClassLoader().getResourceAsStream(name), "utf-8"));
		} catch (UnsupportedEncodingException e) {
		} catch (IOException e) {
			log.error("IOException"+e);
		}
	}
	
	public static String  getValue(String key) {
		String value=properties.getProperty(key).trim();
		if(value==null) {
			return	null;
		}
		return value;
	}
	
	
	public static String  getValue(String key,String defaultvalue) {
		String value=properties.getProperty(key).trim();
		if(value==null) {
			value=defaultvalue;
		}
		return value;
	}
}

