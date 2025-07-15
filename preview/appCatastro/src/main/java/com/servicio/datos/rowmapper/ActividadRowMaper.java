package com.servicio.datos.rowmapper;

import com.servicio.datos.model.ActividadRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ActividadRowMaper implements RowMapper {
	
  public ActividadRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
	  
	  ActividadRequest actividadRequest = new ActividadRequest();
    
	  actividadRequest.setCodprov(rs.getString("codprov"));
    actividadRequest.setTipocategoria(rs.getString("tipocategoria"));
    actividadRequest.setActividad(rs.getString("actividad"));
    actividadRequest.setDescripcion(rs.getString("descripcion"));
    
    return actividadRequest;
  }
}
