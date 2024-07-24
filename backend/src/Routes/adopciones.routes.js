import { Router } from "express";
import { actualizarAdopcion, buscarAdopciones, crearAdopcion, eliminarAdopcion, listarAdopciones } from "../Controller/adopciones.js";

export const rutasAdopciones = Router()

rutasAdopciones.get('/listar', listarAdopciones)
rutasAdopciones.get('/buscar', buscarAdopciones)

rutasAdopciones.post('/crear', crearAdopcion)
/* rutasAdopciones.put('/actualizar/:id', actualizarAdopcion)
rutasAdopciones.post('/eliminar/:id', eliminarAdopcion) */
