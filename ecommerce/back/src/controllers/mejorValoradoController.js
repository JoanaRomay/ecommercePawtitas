import  MejorValorado from "../models/MejorValorado.js";

export const votarProductos = async (req, res) => {
    const { productoId } = req.params;

    try {
        let registro = await MejorValorado.findOne({ where: { productoId } });
        if (registro) {
            registro.cantidadVotos++;
            await registro.save()
        } else {
            registro = await MejorValorado.create({productoId, cantidadVotos: 1})
        }
        return res.status(200).json(registro); 
    } catch (error) {
         res.status(500).json({ error: 'Error ' });
    }
};


export const obtenerMejorValorados = async (req, res) => {
  try {
      const mejorValorados = await MejorValorado.findAll({
          order: [['cantidadVotos', 'DESC']],
      });
   return res.status(200).json(mejorValorados);
  } catch (error) {
    res.status(500).json({ error: "Error." });
  }
};

/* npm run dev

> back@1.0.0 dev
> nodemon src/index.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/index.js index.js`
node:internal/modules/esm/resolve:265
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\Joana\Desktop\ecommerce\back\src\models\MejorValorado' 
imported from C:\Users\Joana\Desktop\ecommerce\back\src\controllers\mejorValoradoController.js
    at finalizeResolution (node:internal/modules/esm/resolve:265:11)
    at moduleResolve (node:internal/modules/esm/resolve:933:10)
    at defaultResolve (node:internal/modules/esm/resolve:1169:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:542:12)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:510:25)
    at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:239:38)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:96:40)
    at link (node:internal/modules/esm/module_job:95:36) 
{
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/Joana/Desktop/ecommerce/back/src/models/MejorValorado'
}

Node.js v20.18.0
[nodemon] app crashed - waiting for file changes before starting...
 */