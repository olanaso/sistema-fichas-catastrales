package com.servicio.datos.util;

import java.security.MessageDigest;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.tomcat.util.codec.binary.Base64;


public class UtilSecurity {

	public static String DecryptMD5(String secretKey, String cadenaEncryptada) throws Exception {
		String cadenaDesencryptada="";
		try{
			byte[] message=Base64.decodeBase64(cadenaEncryptada.getBytes("utf-8"));
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] digestOfPassword = md5.digest(secretKey.getBytes("utf-8"));
			byte[] keyBytes = Arrays.copyOf(digestOfPassword,24);
			SecretKey key=new SecretKeySpec(keyBytes,"DESede");
			Cipher decipher = Cipher.getInstance("DESede");
			decipher.init(Cipher.DECRYPT_MODE,key);
			byte[] plainText = decipher.doFinal(message);
			cadenaDesencryptada = new String(plainText,"UTF-8");
		}catch(Exception ex){
			throw ex;
		}
		return cadenaDesencryptada;
	}
	
	public static String EncryptMD5(String secretKey, String cadena) throws Exception {
		String cadenaEncryptada="";
		try{
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] llavePassword = md5.digest(secretKey.getBytes("utf-8"));
			byte[] BytesKey = Arrays.copyOf(llavePassword,24);
			SecretKey key = new SecretKeySpec(BytesKey, "DESede");
			Cipher cifrado = Cipher.getInstance("DESede");
			cifrado.init(Cipher.ENCRYPT_MODE, key);
			byte[] plainTextBytes = cadena.getBytes("utf-8");
			byte[] buf = cifrado.doFinal(plainTextBytes);
			byte[] base64Bytes = Base64.encodeBase64(buf);
			cadenaEncryptada=new String(base64Bytes);
		}catch(Exception ex){
			System.out.println("Error al encriptar clave:" +  ex.getMessage());
			throw ex;
		}
		return cadenaEncryptada;
	}
}
