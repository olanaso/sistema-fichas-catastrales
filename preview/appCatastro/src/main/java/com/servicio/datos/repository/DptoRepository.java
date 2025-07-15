package com.servicio.datos.repository;

import com.servicio.datos.model.DptoRequest;
import com.servicio.datos.rowmapper.DptoRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class DptoRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<DptoRequest> ObtenerDepartamentos(DptoRequest departamentos) {
    String query = "select * from provincias   where coddpto ='" + 
      
      departamentos.getCodpto() + "' and estareg = 1";
    System.out.println("Query a ejecutar:" + query);
    List<DptoRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new DptoRowMaper());
    return rows;
  }
}
