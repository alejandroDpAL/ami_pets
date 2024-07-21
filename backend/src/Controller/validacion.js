import { pool } from "../database/conexion.js"
import jwt from "jsonwebtoken";

export const validacionUsuario = async (req, res) => {
    try {
        let {correo, password} = req.body
        let resultado = `SELECT identificacion, nombre, telefono, correo, password, direccion, foto FROM usuarios WHERE correo ='${correo}' and password='${password}'`

        const [usuario] = await pool.query(resultado)

        if (usuario.length > 0) {
            let token = jwt.sign({usuario}, process.env.AUT_SECRET, {expiresIn:process.env.AUT_EXPIRE})
            return res.status(200).json({ 'usuario': usuario, 'token':token})
        }else {
            res.status(404).json({'status': 404, 'message': 'Usuario no autorizado'})
        }

    } catch (error) {
        res.status(505).json({'status': 500, 'message': 'Error al conectar con el servidor ' + error})
    }
}

export const UsuarioValido = async (req, res, next ) => {
    try {
        let tokenClient = req.headers['token']
        if (!tokenClient) {
            return res.status(403).json({'message': 'Token es requerido' })
        }else {
            const token = jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(403).json({message: 'Token es requerido'})
                }else {
                    next();
                }
            })
        }
    } catch (error) {
        return res.status(500).json({status : 500, message: 'Error al conectar con el servidor ' + error})
    }   
}