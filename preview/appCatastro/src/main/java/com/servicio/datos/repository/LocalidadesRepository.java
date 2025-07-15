package com.servicio.datos.repository;

import com.servicio.datos.model.LocalidadesRequest;
import com.servicio.datos.rowmapper.LocalidadesRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class LocalidadesRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<LocalidadesRequest> ObtenerLocalidad(LocalidadesRequest localidades) {
    String query = "select codsuc ,nombre  from sucursales   where codemp ='" + 
      
      localidades.getCodsuc() + "' and estareg = 1";
    
    
    //
    System.out.println("Query a ejecutar:" + query);
    List<LocalidadesRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new LocalidadesRowMaper());
    return rows;
  }
}
