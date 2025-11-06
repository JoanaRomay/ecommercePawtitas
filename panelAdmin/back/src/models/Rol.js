import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Rol = sequelize.define("Rol", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Rol;
