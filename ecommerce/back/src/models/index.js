import sequelize from '../db/connection.js';

import Producto from './Producto.js';
import Categoria from './Categoria.js';
import Carrito from './Carrito.js'
import Orden from './Orden.js';
import DetalleOrden from './DetalleOrden.js';
import Cliente from './Cliente.js';
import CarritoXProducto from './CarritoXProducto.js';
import Mensaje from './Mensaje.js';  
import MejorValorado from './MejorValorado.js';

// Relaciones Cliente - Carrito y Orden
Cliente.hasOne(Carrito, { foreignKey: 'idCliente' });
Carrito.belongsTo(Cliente, { foreignKey: 'idCliente' });

Cliente.hasMany(Orden, { foreignKey: 'idCliente' });
Orden.belongsTo(Cliente, { foreignKey: 'idCliente' });

// Relación N:M Carrito - Producto con tabla intermedia
Carrito.belongsToMany(Producto, {
  through: CarritoXProducto,
  foreignKey: 'idCarrito',
  otherKey: 'idProducto'
});

Producto.belongsToMany(Carrito, {
  through: CarritoXProducto,
  foreignKey: 'idProducto',
  otherKey: 'idCarrito'
});

// Relación N:M Orden - Producto con tabla intermedia
Orden.belongsToMany(Producto, {
  through: DetalleOrden,
  foreignKey: 'idOrden',
  otherKey: 'idProducto'
});

Producto.belongsToMany(Orden, {
  through: DetalleOrden,
  foreignKey: 'idProducto',
  otherKey: 'idOrden'
});

// Producto - Categoria 1:N
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });
Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });

// Producto - Mensaje 1:N
Producto.hasMany(Mensaje, { foreignKey: 'idProducto' });
Mensaje.belongsTo(Producto, { foreignKey: 'idProducto' });
    


export {
  sequelize,
  Cliente,
  Carrito,
  Categoria,
  Producto,
  Orden,
  DetalleOrden,
  CarritoXProducto,
    Mensaje,
    MejorValorado
};
