// syncUploads.js (versión ESM)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Estas líneas son necesarias para usar __dirname con ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Ruta del backend de adminJR
const adminUploads = "C:/Users/Joana/Desktop/admJR/back/uploads";

// 📂 Ruta del backend de ecommerce
const ecommerceUploads = "C:/Users/Joana/Desktop/ecommerce/back/uploads";

// Verificamos que las carpetas existan
if (!fs.existsSync(adminUploads)) {
  console.error("❌ Carpeta de origen (adminJR) no encontrada.");
  process.exit(1);
}
if (!fs.existsSync(ecommerceUploads)) {
  console.error("❌ Carpeta de destino (ecommerce) no encontrada.");
  process.exit(1);
}

// Leemos los archivos del adminJR
fs.readdir(adminUploads, (err, files) => {
  if (err) {
    console.error("Error leyendo admin uploads:", err);
    return;
  }

  console.log(`Encontrados ${files.length} archivos en adminJR/uploads`);

  files.forEach((file) => {
    const source = path.join(adminUploads, file);
    const dest = path.join(ecommerceUploads, file);

    // Solo copia si no existe en ecommerce
    if (!fs.existsSync(dest)) {
      fs.copyFile(source, dest, (err) => {
        if (err) console.error("❌ Error copiando archivo:", file, err);
        else console.log("✅ Archivo copiado:", file);
      });
    } else {
      console.log("↪️ Ya existe:", file);
    }
  });
});
