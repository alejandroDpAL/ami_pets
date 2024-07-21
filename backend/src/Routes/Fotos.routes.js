import { Router } from "express";
import { AgregarFotosMascota, EliminarFotoMascota, ListarFotosMascota } from "../Controller/fotosAdicionales.js";

export const rutasFotos = Router();

rutasFotos.post('/:id/crear', AgregarFotosMascota)
rutasFotos.get('/:id/listar', ListarFotosMascota)
rutasFotos.delete('/:id/eliminar/:id_foto', EliminarFotoMascota)