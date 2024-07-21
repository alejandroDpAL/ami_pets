import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';

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
servidor.use(body_parser.json());
servidor.use(body_parser.urlencoded({ extended: false }));

// Rutas
servidor.use('/usuarios', RutasUsuarios);
servidor.use('/mascotas', rutasMascotas);
servidor.use('/fotos', rutasFotos);
servidor.use('/adopciones', rutasAdopciones);
servidor.use('/vacunas', RutasVacunas);
servidor.use('/trato', RutasCasos);
servidor.use('/historial', RutasHistorial);

servidor.use('/uploads', express.static('public/uploads'));
servidor.use('/img', express.static('public/img'));

// Ruta para validación
servidor.use(rutaValidacion);

servidor.listen(port, () => {
    console.log(`Servidor corriendo por el puerto ${port}`);
});
