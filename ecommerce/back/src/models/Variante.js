import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Variante = sequelize.define("Variante", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: "variantes", // nombre de la tabla en tu DB
  timestamps: false        // cambialo a true si querés createdAt/updatedAt
});

export default Variante;