import { pool } from "../database/conexion.js";
import upload from "./fotos.js";

export const AgregarFotosMascota = async (req, res) => {
    const { id } = req.params;
    try {
      upload.array('fotos_adicionales')(req, res, async function (err) {
        if (err) {
          console.error('Error al cargar las fotos adicionales:', err);
          return res.status(500).json({ message: 'Error al cargar las fotos adicionales' });
        }
  
        const fotos_adicionales = req.files.map(file => file.filename);
        
        for (const foto of fotos_adicionales) {
          await pool.query("INSERT INTO fotos (id_mascota, fotos_adicionales) VALUES (?, ?)", [id, foto]);
        }
  
        res.status(200).json({
          message: "Fotos adicionales agregadas con éxito"
        });
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al conectar con el servidor " + error
      });
    }
  };
  
  export const ListarFotosMascota = async (req, res) => {
    const { id } = req.params;
    try {
      const [fotos] = await pool.query('SELECT * FROM fotos WHERE id_mascota = ?', [id]);
      if (fotos.length > 0) {
        res.status(200).json(fotos);
      } else {
        res.status(404).json({
          message: 'No se encontraron fotos adicionales para esta mascota'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al conectar con el servidor ' + error
      });
    }
  };

  export const EliminarFotoMascota = async (req, res) => {
    const { id, id_foto } = req.params;
    try {
      const [resultado] = await pool.query('DELETE FROM fotos WHERE id = ? AND id_mascota = ?', [id_foto, id]);
  
      if (resultado.affectedRows > 0) {
        res.status(200).json({
          message: "Foto eliminada con éxito"
        });
      } else {
        res.status(404).json({
          message: "No se encontró la foto para eliminar"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al conectar con el servidor " + error
      });
    }
  };
  /* 
  export const ActualizarFotoMascota = async (req, res) => {
    const { id, id_foto } = req.params;
    try {
      upload.single('foto_adicional')(req, res, async function (err) {
        if (err) {
          console.error('Error al cargar la nueva foto:', err);
          return res.status(500).json({ message: 'Error al cargar la nueva foto' });
        }
  
        const nueva_foto = req.file ? req.file.filename : null;
  
        if (!nueva_foto) {
          return res.status(400).json({ message: 'No se proporcionó una nueva foto' });
        }
  
        const [resultado] = await pool.query('UPDATE fotos SET fotos_adicionales = ? WHERE id = ? AND id_mascota = ?', [nueva_foto, id_foto, id]);
  
        if (resultado.affectedRows > 0) {
          res.status(200).json({
            message: "Foto actualizada con éxito"
          });
        } else {
          res.status(404).json({
            message: "No se encontró la foto para actualizar"
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al conectar con el servidor " + error
      });
    }
  };
   */