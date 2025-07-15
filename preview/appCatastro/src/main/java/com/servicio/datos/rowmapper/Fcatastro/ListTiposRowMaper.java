package com.servicio.datos.rowmapper.Fcatastro;

import com.servicio.datos.model.Fcatastro.ListTipoRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ListTiposRowMaper implements RowMapper {
	
  public ListTipoRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    
	  ListTipoRequest listTipoRequest = new ListTipoRequest();
	 
	  listTipoRequest.setCampo(rs.getString("campo"));
	  listTipoRequest.setCodigo(rs.getString("codigo"));
	  listTipoRequest.setDescripcion(rs.getString("descripcion"));
	  listTipoRequest.setTipo(rs.getString("tipo"));
	  

    return listTipoRequest;
  }
}


