package com.servicio.datos.repository;

import com.servicio.datos.model.ActividadRequest;
import com.servicio.datos.rowmapper.ActividadRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ActividadRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<ActividadRequest> actividadRep() {
	  
    String query = "select codprov ,  tipocategoria  , actividad , descripcion from fichacatastral.tipoactividad where creador = 'dbo' and estareg = 1 "
    				+ " order by codprov ,  tipocategoria  , actividad";
    
    
    List<ActividadRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new ActividadRowMaper());
    return rows;
  }
}
