package com.servicio.datos.repository;

import com.servicio.datos.model.Usuario;
import com.servicio.datos.model.UsuarioResponse;
import com.servicio.datos.rowmapper.UsuarioResponseRowMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<UsuarioResponse> ObtenerUsuario(Usuario usuario) {
    StringBuilder sql = new StringBuilder();
    sql.append("select u.codusu,u.apellidopa,u.apellidoma,u.nombre");
    sql.append(" from fichacatastral.gruposusuarios_sedeoperacional as gs");
    sql.append(" INNER JOIN fichacatastral.usersystema  as  u on u.codusu=gs.codusu ");
    sql.append(" INNER JOIN fichacatastral.sedeoperacional as so ON gs.codsede=so.codsede AND gs.codemp=so.codemp ");
    sql.append(" WHERE gs.codemp='001' and  gs.codsede='001' and gs.estareg=1 and u.codusu='" + usuario.getUsuario() + "' and u.estareg=1 AND u.password = '" + usuario.getClave() + "' ");
    List<UsuarioResponse> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new UsuarioResponseRowMapper());
    return rows;
  }//gs.codsede like '%'  //lo normal gs.codsede='001'
}
