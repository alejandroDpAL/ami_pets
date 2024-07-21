import multer from "multer";
import path from 'path';

// Configuración del almacenamiento en Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    // Determina la ruta de destino basado en isUpdate
    const uploadPath = req.body.isUpdate === 'true' ? 'public/uploads/' : 'public/img/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Genera un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo debe ser una imagen'), false);
  }
};

// Instancia de Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limitar el tamaño del archivo a 5MB
  },
  fileFilter: fileFilter
});

export default upload;
