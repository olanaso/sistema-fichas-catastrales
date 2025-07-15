package com.servicio.datos.rowmapper;

import com.servicio.datos.model.InspectoresRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class InspectoresRowMaper implements RowMapper {
  public InspectoresRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    InspectoresRequest inspectoresRequest = new InspectoresRequest();
    inspectoresRequest.setCodsede(rs.getString("codsede"));
    inspectoresRequest.setCodinspector(rs.getString("codinspector"));
    inspectoresRequest.setNombres(rs.getString("nombres"));
    inspectoresRequest.setDni(rs.getString("dni"));
    inspectoresRequest.setFechareg(rs.getString("fechareg"));
    inspectoresRequest.setLogin(rs.getString("login"));
    inspectoresRequest.setClave(rs.getString("clave"));
    inspectoresRequest.setAsignadoareclamos(rs.getString("asignadoareclamos"));
    inspectoresRequest.setAsignadoalectura(rs.getString("asignadoalectura"));
    inspectoresRequest.setAsignadoacortes(rs.getString("asignadoacortes"));
    inspectoresRequest.setAsignadocatastro(rs.getString("asignadocatastro"));
    inspectoresRequest.setAsignadoinspecciones(rs.getString("asignadoinspecciones"));
    inspectoresRequest.setAsignadoconsultas(rs.getString("asignadoconsultas"));
    inspectoresRequest.setSupervisor(rs.getString("supervisor"));
    inspectoresRequest.setCodemp(rs.getString("codemp"));
    inspectoresRequest.setCodsede1(rs.getString("codsede"));
    inspectoresRequest.setEstareg(rs.getString("estareg"));
    inspectoresRequest.setAsignadocatastroreal(rs.getString("asignadocatastroreal"));
    
    
    return inspectoresRequest;
  }
}
