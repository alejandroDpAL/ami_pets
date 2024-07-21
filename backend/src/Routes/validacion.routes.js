import { Router } from "express";
import { validacionUsuario } from "../Controller/validacion.js";

export const rutaValidacion = Router();

rutaValidacion.post('/validacion', validacionUsuario)
