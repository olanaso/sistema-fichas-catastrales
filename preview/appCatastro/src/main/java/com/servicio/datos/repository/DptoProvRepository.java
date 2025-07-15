package com.servicio.datos.repository;

import com.servicio.datos.model.DptoProvRequest;
import com.servicio.datos.rowmapper.DptoProvRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class DptoProvRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<DptoProvRequest> ObtenerDepartamentosPrv(DptoProvRequest departamentosPrv) {
    String query = "select * from distritos   where coddpto ='" + 
      departamentosPrv.getCodpto() + "'" + 
      " and codprov ='" + departamentosPrv.getCodprov() + "' " + 
      " and estareg = 1";
    System.out.println("Query a ejecutar:" + query);
    List<DptoProvRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new DptoProvRowMaper());
    return rows;
  }
}
