import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
const DetalleOrden = sequelize.define('DetalleOrden', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  idOrden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ordenes',
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
  tableName: 'detallesOrdenes',
  timestamps: false
});

export default DetalleOrden;
