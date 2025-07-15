
 package com.app.catastro.exception;
 
 import org.springframework.dao.DataAccessException;
 
 public class RepositorioExcepcion extends DataAccessException {
   public RepositorioExcepcion(String message) {
/* 9 */     super(message);
   }
 }


