package com.servicio.datos.repository;

import com.servicio.datos.model.UrbanizacionVO;
import com.servicio.datos.rowmapper.UrbanizacionRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UrbanizacionRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<UrbanizacionVO> Urban(UrbanizacionVO urbanizacion) {
    String pp = new String(urbanizacion.getCodurbaso());
    String res = "";
    String cadena1 = new String("ALL");
    if (pp.equals(cadena1)) {
      res = "%";
    } else {
      res = urbanizacion.getCodurbaso();
    } 
       String query="SELECT codsuc,codurbaso,"
    		+ "TRIM(COALESCE(urbanmae.tipourba, '') || ' ' || urbanmae.descripcionurba) AS descripcion "
    		+ "FROM fichacatastral.urbanmae "
    		+ "WHERE codsuc LIKE '" + urbanizacion.getCodsuc() + "' "
    		+ "  AND codurbaso LIKE '" + res + "' "
    		+ "  AND estareg = 1";
    
    System.out.println("Query a ejecutar:" + query);
    List<UrbanizacionVO> rows = this.jdbcTemplate.query(query, (RowMapper)new UrbanizacionRowMaper());
    return rows;
  }
}
