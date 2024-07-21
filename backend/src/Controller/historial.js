/* import { validationResult } from "express-validator"; */
import { pool } from "../database/conexion.js";

export const CrearHistorial = async (req, res) => {
    try {

/*         const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(404).json(errors.array())
        }
 */
        const { id_mascota, id_vacuna, id_caso_especial } = req.body;
        const [historial] = await pool.query('INSERT INTO historial_mascotas (id_mascota, id_vacuna, id_caso_especial) VALUES (?, ?, ?)', [id_mascota, id_vacuna, id_caso_especial]);

        if (historial.affectedRows > 0) {
            res.status(200).json({
                message: "Historial creado con éxito"
            });
        } else {
            res.status(404).json({
                message: "Error al crear el Historial"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al conectar con el servidor: " + error.message
        });
    }
}

export const ListarHistoriales = async (req, res) => {
    try {
        const [historial] = await pool.query(`
            SELECT h.id, m.nombre as nombre_mascota, u.nombre as nombre_usuario,
                   v.nombre as nombre_vacuna, c.trato_especial as caso_especial, c.discapacidad AS discapacidad_presente
            FROM historial_mascotas h
            LEFT JOIN mascotas m ON h.id_mascota = m.id
            LEFT JOIN usuarios u ON m.fk_usuario = u.identificacion
            LEFT JOIN vacunas_mascotas v ON h.id_vacuna = v.id
            LEFT JOIN casos_especiales c ON h.id_caso_especial = c.id
        `);
        if (historial.length > 0) {
            res.status(200).json(historial);
        }
    } catch (error) {
        res.status(500).json({ message: "Error al listar historiales de mascotas: " + error.message });
    }
}

export const ListarHistorialPorMascota = async (req, res) => {
    try {
        const { id_mascota } = req.params;
        const [historial] = await pool.query(`
            SELECT h.id, m.nombre as nombre_mascota, u.nombre as nombre_usuario,
                   v.nombre as nombre_vacuna, c.trato_especial as caso_especial, c.discapacidad AS discapacidad_presente
            FROM historial_mascotas h
            LEFT JOIN mascotas m ON h.id_mascota = m.id
            LEFT JOIN usuarios u ON m.fk_usuario = u.identificacion
            LEFT JOIN vacunas_mascotas v ON h.id_vacuna = v.id
            LEFT JOIN casos_especiales c ON h.id_caso_especial = c.id
            WHERE h.id_mascota = ?
        `, [id_mascota]);
        
        if (historial.length > 0) {
            res.status(200).json(historial);
        } else {
            res.status(404).json({ message: "No se encontró historial para la mascota con el ID proporcionado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al listar historial de mascota: " + error.message });
    }
}



export const ActualizarHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_mascota, id_vacuna, id_caso_especial } = req.body;
        
        const [result] = await pool.query( `
            UPDATE historial_mascotas
            SET id_mascota = ?, id_vacuna = ?, id_caso_especial = ?
            WHERE id = ?
        `,[id_mascota, id_vacuna, id_caso_especial, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Historial de mascota actualizado con éxito" });
        } else {
            res.status(404).json({ message: "No se encontró el historial de mascota para actualizar" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar historial de mascota: " + error.message });
    }
}

export const EliminarHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = `
            DELETE FROM historial_mascotas
            WHERE id = ?
        `;
        const result = await pool.query(query, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Historial de mascota eliminado con éxito" });
        } else {
            res.status(404).json({ message: "No se encontró el historial de mascota para eliminar" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar historial de mascota: " + error.message });
    }
}