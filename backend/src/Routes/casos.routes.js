import { Router } from "express";
import { ActualizarCaso, CrearCaso, EliminarCaso, ListarCasos } from "../Controller/Trato_especial.js";

export const RutasCasos = Router();
RutasCasos.get('/listar', ListarCasos)
RutasCasos.post('/crear', CrearCaso)
RutasCasos.put('/actualizar/:id', ActualizarCaso)
RutasCasos.delete('/eliminar/:id',EliminarCaso)