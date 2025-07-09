const express = require('express');
const { DBFFile } = require('dbffile');
const alasql = require('alasql');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// 📁 Ruta base de los .DBF
const dbfBasePath = "C:\\Users\\Gamers\\Music\\sisfichas\\sistema-fichas-catastrales\\extraccion\\sici_cusco\\SICI\\CATASTRO";

// Buscar todos los archivos .dbf de forma recursiva
function encontrarArchivosDBF(dir) {
  let archivos = [];
  for (const item of fs.readdirSync(dir)) {
    const ruta = path.join(dir, item);
    if (fs.statSync(ruta).isDirectory()) {
      archivos = archivos.concat(encontrarArchivosDBF(ruta));
    } else if (item.toLowerCase().endsWith('.dbf')) {
      archivos.push(ruta);
    }
  }
  return archivos;
}

// Sanitizar nombres para usarlos como tabla SQL
function limpiarNombre(nombreOriginal) {
  let limpio = nombreOriginal.toLowerCase().replace(/[^a-z0-9_]/gi, '_');
  if (/^\d/.test(limpio)) limpio = 't_' + limpio;
  return limpio;
}

// Cargar todos los .dbf y crear tablas en alasql
async function cargarTodosDBF() {
 const archivosDBF = {
  conexion: "CONEXION.DBF",
  regloc: "REGLOC.DBF",
  regzon: "REGZON.DBF",
  rzcalle: "RZCALLE.DBF",
  rlurba: "RLURBA.DBF",
  tresev: "TRESEV.DBF",
  tabsag: "TABSAG.DBF",
  esclte: "ESCLTE.DBF",
  tipser: "TIPSER.DBF",
  estpre: "ESTPRE.DBF",
  coagua: "COAGUA.DBF",
  dicoag: "DICOAG.DBF",
  matcja: "MATCJA.DBF",
  estcon: "ESTCON.DBF",
  ubimed: "UBIMED.DBF",
  codesa: "CODESA.DBF",
  dicode: "DICODE.DBF",

  // Nuevas tablas agregadas desde la consulta SQL
  uniduso: "UNIDUSO.DBF",
  categ: "CATEG.DBF",
  sbcate: "SBCATE.DBF",
  taryfa: "TARYFA.DBF",
  tipten: "TIPTEN.DBF",
  usoinm: "USOINM.DBF"
};


  for (const [nombreTabla, nombreArchivo] of Object.entries(archivosDBF)) {
    const archivoPath = path.join(dbfBasePath, nombreArchivo);
    const nombreLimpio =nombreTabla;// limpiarNombre(nombreTabla);

    try {
      console.log(`📥 Cargando ${nombreArchivo} como tabla ${nombreLimpio}...`);
      const dbf = await DBFFile.open(archivoPath, { encoding: 'latin1' });

      // Verificar si tiene campos no soportados
      const camposInvalidos = dbf.fields.filter(f => !['C', 'N', 'L', 'D', 'F', 'M'].includes(f.type));
      if (camposInvalidos.length > 0) {
        console.warn(`⚠️  Saltando ${nombreArchivo}: campos no soportados: ${camposInvalidos.map(f => f.name + ' (' + f.type + ')').join(', ')}`);
        continue;
      }

      const registros = await dbf.readRecords();

      alasql(`CREATE TABLE ${nombreLimpio}`);
      alasql.tables[nombreLimpio].data = registros;

      console.log(`✅ ${nombreArchivo} cargado como ${nombreLimpio}`);
    } catch (err) {
      console.warn(`❌ Error cargando ${nombreArchivo}: ${err.message}`);
    }
  }
}



// API: Listar todas las tablas
app.get('/tablas', (req, res) => {
  res.json(Object.keys(alasql.tables));
});

// API: Mostrar datos de una tabla
app.get('/tabla/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  if (!alasql.tables[nombre]) {
    return res.status(404).json({ error: 'Tabla no encontrada' });
  }
  const datos = alasql(`SELECT * FROM ${nombre} LIMIT 100`);
  res.json(datos);
});

