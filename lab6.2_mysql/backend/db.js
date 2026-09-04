const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'femsa_audit',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // máximo número de conexiones en el pool
  queueLimit: 0,
});

// Función para verificar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida con éxito');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a MySQL:', error.message);
  }
}

testConnection();

module.exports = pool;
