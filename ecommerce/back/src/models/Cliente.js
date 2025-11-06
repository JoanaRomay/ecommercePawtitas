import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: true, // <- importante: puede venir null si es de Google
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  proveedor: {
    type: DataTypes.ENUM('local', 'google'),
    defaultValue: 'local',
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    },
  direccion: {
  type: DataTypes.STRING,
  allowNull: true,
},
ciudad: {
  type: DataTypes.STRING,
  allowNull: true,
},
provincia: {
  type: DataTypes.STRING,
  allowNull: true,
},
codigoPostal: {
  type: DataTypes.STRING,
  allowNull: true,
},
telefono: {
  type: DataTypes.STRING,
  allowNull: true,
  validate: { len: [7, 20] },
},
fechaNacimiento: {
  type: DataTypes.DATEONLY,
  allowNull: true,
},
genero: {
  type: DataTypes.ENUM('masculino', 'femenino', 'otro'),
  allowNull: true,
},

}, {
  tableName: 'clientes',
  timestamps: false,
});

export default Cliente;
