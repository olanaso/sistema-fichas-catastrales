package com.servicio.datos.model;

import java.util.UUID;
import java.util.regex.Pattern;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

public class SecureToken {
public String generateToken(String idTercero){
		
		String key = UUID.randomUUID().toString().toUpperCase()+"|"+idTercero;
		StandardPBEStringEncryptor jsypt = new StandardPBEStringEncryptor();
		jsypt.setAlgorithm("PBEwithMD5AndDES");
		jsypt.setPassword("h3k6kb2l04hJKMB61048HGLpAM");
		String token = jsypt.encrypt(key);
		String sanitized1 = token.replaceAll("\\+", "@");
		String sanitized2 = sanitized1.replaceAll("\\/", "#");
		
		return sanitized2;
		
	}
	
	public boolean validateToken(String idTercero, String token){
		
		String ptoken = token.replaceAll("@","+");
		String stoken = ptoken.replaceAll("#","/");
		System.out.println(stoken);
		StandardPBEStringEncryptor jsypt = new StandardPBEStringEncryptor();
		jsypt.setAlgorithm("PBEwithMD5AndDES");
		jsypt.setPassword("h3k6kb2l04hJKMB61048HGLpAM");
		String unencrypted = jsypt.decrypt(stoken);
		final String[] tokens = unencrypted.split(Pattern.quote("|"));
		
		if(tokens[1].equals(idTercero)){
			
			return true;
			
		}else{
			
			return false;
			
		}
	}
}
