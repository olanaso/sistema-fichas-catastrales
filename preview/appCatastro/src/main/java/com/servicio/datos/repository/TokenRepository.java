package com.servicio.datos.repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TokenRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  //Timestamp timestamp =new Timestamp(System.currentTimeMillis()); //Timestamp.from(Instant.now());
  //LocalDateTime fechaActual = LocalDateTime.now();
  
  private static Logger logger = LoggerFactory.getLogger(com.servicio.datos.repository.TokenRepository.class);
  
  public boolean buscarTokenValido(String token, Integer tiempoToken) {
    boolean respuesta = false;
    try {
      logger.info("INGRESA BUSCAR TOKEN ");
      
      StringBuilder sql = new StringBuilder();
      /*sql.append("SELECT coalesce(MAX(key2),'') FROM fichacatastral.tbl_token ");
      sql.append("WHERE key2='" + token + "'");
      sql.append("AND timestamp >= dateadd(ss, -" + tiempoToken + ",getdate())");*/
      
      sql.append("SELECT COALESCE(MAX(key2), '') FROM fichacatastral.tbl_token ");
      sql.append("WHERE key2 = '" + token + "' ");
      sql.append("AND \"timestamp\" >= NOW() - INTERVAL '" + tiempoToken + " seconds'");
      
      
      String tokenR = (String)this.jdbcTemplate.queryForObject(sql.toString(), String.class);
      if (!tokenR.trim().equals(""))
        respuesta = true; 
      return respuesta;
    } catch (Exception ex) {
      logger.error("ERROR AL BUSCAR TOKEN");
      throw ex;
    } 
  }
  
  public void registrarToken(String token) {
    logger.info("INGRESA REGISTRAR TOKEN");
    try {
      StringBuilder sql = new StringBuilder();
     /* sql.append("INSERT INTO fichacatastral.tbl_token(");
      sql.append("key2, timestamp)");
      sql.append(" values('" + token + "',"+ new Timestamp(System.currentTimeMillis())+"");*/
      sql.append("INSERT INTO fichacatastral.tbl_token(key2, \"timestamp\") VALUES ('");
      sql.append(token);
      sql.append("', '");
      sql.append(new Timestamp(System.currentTimeMillis())); // Conversión correcta
      sql.append("')");
      this.jdbcTemplate.update(sql.toString());
    } catch (Exception e) {
      logger.error("ERROR AL REGISTRAR TOKEN: " + e.getMessage());
      throw e;
    } 
  }
}
