package com.servicio.datos.rowmapper;


import com.servicio.datos.model.ParamaeResponse;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ParamaeRowMaper implements RowMapper {
	
  public ParamaeResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
	  ParamaeResponse paramaeResponse = new ParamaeResponse();
	  paramaeResponse.setRuta(rs.getString("RUTA"));
	  paramaeResponse.setUsuario(rs.getString("USUARIO"));
	  paramaeResponse.setHost(rs.getString("HOST"));
	  paramaeResponse.setClave(rs.getString("PAS"));
	  paramaeResponse.setCargaimg(rs.getInt("CARGAIMG"));
    return paramaeResponse;
  }
}
