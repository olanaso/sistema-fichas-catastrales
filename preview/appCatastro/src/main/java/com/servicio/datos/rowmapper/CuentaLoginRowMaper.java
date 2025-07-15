package com.servicio.datos.rowmapper;

import com.servicio.datos.model.CuentaLoginRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class CuentaLoginRowMaper implements RowMapper {
  public CuentaLoginRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    CuentaLoginRequest cuentaLoginRequest = new CuentaLoginRequest();
    cuentaLoginRequest.setCodsede(rs.getString("codsede"));
    cuentaLoginRequest.setCodinspector(rs.getString("codinspector"));
    cuentaLoginRequest.setNombres(rs.getString("nombres"));
    cuentaLoginRequest.setDni(rs.getString("dni"));
    cuentaLoginRequest.setFechareg(rs.getString("fechareg"));
    cuentaLoginRequest.setLogin(rs.getString("login"));
    cuentaLoginRequest.setClave(rs.getString("clave"));
    cuentaLoginRequest.setAsignadoareclamos(rs.getString("asignadoareclamos"));
    cuentaLoginRequest.setAsignadoalectura(rs.getString("asignadoalectura"));
    cuentaLoginRequest.setAsignadoacortes(rs.getString("asignadoacortes"));
    cuentaLoginRequest.setAsignadocatastro(rs.getString("asignadocatastro"));
    //cuentaLoginRequest.setAsignadocatastro(rs.wasNull() ? null : String.valueOf(rs.getInt("asignadocatastro")));
    cuentaLoginRequest.setAsignadoinspecciones(rs.getString("asignadoinspecciones"));
    cuentaLoginRequest.setAsignadoareapertura(rs.getString("asignadoareapertura"));
    cuentaLoginRequest.setAsignadoconsultas(rs.getString("asignadoconsultas"));
    cuentaLoginRequest.setSupervisor(rs.getString("supervisor"));
    cuentaLoginRequest.setCodemp(rs.getString("codemp"));
    cuentaLoginRequest.setCodsede1(rs.getString("codsede"));
    cuentaLoginRequest.setEstareg(rs.getString("estareg"));
    cuentaLoginRequest.setAsignadocatastroreal(rs.getString("asignadocatastroreal"));
    cuentaLoginRequest.setAsignadoentregarecibo(rs.getString("asignadoentregarecibo"));
    
    
    
    
    
    return cuentaLoginRequest;
  }
}
