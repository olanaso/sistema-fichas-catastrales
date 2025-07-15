package com.servicio.datos.rowmapper;

import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.SedeOperacionalRequest;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class SedeOperacionalRowMaper implements RowMapper {
	
	public SedeOperacionalRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
	    SedeOperacionalRequest sedeOperacionalRequest = new SedeOperacionalRequest();
	    sedeOperacionalRequest.setCodemp(rs.getString("codemp"));
	    sedeOperacionalRequest.setCodsede(rs.getString("codsede"));
	    sedeOperacionalRequest.setNombre(rs.getString("nombre"));
	    return sedeOperacionalRequest;
	  }
    
    

    

}
