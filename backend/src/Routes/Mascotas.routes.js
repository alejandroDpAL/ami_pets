import { Router } from "express";
import { ActualizarMascota, BuscarMascotas, EliminarMascota, ListarMascotas, ObtenerMascota, RegistrarMascota } from "../Controller/Mascotas.js";

export const rutasMascotas = Router();

rutasMascotas.post('/crear',/* UsuarioValido, */ RegistrarMascota)
rutasMascotas.get('/listar',ListarMascotas)
rutasMascotas.get('/listar_id/:id', ObtenerMascota)
rutasMascotas.put('/actualizar/:id', ActualizarMascota)
rutasMascotas.delete('/eliminar/:id', EliminarMascota)
rutasMascotas.get('/buscar', BuscarMascotas);  