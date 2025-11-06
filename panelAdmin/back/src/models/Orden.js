import sequelize from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Orden = sequelize.define('Orden', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'procesando', 'enviado', 'entregado'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    direccionEnvio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaOrden: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes', 
        key: 'id'
      }
    }
  }, {
    tableName: 'ordenes',
    timestamps: false
  });
  
export default Orden;