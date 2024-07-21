import { pool } from "../database/conexion.js";

export const CrearCaso = async (req, res) => {
    try {
        const { id_mascota, trato_especial, discapacidad } = req.body;
        const [caso] = await pool.query('INSERT INTO casos_especiales (id_mascota, trato_especial, discapacidad) VALUES (?, ?, ?)', [id_mascota, trato_especial, discapacidad]);

        if (caso.affectedRows > 0) {
            res.status(200).json({
                message: "Caso creado con éxito"
            });
        } else {
            res.status(404).json({
                message: "Error al registrar un caso especial"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al conectar con el servidor: " + error.message
        });
    }
};

export const ListarCasos = async (req, res) => {
    try {
        const [casos] = await pool.query('SELECT c.*,m.nombre AS id_mascota from casos_especiales AS c JOIN mascotas AS m ON c.id_mascota = m.id ');
        if (casos.length > 0) {
            res.status(200).json({ casos });
        } else {
            res.status(404).json({
                message: "Casos no encontrados"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al conectar con el servidor: " + error.message
        });
    }
};

export const ActualizarCaso = async (req, res) => {
    const { id } = req.params;
    const { trato_especial, discapacidad } = req.body;
    try {
        const [result] = await pool.query('UPDATE casos_especiales SET trato_especial = ?, discapacidad = ? WHERE id = ?', [trato_especial, discapacidad, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Caso especial actualizado con exito'
            });
        } else {
            res.status(404).json({
                message: 'Caso especial no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al conectar con el servidor: ' + error.message
        });
    }
};

export const EliminarCaso = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM casos_especiales WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Caso especial eliminado correctamente'
            });
        } else {
            res.status(404).json({
                message: 'Caso especial no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al conectar con el servidor: ' + error.message
        });
    }
};