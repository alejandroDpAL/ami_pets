import express, { json } from 'express';
import { pool } from '../database/conexion.js';
import upload from './fotos.js';
import { validationResult } from 'express-validator';

export const CrearUsuarios = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json(errors.array())
    }
    
    upload.single('foto')(req, res, async function (err) {
      if (err) {
        // Manejar errores de carga de archivos
        console.error('Error al cargar la imagen:', err);
        return res.status(500).json({ message: 'Error al cargar la imagen' + err});
      }

      const { identificacion, nombre, telefono, correo, password, direccion } = req.body;
      const foto = req.file ? req.file.filename : null; // Verificar si hay una foto cargada

      const [resultado] = await pool.query("INSERT INTO usuarios (identificacion, nombre, telefono, correo, password, direccion, foto, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?,2,1)", [identificacion, nombre, telefono, correo, password, direccion, foto]);

      if (resultado.affectedRows > 0) {
        res.status(200).json({
          message: "Usuario creado con éxito"
        });
      } else {
        res.status(404).json({
          message: "Error al crear el usuario"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al conectar con el servidor " + error
    });
  }
};

export const ListarUsuarios = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM usuarios')
    if (resultado.length > 0) {
      res.status(200).json({resultado})
    } else {
      res.status(404).json({
        message: 'No se encontraron usuarios en la tabla'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    })
  }
}


export const ActualizarUsuarios = async (req, res) => {
  try {

    upload.single('foto')(req, res, async function (err) {
      if (err) {
        console.error('Error al cargar la imagen:', err);
        return res.status(500).json({ message: 'Error al cargar la imagen' });
      }

      const { nombre, telefono, correo, password, direccion } = req.body;
      const foto = req.file ? req.file.filename : null; // Verificar si hay una foto cargada
      const { identificacion } = req.params; // Obtener la identificacion de la URL

      // Verificar si el usuario existe
      const [usuarioExistente] = await pool.query("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion]);

      if (usuarioExistente.length > 0) {
        const [resultado] = await pool.query("UPDATE usuarios SET nombre = ?, telefono = ?, correo = ?, password = ?, direccion = ?, foto = ? WHERE identificacion = ?", [nombre, telefono, correo, password, direccion, foto, identificacion]);

        if (resultado.affectedRows > 0) {
          res.status(200).json({
            message: "Usuario actualizado con éxito"
          });
        } else {
          res.status(404).json({
            message: "Error al actualizar el usuario"
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al conectar con el servidor " + error
    });
  }
}

export const EliminarUsuarios = async (req, res) => {
  try {
    const { identificacion } = req.params;

    const [resultado] = await pool.query("DELETE FROM usuarios WHERE identificacion = ?", [identificacion]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        message: "Usuario eliminado con éxito"
      });
    } else {
      res.status(404).json({
        message: "Usuario no encontrado"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al conectar con el servidor " + error
    });
  }
}
/* buscar */
export const BuscarUsuarios = async (req, res) => {
  const { query } = req.query;
  try {
    const [usuarios] = await pool.query(
      `SELECT * FROM usuarios 
       WHERE nombre LIKE ? 
       OR correo LIKE ? 
       OR telefono LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    if (usuarios.length > 0) {
      res.status(200).json(usuarios);
    } else {
      res.status(404).json({
        message: 'No se encontraron usuarios que coincidan con la búsqueda'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};
