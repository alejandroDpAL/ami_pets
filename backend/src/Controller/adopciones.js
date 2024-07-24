import { pool } from "../database/conexion.js";

export const crearAdopcion = async (req, res) => {
    const { id_mascota, id_usuario } = req.body;
    
    if (!id_mascota || !id_usuario) {
      return res.status(400).json({ message: 'id_mascota y id_usuario son requeridos' });
    }
  
    try {
      const [result] = await pool.query(
        'INSERT INTO adopciones (id_mascota, id_usuario, fecha_adopcion) VALUES (?, ?, CURRENT_DATE())', 
        [id_mascota, id_usuario]
      );
  
      res.status(201).json({ id: result.insertId, id_mascota, id_usuario, fecha_adopcion: new Date().toISOString().split('T')[0] });
    } catch (error) {
      res.status(500).json({ message: "Error al conectar con el servidor: " + error });
    }
  };

  export const listarAdopciones = async (req, res) => {
    try {
      const [adopciones] = await pool.query(`
        SELECT 
          adopciones.id,
          DATE(adopciones.fecha_adopcion) AS fecha_adopcion,
          usuarios.nombre AS nombre_usuario,
          mascotas.nombre AS nombre_mascota
        FROM 
          adopciones
        JOIN 
          usuarios ON adopciones.id_usuario = usuarios.identificacion
        JOIN 
          mascotas ON adopciones.id_mascota = mascotas.id
      `);
  
      if (adopciones.length > 0) {
        res.status(200).json(adopciones);
      } else {
        res.status(404).json({
          message: 'No se encontraron adopciones en la tabla'
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al conectar con el servidor: " + error });
    }
  };

  /* 
  // Obtener una adopción por ID
  const obtenerAdopcionPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [adopciones] = await pool.query('SELECT * FROM adopciones WHERE id = ?', [id]);
      
      if (adopciones.length === 0) {
        return res.status(404).json({ message: 'Adopción no encontrada' });
      }
  
      res.status(200).json(adopciones[0]);
    } catch (error) {
      res.status(500).json({ message: "Error al conectar con el servidor " + error});
    }
  }; */

export const actualizarAdopcion = async (req, res) => {
    const { id } = req.params;
    const { id_mascota, id_usuario } = req.body;
  
    try {
      const [result] = await pool.query(
        'UPDATE adopciones SET id_mascota = ?, id_usuario = ? WHERE id = ?', 
        [id_mascota, id_usuario, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Adopción no encontrada' });
      }
  
      res.status(200).json({ message: 'Adopción actualizada' });
    } catch (error) {
      res.status(500).json({ message: "Error al conectar con el servidor " + error});
    }
  };
  
  // Eliminar una adopción
export const eliminarAdopcion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM adopciones WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Adopción no encontrada' });
      }
  
      res.status(200).json({ message: 'Adopción eliminada' });
    } catch (error) {
      res.status(500).json({ message: "Error al conectar con el servidor " + error });
    }
  };

  /* buscar  */
  export const buscarAdopciones = async (req, res) => {
    const { criterio, valor } = req.query;
  
    if (!criterio || !valor) {
      return res.status(400).json({ message: 'Debe proporcionar un criterio y un valor para la búsqueda' });
    }
  
    try {
      let query = `
        SELECT 
          adopciones.id,
          DATE(adopciones.fecha_adopcion) AS fecha_adopcion,
          usuarios.nombre AS nombre_usuario,
          mascotas.nombre AS nombre_mascota
        FROM 
          adopciones
        JOIN 
          usuarios ON adopciones.id_usuario = usuarios.identificacion
        JOIN 
          mascotas ON adopciones.id_mascota = mascotas.id`;
  
      switch (criterio.toLowerCase()) {
        case 'nombre_mascota':
          query += ` WHERE mascotas.nombre LIKE ?`;
          break;
        case 'nombre_usuario':
          query += ` WHERE usuarios.nombre LIKE ?`;
          break;
        case 'fecha_adopcion':
          query += ` WHERE adopciones.fecha_adopcion BETWEEN ? AND ?`;
          break;
        default:
          return res.status(400).json({ message: 'Criterio de búsqueda inválido' });
      }
  
      const [adopciones] = await pool.query(query, [valor, valor]); // Para 'fecha_adopcion', se utiliza el mismo valor para ambos extremos del rango
  
      if (adopciones.length > 0) {
        res.status(200).json(adopciones);
      } else {
        res.status(404).json({ message: 'No se encontraron adopciones que coincidan con los criterios especificados' });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al conectar con el servidor: " + error });
    }
  };
  