import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../Url';
import Header from '../moleculas/Header';

function Adopciones() {
  const [adopciones, setAdopciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerAdopciones = async () => {
      try {
        const response = await axios.get(`${Url}/adopciones/listar`);
        setAdopciones(response.data);
      } catch (error) {
        console.error("Error al obtener las adopciones:", error);
      }
    };

    obtenerAdopciones();
  }, []);

  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    setBusqueda(searchTerm); // Actualizar el estado de búsqueda con el nuevo término
    try {
      const response = await axios.get(`${Url}/adopciones/buscar`, {
        params: { query: searchTerm },
      });
      setAdopciones(response.data);
    } catch (error) {
      console.error("Error al buscar adopciones:", error);
    }
  };

  const handleSearchClick = () => {
    handleInputChange(); // Llamar a la función de búsqueda al hacer clic en el botón
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen p-4 border border-gray-400">
        <h2 className="text-xl font-bold mb-4">Adopciones</h2>
        <div className="flex flex-row mb-4">
          <input
            type="text"
            value={busqueda}
            onChange={handleInputChange}
            placeholder="Buscar adopciones..."
            className="w-full pr-10 p-2 border rounded shadow-sm max-w-xs"
          />
          <button onClick={handleSearchClick} className="bg-gray-300 w-20" >
            Buscar
          </button>
        </div>
        <table className="w-[800px] table-auto bg-gray-200 border border-gray-400">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Adopción</th>
              <th>Nombre Usuario</th>
              <th>Nombre Mascota</th>
            </tr>
          </thead>
          <tbody>
            {adopciones.map((adopcion) => (
              <tr key={adopcion.id} className="border-b border-gray-200">
                <td className="text-center py-2">{adopcion.id}</td>
                <td className="text-center py-2">{new Date(adopcion.fecha_adopcion).toLocaleDateString()}</td>
                <td className="text-center py-2">{adopcion.nombre_usuario}</td>
                <td className="text-center py-2">{adopcion.nombre_mascota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Adopciones;
