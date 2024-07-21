import { Router } from "express";
import { actualizarAdopcion, crearAdopcion, eliminarAdopcion, listarAdopciones } from "../Controller/adopciones.js";

export const rutasAdopciones = Router()

rutasAdopciones.get('/listar', listarAdopciones)
rutasAdopciones.post('/crear', crearAdopcion)
rutasAdopciones.post('/actualizar/:id', actualizarAdopcion)
rutasAdopciones.post('/eliminar/:id', eliminarAdopcion)
