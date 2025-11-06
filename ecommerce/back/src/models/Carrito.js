
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Carrito = sequelize.define('Carrito', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaAgregado: {
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
    tableName: 'carritos',
    timestamps: false
  });
  

  export default Carrito;
