package com.servicio.datos.repository;

import com.servicio.datos.model.CuentaLoginRequest;
import com.servicio.datos.rowmapper.CuentaLoginRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CuentaLoginRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<CuentaLoginRequest> ObtenerLogin(CuentaLoginRequest login) {
    String query = "select codsede, codinspector,nombres, dni,fechareg,login,clave,asignadoareclamos,asignadoalectura,asignadoacortes,asignadocatastroreal,"
    		+ "  asignadocatastro, "
    		+ "asignadoinspecciones, "
    		+ "asignadoconsultas, "
    		+ " supervisor, codemp,codsede, estareg , "
    		+ "asignadoareapertura, "
    		+ "asignadoanotificaciones, "
    		+ "asignadoparquemedidores, "
    		+ "asignadofactibilidad, "
    		+ "asignadoincidenciacampo, "
    		+ "asignadoordendepago, "
    		+ "asignadoentregarecibo, "
    		+ "asignadoalcencegeneral "
    		+ "from fichacatastral.inspectores "
    		+ "  where login is not null and estareg = 1 and   login like'" +  
      login.getLogin() + "' and clave like'" + login.getClave() + "' and codsede='" + login.getCodsede() + "'  " + 
      "  order by codsede , codinspector";
    System.out.println("Query a ejecutar:" + query);
    List<CuentaLoginRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new CuentaLoginRowMaper());
    return rows;
  }
}

