const express = require('express');
const multer  = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');
const { Client } = require('pg');
const { DBFFile } = require('dbffile');
const fs = require('fs');

const app = express();
const port = 4000;

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder (if needed)
app.use(express.static('public'));

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Body parser for urlencoded
app.use(express.urlencoded({ extended: true }));

// ---- Home ----
app.get('/', (req, res) => {
  res.render('index', { mensaje: null });
});

// ---- Funciones de conexión ----
async function testMySQLConnection({host, port, user, password, database}) {
  let conn = null;
  try {
    conn = await mysql.createConnection({ host, port, user, password, database });
    await conn.ping();
    return { ok: true, conn };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    if (conn) await conn.end();
  }
}
async function testPostgresConnection({host, port, user, password, database}) {
  const client = new Client({ host, port, user, password, database });
  try {
    await client.connect();
    return { ok: true, conn: client };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    try { await client.end(); } catch(e){}
  }
}

// ---- Verificación AJAX ----
app.post('/verificar', upload.none(), async (req, res) => {
  const d = req.body;
  const destino = {
    host: d.destino_host,
    port: d.destino_puerto,
    user: d.destino_usuario,
    password: d.destino_password,
    database: d.destino_dbname
  };
  let destResult;
  console.log(d.destino_motor)
 

    destResult = await testPostgresConnection(destino);
  
  if (!destResult.ok) {
    return res.json({ ok: false, error: destResult.error });
  }
  return res.json({ ok: true });
});





app.post('/migrar', upload.none(), async (req, res) => {

  // Extrae los parámetros de conexión desde el formulario
  console.log(req.body)
  const { destino_host, destino_puerto, destino_usuario, destino_password, destino_dbname , pathfolder} = req.body;
  const dbfBasePath = pathfolder;

  // Prepara la configuración para pg
 

  try {
    // Migrar todos los DBF a Postgres usando la config recibida
    await cargarTodosDBF({
    host: destino_host,
    port: parseInt(destino_puerto), // asegúrate que el puerto sea número
    user:destino_usuario ,
    password: destino_password,
    database: destino_dbname
  });
    res.json({ ok: true, mensaje: 'Migración a PostgreSQL completada' });
  } catch (error) {
    res.json({ ok: false, error: error.message });
  }
});



// Lista de archivos DBF a migrar
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
  uniduso: "UNIDUSO.DBF",
  categ: "CATEG.DBF",
  sbcate: "SBCATE.DBF",
  taryfa: "TARYFA.DBF",
  tipten: "TIPTEN.DBF",
  usoinm: "USOINM.DBF"
};

// Carpeta donde están los .dbf
const dbfBasePath = "C:\\Users\\Gamers\\Music\\sisfichas\\sistema-fichas-catastrales\\extraccion\\sici_cusco\\SICI\\CATASTRO";




const schemaName = 'migra';

async function ensureSchema(client, schemaName) {
  // Crea el schema si no existe
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}";`);
}

async function dropAllTablesInSchema(client, schemaName) {
  // Busca todas las tablas del schema y las elimina
  const { rows } = await client.query(`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = $1;
  `, [schemaName]);

  if (rows.length > 0) {
    const tableNames = rows.map(r => `"${schemaName}"."${r.tablename}"`).join(', ');
    await client.query(`DROP TABLE IF EXISTS ${tableNames} CASCADE;`);
    console.log(`🗑️ Tablas eliminadas del schema "${schemaName}":`, rows.map(r => r.tablename).join(', '));
  }
}

async function migrateDBFtoPostgres(dbfPath, tableName, client) {
  const dbf = await DBFFile.open(dbfPath, { encoding: 'latin1' });
  const records = await dbf.readRecords();
  const fields = dbf.fields;
  const fullTableName = `"${schemaName}"."${tableName}"`;

  // Crear tabla
  const createFields = fields.map(field => {
    let type = 'VARCHAR(255)';
    if (field.type === 'N') type = 'DOUBLE PRECISION';
    else if (field.type === 'L') type = 'BOOLEAN';
    else if (field.type === 'D') type = 'DATE';
    return `"${field.name}" ${type}`;
  }).join(', ');

  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${fullTableName} (${createFields});`;
  await client.query(createTableQuery);

  // Insertar datos
  for (const row of records) {
    const columns = Object.keys(row).map(col => `"${col}"`).join(',');
    const values = Object.values(row);
    const params = values.map((_, i) => `$${i + 1}`).join(',');
    const insertQuery = `INSERT INTO ${fullTableName} (${columns}) VALUES (${params});`;
    await client.query(insertQuery, values);
  }

  console.log(`✅ Migración completada: ${schemaName}.${tableName}`);
}




async function cargarTodosDBF(pgConfig) {

  const client = new Client(pgConfig);
  await client.connect();

  // 1. Asegúrate de que el schema existe
  await ensureSchema(client, schemaName);
  console.log("> creando el schema 'migra' en la base de datos")

  // 2. Elimina todas las tablas del schema
  await dropAllTablesInSchema(client, schemaName);
    console.log("> Eliminado todas las tablas del schema 'migra'")

  // 3. Migra todos los DBF como siempre
  for (const [nombreTabla, nombreArchivo] of Object.entries(archivosDBF)) {
    const archivoPath = path.join(dbfBasePath, nombreArchivo);

    try {
      console.log(`📥 Migrando ${nombreArchivo} como tabla ${schemaName}.${nombreTabla}...`);
      await migrateDBFtoPostgres(archivoPath, nombreTabla, client);
    } catch (err) {
      console.warn(`❌ Error migrando ${nombreArchivo}: ${err.message}`);
    }
  }

  await client.end();
}




// ---- RUN SERVER ----
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
