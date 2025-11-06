import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const CarritoXProducto = sequelize.define('CarritoXProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idCarrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carritos',  
      key: 'id'
    }
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
  tableName: 'carritoXProducto',  
  timestamps: false
});

export default CarritoXProducto;
