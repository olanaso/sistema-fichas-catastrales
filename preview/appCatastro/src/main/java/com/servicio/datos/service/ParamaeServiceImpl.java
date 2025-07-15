package com.servicio.datos.service;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.servicio.datos.model.ParamaeResponse;

import com.servicio.datos.rowmapper.ParamaeRowMaper;

@Service
public class ParamaeServiceImpl implements ParamaeService {

  
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public ParamaeResponse fijaruta() {
 
 
  
   String   detalleRegistro ="SELECT * FROM fichacatastral.view_ftp";
   
     
    List<ParamaeResponse> rows = this.jdbcTemplate.query(detalleRegistro, (RowMapper)new ParamaeRowMaper());
    return rows.get(0);
  }
}