app.get('/padron-sici', (req, res) => {
  try {
         console.log(`Api -> adron-sici`);
    const resultado = alasql(`
     SELECT a.preregion,b.regdes as provincia,a.prezona,c.zondes as sucursal,a.presector as sector,a.premzn as manzana,a.prelote as lote,a.presublote as sublote,a.INSCRINRO as suministro,;
a.PRECALLE,d.caltip,d.caldes as calle,'' as cuadra,ALLTRIM(STR(a.prenro) +"_" + a.PreMuni) as nro_muni,'' as mz_muni,'' as lt_muni, ;
a.PreUrba,e.urbtip,e.urbdes as urbanizacion, a.CodEstPre as tipoconstruccion ,qg.desestpre as tipo_construccion, a.PreinmPis as piso, a.CodTipSer ,l.destipser as tipo_servicio,a.CodAbasAg,g.desabasag as tipo_abastecimiento,IIF(a.Preredagu=1,"Con piscina","sin PISCINA"),;
a.CodTipRes,f.destipres as tipo_reservorio,a.CodEsClte,k.desesclte as tipo_usuarioa, a.CLINOMX as cliente,a.Clirucx as ruc,' ' as nro_habitantes, '' as tiporesponsable,'' as tipo_responsable, a.Clitelx as telefono ,;
' ' as nro_contrato, n.ConEstado,q.conestdes as estado_servicio,'' as pavconagu_a,'' as pavimentacion, '' as vereda_a, '' as vereda, n.ConDiaCod,h.condiades as diametro , n.ConMateri,p.cajmatdes as tipo_material,;
' ' as tipoingreso,' ' as tipo_de_ingreso,' ' as caja_con_agua, n.ConCajMat,o.cajmatdes as material_caja,n.ConUbiCaj as loccaja_a,r.ubicajdes as localizacion_caja,;
' ' as estadocaja_a,' ' as estado_caja,' ' as con_tapa_agua,' ' as tipotapa_a, ' ' as material_tapa,'' as esttapa_a,'' as estado_tapa,' ' as llavemed,' ' as llaves,;
' ' as posicionmed,' ' as posicion_medidor,' ' as tipocorte_a,' ' as tipo_corte,' ' as tipocerrado,' ' as razon_corte,' ' as tipofugas_a,' ' as fugas,;
' ' as tipocajaobserv,' ' as caja_observacion,' ' as tiene_medidor,a.Mednrox as medidor , '' as lectura_medidor,n.MedFecIni as fecha_instalacion, '' as marcamed,'' as marca,;
 n.Condiacod,j.condiades as diametro_medidor, ' ' as lectura, ' ' as tipo_facturacion,' ' as tipolectura,' ' as tipo_lectura, ' ' as estadomed, ' ' as estado_medidor,' ' as operativo,; 
 qs.condestad,qd.conestdes as situacion_desague, qs.condidcod,qf.condiddes as diametro_d,qs.conmatdes,qb.cajmatdes as tipo_material_d, '' as con_caja_desague, qs.concajmde,qc.cajmatdes as caja_d,;
 qs.CondUbiCa as cod_ubica,qe.ubicajdes as localizacion_desague,;
' ' as estadocaja_d,' ' as estado_caja,' ' as con_tapa_desague, ' ' as tipotapa_d, ' ' as tapa_d, ' ' as tapa_d,' ' as estado_tapa,' ' as tipofugas_d ,' ' as fugas_d,;
 ' ' as presionagu, ' ' as presion_agua,' ' as ficha_incompleta, ' ' as fichaincompleta, ' ' as motivo,;
 ' ' as tipoacccomercial,' ' as accion_comercial,' ' as encuestador,' ' as nombres,' ' as usermodificador,' ' as nombres,' ' as fecha_modificacion,' ' as creador,' ' as nombres,;
 ' ' as fechareg, ' ' as estado,' ' as fecharegistro , ' ' as fichaaprobada, ' ' as fechaaprobacion,' ' as idficha,a.ConUsoCan as cant_uso,a.Contra,a.reprutrep,a.conrutlec,a.ConTipMul,IIF(a.ConTipMul=0,"conexión normal",IIF(a.ConTipMul= 1,"medición_múltiple_principal", IIF(a.ConTipMul= 2,"medición_múltiple_secundario"," "))) ,a.ConTipUlt;
FROM conexion as a ;
left join regloc as b ON(b.regcod=a.preregion);
left join regzon as c ON(c.regcod=a.preregion and c.zoncod=a.prezona);
left join rzcalle as d ON(d.regcod=a.preregion and d.zoncod=a.prezona AND d.calcod=a.PRECALLE);
left JOIN rlurba as e ON (e.urbcod=a.PreUrba AND a.prelocali=e.loccod);
left JOIN tresev as f ON (a.CodTipRes=f.codtipres);
left JOIN tabsag as g ON (a.CodAbasAg=g.codabasag);
left JOIN esclte as k ON (a.CodEsClte=k.codesclte);
left join tipser as l ON (a.CodTipSer=l.codtipser);
left JOIN estpre as m ON (m.codestpre=a.CodEstPre);
left JOIN coagua as n  ON (n.preregion=a.preregion and n.prezona=a.prezona AND n.presector=a.presector and n.premzn=a.premzn and n.prelote=a.prelote AND n.presublote=a.presublote AND n.concodtip=2 );
left JOIN dicoag as h ON (n.ConDiaCod =h.condiacod);
LEFT JOIN MATCJA as o ON (n.ConCajMat=o.cajmatcod);
left JOIN MATCJA as p ON (n.conmateri=p.cajmatcod);
LEFT JOIN ESTCON as q on (n.conestado=q.conestcod);
left JOIN UBIMED as r ON (r.ubicajcod=n.ConUbiCaj);
left JOIN dicoag as j ON (n.ConDiaCod =j.condiacod);
left JOIN codesa as qs ON (qs.preregion=a.preregion and qs.prezona=a.prezona AND qs.presector=a.presector and qs.premzn=a.premzn and qs.prelote=a.prelote AND qs.presublote=a.presublote AND qs.concodtde=3);
left join MATCJA as qb ON (qb.cajmatcod=qs.conmatdes) ;
LEFT JOIN MATCJA as qc ON (qs.concajmde=qc.cajmatcod) ;
LEFT JOIN ESTCON as qd on (qs.condestad=qd.conestcod) ;
left JOIN UBIMED as qe ON (qe.ubicajcod=qs.CondUbiCa) ;
LEFT JOIN dicode as qf ON (qf.condidcod=qs.condidcod) ;
left join estpre as qg ON (qg.codestpre=a.codestpre) ;
where NOT a.codesclte in (3,4)
    `);

    res.json(resultado);
  } catch (err) {
    console.error('❌ Error al ejecutar consulta:', err.message);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});


app.get('/padron-sici-unidad-uso', (req, res) => {
  try {

        console.log(`Api -> adron-sici-unidad-uso`);
    const resultado = alasql(`
SELECT a.preregion,a.CliCodigo as nro,a.prezona,c.zondes as sucursal,a.codcattar,d.descattar as Categoria,u.codscatta,u.desscatta as subcategoria, q.ttar as tarifa,a.codtipten,r.destipten as responsable,a.clipersno as cant_persona,a.cliusocod,s.inmusodes as Actividad , sum(a.clicant) as cant_u_uso,b.inscrinro
from uniduso as a 
INNER JOIN conexion as b ON ( a.preregion=b.preregion AND  a.prezona=b.prezona AND a.presector=b.presector AND a.premzn=b.premzn AND a.prelote=b.prelote AND a.presublote=b.presublote) 
left join regzon as c ON(c.zoncod=a.prezona AND a.preregion=c.regcod )
LEFT JOIN categ AS d ON (a.codcattar=d.codcattar AND d.ambcod=a.preregion )
LEFT JOIN sbcate as u ON (d.ambcod=u.ambcod AND d.codcattar=u.codcattar AND u.codscatta=a.codscatta)
LEFT JOIN taryfa as q ON (u.ambcod=q.ambcod AND u.codcattar=q.codcattar AND u.codscatta=q.codscatta AND q.ttar=a.tarifa)
left JOIN tipten as r ON (r.codtipten=a.codtipten)
left JOIN usoinm as s ON (a.cliusocod =s.inmusocod)
WHERE NOT b.codesclte in (3,4)
gROUP BY a.preregion,a.CliCodigo,a.prezona,c.zondes,a.codcattar,d.descattar,u.codscatta,u.desscatta, q.ttar,a.codtipten,r.destipten,a.cliusocod,s.inmusodes ,a.clipersno,b.inscrinro

    `);

    res.json(resultado);
  } catch (err) {
    console.error('❌ Error al ejecutar consulta:', err.message);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});

// Iniciar servidor
(async () => {
  try {
    await cargarTodosDBF();
    app.listen(PORT, () => {
      console.log(`✅ API corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
  }
})();
