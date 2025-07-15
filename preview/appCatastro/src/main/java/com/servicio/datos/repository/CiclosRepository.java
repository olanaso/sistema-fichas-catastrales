package com.servicio.datos.repository;

import com.servicio.datos.model.CiclosRequest;
import com.servicio.datos.rowmapper.CiclosRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CiclosRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<CiclosRequest> ObtenerCiclos(CiclosRequest ciclos) {
    String query = " select "
    		+ " codemp,"
    		+ " codciclo,"
    		+ " 'descripcion' = (select descripcion from ciclo where  ciclo.codciclo = tx.codciclo ),"
    		+ " 'anio' = left(periodo ,4 ) , "
    		+ " 'mes' = right(periodo ,2 ) ,"
    		+ " 'anio_del' = isnull(left(periodofac ,4 ), '0000') ,"
    		+ " 'mes_del'  = isnull(right(periodofac, 2), '00')"
    		+ "  FROM "
    		+ "  (select "
    		+ "   codemp ,"
    		+ "   codciclo , "
    		+ "   max(anio+mes) as periodo,"
    		+ "   max((select max(anio+mes) "
    		+ "   from factarch where controlfact.codciclo = factarch .codciclo and controlfact.facturado = 0 )) as periodofac "
    		+ "   from controlfact "
    		+ "   group by codemp , codciclo) as tx  "
    		+ "  order by codemp , codciclo";
    
    System.out.println("Query a ejecutar:" + query);
    List<CiclosRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new CiclosRowMaper());
    return rows;
  }
}

// String query = "select codemp,codciclo,'descripcion' = (select descripcion from ciclo where  ciclo.codciclo = tx.codciclo ),'anio' = left(periodo ,4 ) , 'mes' = right(periodo ,2 ) FROM (select  codemp ,codciclo ,  max(anio+mes) as periodo  from controlfact group by codemp , codciclo) as tx   order by codemp , codciclo ";


/*

* select 
codemp,
codciclo,
'descripcion' = (select descripcion from ciclo where  ciclo.codciclo = tx.codciclo ),
'anio' = left(periodo ,4 ) , 
'mes' = right(periodo ,2 ) ,
'anio_del' = isnull(left(periodofac ,4 ), '0000') , 
'mes_del'  = isnull(right(periodofac, 2), '00')
FROM 
(
   select
   codemp ,
   codciclo , 
   max(anio+mes) as periodo,
   max((select max(anio+mes) from factarch where controlfact.codciclo = factarch .codciclo and controlfact.facturado = 0 )) as periodofac 
   from controlfact 
   group by codemp , codciclo  
) as tx
order by codemp , codciclo



select  codemp, codciclo, 'descripcion' = (select descripcion from ciclo where  ciclo.codciclo = tx.codciclo ), 'anio' = left(periodo ,4 ) ,  'mes' = right(periodo ,2 ) , 'anio_del' = isnull(left(periodofac ,4 ), '0000') , 'mes_del'  = isnull(right(periodofac, 2), '00')  FROM   select    codemp ,   codciclo ,    max(anio+mes) as periodo,   max((select max(anio+mes)    from factarch where controlfact.codciclo = factarch .codciclo and controlfact.facturado = 0 )) as periodofac    from controlfact    group by codemp , codciclo) as tx    order by codemp , codciclo

* */
