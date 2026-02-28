require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const createAdmin = require('./src/utils/seedAdmin');


const PORT = process.env.PORT || 3000;

// Conectar base de datos
connectDB().then(() => {
  createAdmin(); // 👈 AQUÍ

  // Levantar servidor
  app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
});