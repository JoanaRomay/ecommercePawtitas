import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';


const MejorValorado = sequelize.define('MejorValorado', {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productoId: {
    type: DataTypes.INTEGER,
      allowNull: false,
    unique: true

  },
  cantidadVotos: {
    type: DataTypes.INTEGER,
      allowNull: false,
    defaultValue:1
  },
});

export default MejorValorado;


/*node:internal/modules/esm/resolve:259
    throw new ERR_UNSUPPORTED_DIR_IMPORT(path, fileURLToPath(base), String(resolved));
          ^

Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import 'C:\Users\Joana\Desktop\ecommerce\back\src\models' is not supported resolving ES modules imported from C:\Users\Joana\Desktop\ecommerce\back\src\controllers\mejorValoradoController.js
    at finalizeResolution (node:internal/modules/esm/resolve:259:11)
    at moduleResolve (node:internal/modules/esm/resolve:933:10)
    at defaultResolve (node:internal/modules/esm/resolve:1169:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:542:12)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:510:25)
    at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:239:38)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:96:40)
    at link (node:internal/modules/esm/module_job:95:36) 
{
  code: 'ERR_UNSUPPORTED_DIR_IMPORT',
  url: 'file:///C:/Users/Joana/Desktop/ecommerce/back/src/models'
}

Node.js v20.18.0
[nodemon] app crashed - waiting for file changes before starting...
 */