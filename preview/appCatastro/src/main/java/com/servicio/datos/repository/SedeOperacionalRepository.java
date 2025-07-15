package com.servicio.datos.repository;

import com.servicio.datos.model.SedeOperacionalRequest;
import com.servicio.datos.rowmapper.SedeOperacionalRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class SedeOperacionalRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<SedeOperacionalRequest> ObtenerSede(SedeOperacionalRequest sede) {
    String query = "select codemp,codsede,nombre from fichacatastral.sedeoperacional where estareg = 1";
    System.out.println("Query a ejecutar:" + query);
    List<SedeOperacionalRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new SedeOperacionalRowMaper());
    return rows;
  }
}
