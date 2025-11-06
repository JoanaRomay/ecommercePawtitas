import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'; 
import { sequelize, Categoria, Producto, Orden, DetalleOrden } from '../back/src/models/index.js';
import router from './src/routes/index.js';
import 'dotenv/config';
import passport from "passport";
import './src/config/passport.js';

const app = express();
app.use(passport.initialize()); 

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://tu-dominio.com'] // Ajustar en producción
        : ['http://localhost:5173', 'http://localhost:5174'],  // ['*']. para no filtrar ninguna IP. Ajustar según tu front en desarrollo
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'development' ? "dev" : "combined"));

// Servir imágenes subidas
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rutas
app.use('/api', router);

// Otros recursos estáticos
app.use('/img', express.static('public/img'));

// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ alter: true });
    console.log('🔁 Tablas revisadas y sincronizadas correctamente.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();
