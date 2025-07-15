package com.servicio.datos.rowmapper.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class FichaCatastralMovilRowMaper implements RowMapper {
	
	 public FichaCatastralMovilResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		    

	   
		 FichaCatastralMovilRequest fichaCatastralMovilRequest = new FichaCatastralMovilRequest();
		  
		  return  null;
	  }
}
