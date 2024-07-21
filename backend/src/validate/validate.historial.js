import { check } from "express-validator";

export const validacionHistorial = [
    check('id_mascota', 'le id es necesario perro ').isEmpty().isInt
]