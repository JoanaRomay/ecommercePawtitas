import multer from "multer";
import path from "path";

// Carpeta donde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // crea esta carpeta en tu backend
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes"));
  }
};

export const upload = multer({ storage, fileFilter });
