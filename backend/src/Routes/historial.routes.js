import { Router } from "express";
import { ActualizarHistorial, CrearHistorial, ListarHistoriales, ListarHistorialPorMascota } from "../Controller/historial.js";
import { EliminarCaso } from "../Controller/Trato_especial.js";
import { validacionHistorial } from "../validate/validate.historial.js";

export const RutasHistorial = Router();
RutasHistorial.get('/listar', ListarHistoriales)
RutasHistorial.get('/listar_id/:id_mascota', ListarHistorialPorMascota);
RutasHistorial.post('/crear', validacionHistorial, CrearHistorial)
RutasHistorial.put('/actualizar/:id', ActualizarHistorial)
RutasHistorial.delete('/eliminar/:id',EliminarCaso)