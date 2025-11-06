import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Mensaje = sequelize.define('Mensaje', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', 
      key: 'id'
    }
  }
}, {
  tableName: 'mensajes',
  timestamps: false
});

export default Mensaje;
