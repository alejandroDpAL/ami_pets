import { Router } from "express";
import { ActualizarVacuna, CrearVacuna, EliminarVacuna, ListarVacunas, ListarVacunasPorMascota } from "../Controller/vacunas.js";


export const RutasVacunas = Router();

RutasVacunas.post('/crear', CrearVacuna)
RutasVacunas.get('/listar', ListarVacunas)
RutasVacunas.get('/listar_id/:id_mascota', ListarVacunasPorMascota);
RutasVacunas.put('/actualizar/:id', ActualizarVacuna);
RutasVacunas.delete('/eliminar/:id', EliminarVacuna);