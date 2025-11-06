import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize, Categoria, Producto, Orden, DetalleOrden } from '../back/src/models/index.js';
import router from './src/routes/index.js';
import path from 'path'; // <-- IMPORTAR path
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'development' ? "dev" : "combined"));

// Servir la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', router);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
      success: true,
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
  });
});

app.use('/img', express.static('public/img'));

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // NO sincronizar tablas aquí para evitar conflictos con el admin
    // await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}


startServer();
