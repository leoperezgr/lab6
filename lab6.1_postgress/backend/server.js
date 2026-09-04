const express = require('express');
const cors = require('cors');
const businessUnitRoutes = require('./routes/businessUnitRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/business-units', businessUnitRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API de Unidades de Negocio funcionando correctamente con PostgreSQL');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
