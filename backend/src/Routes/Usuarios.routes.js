import { Router } from "express";
import { ActualizarUsuarios, BuscarUsuarios, CrearUsuarios, EliminarUsuarios, ListarUsuarios } from "../Controller/Usuarios.js";



const RutasUsuarios = Router();

RutasUsuarios.post('/crear',/* validacion, */ CrearUsuarios)
RutasUsuarios.get('/listar', ListarUsuarios)
RutasUsuarios.get('/buscar', BuscarUsuarios);
RutasUsuarios.put('/actualizar/:identificacion', ActualizarUsuarios)
RutasUsuarios.delete('/eliminar/:identificacion', EliminarUsuarios)


export default RutasUsuarios