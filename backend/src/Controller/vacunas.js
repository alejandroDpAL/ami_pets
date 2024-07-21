import { pool } from "../database/conexion.js";

export const CrearVacuna = async (req, res) => {
    try {
        const {id_mascota, nombre, fecha_aplicacion} = req.body;
        const [result] = await pool.query('INSERT INTO vacunas_mascotas (id_mascota, nombre, fecha_aplicacion) VALUES (?, ?, ?)', [id_mascota, nombre, fecha_aplicacion]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Vacuna registrada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'Error al registrar una vacuna'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al conectar con el servidor: ' + error.message
        });
    }
};

export const ListarVacunas = async (req, res) => {
    try {
        const [vacunas] = await pool.query('SELECT * FROM vacunas_mascotas');
        res.status(200).json(vacunas);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener vacunas: ' + error.message
        });
    }
};

export const ListarVacunasPorMascota = async (req, res) => {
    const { id_mascota } = req.params;
    try {
        const [vacunas] = await pool.query('SELECT * FROM vacunas_mascotas WHERE id_mascota = ?', [id_mascota]);
        
        res.status(200).json(vacunas);
    } catch (error) {

        res.status(500).json({
            message: 'Error al obtener vacunas: ' + error.message
        });
    }
};

export const ActualizarVacuna = async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_aplicacion } = req.body;
    try {
        const [result] = await pool.query('UPDATE vacunas_mascotas SET nombre = ?, fecha_aplicacion = ? WHERE id = ?', [nombre, fecha_aplicacion, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Vacuna actualizada con exito'
            });
        } else {
            res.status(404).json({
                message: 'Vacuna no encontrada'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al conectar con el servidor: ' + error
        });
    }
};

export const EliminarVacuna = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM vacunas_mascotas WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Vacuna eliminada con exito'
            });
        } else {
            res.status(404).json({
                message: 'Vacuna no encontrada'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar vacuna: ' + error.message
        });
    }
};