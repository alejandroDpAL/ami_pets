import express from 'express';
import { pool } from '../database/conexion.js';
import upload from './fotos.js';

export const RegistrarMascota = async (req, res) => {
  try {
    upload.single('foto_principal')(req, res, async function (err) {
      if (err) {
        console.error('Error al cargar la foto principal:', err);
        return res.status(500).json({ message: 'Error al cargar la foto principal' });
      }

      const { nombre, edad, genero, especie, raza, ubicacion, descripcion, fk_usuario, vacunas, discapacidades, trato_especial } = req.body;
      const foto_principal = req.file ? req.file.filename : null;
      const fecha_publicacion = new Date().toISOString().split('T')[0]; // Fecha actual

      const [resultado] = await pool.query(
        "INSERT INTO mascotas (foto_principal, nombre, edad, genero, especie, raza, ubicacion, descripcion, fk_usuario, estado, fecha_publicacion, vacunas, discapacidades, trato_especial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)",
        [foto_principal, nombre, edad, genero, especie, raza, ubicacion, descripcion, fk_usuario, fecha_publicacion, vacunas, discapacidades, trato_especial]
      );

      res.status(200).json({
        message: "Mascota registrada con éxito"
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al conectar con el servidor " + error
    });
  }
};
/* listar */
export const ListarMascotas = async (req, res) => {
  try {
    const [mascotas] = await pool.query(
      'SELECT m.*, u.nombre AS fk_usuario FROM mascotas AS m JOIN usuarios AS u ON m.fk_usuario = u.identificacion'
    );
    if (mascotas.length > 0) {
      res.status(200).json(mascotas);
    } else {
      res.status(404).json({
        message: 'No se encontraron mascotas en la base de datos'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};
/* listar por id  */
export const ObtenerMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const [mascota] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [id]);
    if (mascota.length > 0) {
      res.status(200).json(mascota[0]);
    } else {
      res.status(404).json({
        message: 'No se encontró la mascota'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};
/* listar activas */
export const ListarMascotasActivas = async (req, res) => {
  try {
    const [mascotas] = await pool.query(
      "SELECT m.*, u.nombre AS fk_usuario FROM mascotas AS m JOIN usuarios AS u ON m.fk_usuario = u.identificacion WHERE m.estado = 'activo'"
    );
    if (mascotas.length > 0) {
      res.status(200).json(mascotas);
    } else {
      res.status(404).json({
        message: 'No se encontraron mascotas activas en la base de datos'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};

/* listar inactivas */
export const ListarMascotasInactivas = async (req, res) => {
  try {
    const [mascotas] = await pool.query(
      "SELECT m.*, u.nombre AS fk_usuario FROM mascotas AS m JOIN usuarios AS u ON m.fk_usuario = u.identificacion WHERE m.estado = 'inactivo'"
    );
    if (mascotas.length > 0) {
      res.status(200).json(mascotas);
    } else {
      res.status(404).json({
        message: 'No se encontraron mascotas inactivas en la base de datos'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};
/* en process */
export const ListarMascotasEnProceso = async (req, res) => {
  try {
    const [mascotas] = await pool.query(
      "SELECT m.*, u.nombre AS fk_usuario FROM mascotas AS m JOIN usuarios AS u ON m.fk_usuario = u.identificacion WHERE m.estado = 'proceso'"
    );
    if (mascotas.length > 0) {
      res.status(200).json(mascotas);
    } else {
      res.status(404).json({
        message: 'No se encontraron mascotas en proceso en la base de datos'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};


/* actualizar */
export const ActualizarMascota = async (req, res) => {
  const { id } = req.params;
  try {
    upload.single('foto_principal')(req, res, async function (err) {
      if (err) {
        console.error('Error al cargar la foto principal:', err);
        return res.status(500).json({ message: 'Error al cargar la foto principal' });
      }

      const { nombre, edad, genero, especie, raza, ubicacion, descripcion, fk_usuario, vacunas, discapacidades, trato_especial } = req.body;
      const foto_principal = req.file ? req.file.filename : null;

      const [resultado] = await pool.query(
        "UPDATE mascotas SET foto_principal = ?, nombre = ?, edad = ?, genero = ?, especie = ?, raza = ?, ubicacion = ?, descripcion = ?, fk_usuario = ?, vacunas = ?, discapacidades = ?, trato_especial = ? WHERE id = ?",
        [foto_principal, nombre, edad, genero, especie, raza, ubicacion, descripcion, fk_usuario, vacunas, discapacidades, trato_especial, id]
      );

      if (resultado.affectedRows > 0) {
        res.status(200).json({
          message: "Mascota actualizada con éxito"
        });
      } else {
        res.status(404).json({
          message: "Error al actualizar la mascota"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al conectar con el servidor " + error
    });
  }
};
/* Buscar */
/* eliminar  */
export const EliminarMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultado] = await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        message: "Mascota eliminada con éxito"
      });
    } else {
      res.status(404).json({
        message: "No se encontró la mascota para eliminar"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al conectar con el servidor " + error
    });
  }
};

/* buscar  */
export const BuscarMascotas = async (req, res) => {
  const { query } = req.query;
  try {
    const [mascotas] = await pool.query(
      `SELECT m.*, u.nombre AS fk_usuario 
       FROM mascotas AS m 
       JOIN usuarios AS u 
       ON m.fk_usuario = u.identificacion 
       WHERE m.nombre LIKE ? 
       OR m.raza LIKE ? 
       OR m.descripcion LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    if (mascotas.length > 0) {
      res.status(200).json(mascotas);
    } else {
      res.status(404).json({
        message: 'No se encontraron mascotas que coincidan con la búsqueda'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con el servidor ' + error
    });
  }
};
