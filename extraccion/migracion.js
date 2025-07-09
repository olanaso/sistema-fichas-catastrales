import { DBFFile } from 'dbffile';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configuración de conexión a MySQL
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sici_migracion'
};

async function migrateDBFtoMySQL(dbfPath, tableName) {
  const dbf = await DBFFile.open(dbfPath, { encoding: 'latin1' });
  const records = await dbf.readRecords();
  const fields = dbf.fields;

  const connection = await mysql.createConnection(mysqlConfig);

  // Crear tabla si no existe (conversión básica de tipos)
  const createFields = fields.map(field => {
    let type = 'VARCHAR(255)';
    if (field.type === 'N') type = 'DOUBLE';
    else if (field.type === 'L') type = 'BOOLEAN';
    else if (field.type === 'D') type = 'DATE';
    return `\`${field.name}\` ${type}`;
  }).join(', ');

  const createTableQuery = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${createFields})`;
  await connection.query(createTableQuery);

  // Insertar datos
  for (const row of records) {
    const columns = Object.keys(row).map(col => `\`${col}\``).join(',');
    const values = Object.values(row).map(val => connection.escape(val)).join(',');

    const insertQuery = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values})`;
    await connection.query(insertQuery);
  }

  console.log(`✅ Migración completada: ${tableName}`);
  await connection.end();
}

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

async function cargarTodosDBF() {
  for (const [nombreTabla, nombreArchivo] of Object.entries(archivosDBF)) {
    const archivoPath = path.join(dbfBasePath, nombreArchivo);

    try {
      console.log(`📥 Migrando ${nombreArchivo} como tabla ${nombreTabla}...`);
      await migrateDBFtoMySQL(archivoPath, nombreTabla);
    } catch (err) {
      console.warn(`❌ Error migrando ${nombreArchivo}: ${err.message}`);
    }
  }
}

// Ejecutar migración
cargarTodosDBF();
