package com.servicio.datos.repository.AppMovil;

import com.servicio.datos.model.AppMovil.LoginUsuariosAppMovilRequest;
import com.servicio.datos.model.AppMovil.LoginUsuariosAppMovilResponse;
import com.servicio.datos.rowmapper.LoginUsuariosAppMovilResponseRowMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class LoginUsuarioAppMovilRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public LoginUsuariosAppMovilResponse log_usu(LoginUsuariosAppMovilRequest log_usu) {
  
    StringBuilder sql = new StringBuilder();
    sql.append("DECLARE @EMAIL VARCHAR(60)");
    sql.append("DECLARE @CELULAR VARCHAR(9)");
    sql.append("DECLARE @CLAVE VARCHAR(32)");
    sql.append("SET @EMAIL = '" + log_usu.getEmail() + "'");
    sql.append("SET @CELULAR = '" + log_usu.getNrocelular() + "' ");
    sql.append("SET @CLAVE  = '" + log_usu.getClave() + "' ");
    sql.append("select idusuario,codcliente,nombres,apellidos,tipodocumento,numerodocumento,email,nrocelular,recibodigital,recibirNotificaciones,estadoregistro ");
    sql.append("from usuarios_ovirtual where ( email like @EMAIL or nrocelular like @CELULAR ) and clave = @CLAVE and estadousuario = '2' and estadoregistro in(0,1)");
  
    
    List<LoginUsuariosAppMovilResponse> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new LoginUsuariosAppMovilResponseRowMapper());
    return rows.get(0);
  }
}
