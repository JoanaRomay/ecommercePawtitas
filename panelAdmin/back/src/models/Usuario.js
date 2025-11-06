import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  rolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  google_id: {
    type: DataTypes.STRING(255),
    allowNull: true
    },
},{
  timestamps: true, 
});

export default Usuario;
