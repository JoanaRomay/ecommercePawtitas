import sequelize from '../db/connection.js';

import Producto from './Producto.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';

import Orden from './Orden.js';
import DetalleOrden from './DetalleOrden.js';

Producto.belongsTo(Categoria, { as: 'categoria', foreignKey: 'idCategoria' });
Categoria.hasMany(Producto, { as: 'productos', foreignKey: 'idCategoria' });


// Usuario pertenece a Rol
Usuario.belongsTo(Rol, { foreignKey: "rolId", as: "rol" });
Rol.hasMany(Usuario, { foreignKey: "rolId", as: "usuarios" });

export {
  sequelize,
  Categoria,
  Producto,
  Usuario,
  Rol,
  Orden,
  DetalleOrden,
};
