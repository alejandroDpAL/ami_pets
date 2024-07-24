import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import RutasUsuarios from './src/Routes/Usuarios.routes.js';
import { rutasMascotas } from './src/Routes/Mascotas.routes.js';
import { rutasFotos } from './src/Routes/Fotos.routes.js';
import { rutaValidacion } from './src/Routes/validacion.routes.js';
import { rutasAdopciones } from './src/Routes/adopciones.routes.js';
import { RutasVacunas } from './src/Routes/vacunas.routes.js';
import { RutasCasos } from './src/Routes/casos.routes.js';
import { RutasHistorial } from './src/Routes/historial.routes.js';

const servidor = express();
const port = 3000;

servidor.use(cors());
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

servidor.use('/usuarios', RutasUsuarios);
servidor.use('/mascotas', rutasMascotas);
servidor.use('/adopciones', rutasAdopciones);

servidor.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
servidor.use('/img', express.static(path.join(__dirname, 'public/img')));

servidor.use(rutaValidacion);

servidor.listen(port, () => {
    console.log(`Servidor corriendo por el puerto ${port}`);
});
