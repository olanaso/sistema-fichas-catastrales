package com.servicio.datos.repository;

import com.servicio.datos.model.CalleRequest;
import com.servicio.datos.rowmapper.CalleRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CalleRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<CalleRequest> ObtenerCalle(CalleRequest calles) {
    String codcalle = new String(calles.getCodcalle());
    String resultado = "";
    String valor = new String("ALL");
    if (codcalle.equals(valor)) {
      resultado = ">=0";
    } else {
      resultado = "=" + calles.getCodcalle();
    } 
   /* String query = "select codsuc ,codcalle ,'descripcioncalle'=tipocalle.descripcioncorta +' '+ calles.descripcioncalle  from fichacatastral.calles  inner join fichacatastral.tipocalle on calles.codemp=tipocalle.codemp and calles.tipocalle=tipocalle.tipocalle where codsuc like '" + 
      
      calles.getCodsuc() + "' and codcalle" + resultado + "  order by calles.descripcioncalle";*/
    
    String query = "SELECT codsuc, codcalle,tipocalle.descripcioncorta || ' ' || calles.descripcioncalle AS descripcioncalle FROM fichacatastral.calles INNER JOIN fichacatastral.tipocalle " 
		 + "   ON calles.codemp = tipocalle.codemp AND calles.tipocalle = tipocalle.tipocalle "  
		+ "WHERE codsuc LIKE '" + calles.getCodsuc() + "' "
		+ "   AND codcalle " + resultado + "  "
		+ "ORDER BY calles.descripcioncalle";
    
    System.out.println("Query a ejecutar:" + query);
    List<CalleRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new CalleRowMaper());
    return rows;
  }
}
