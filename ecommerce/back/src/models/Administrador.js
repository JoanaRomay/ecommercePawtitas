import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Administrador = sequelize.define('Administrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'administradores',
  timestamps: false
});

export default Administrador;
