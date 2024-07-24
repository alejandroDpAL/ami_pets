import React, { useEffect, useState } from "react";
import Header from "../moleculas/Header";
import Buscador from "../moleculas/Buscador";
import axios from "axios";
import { Url } from "../../../Url.jsx";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await axios.get(`${Url}/usuarios/listar`);
        console.log("Datos de usuarios recibidos:", respuesta.data); // Imprime los datos recibidos
        setUsuarios(respuesta.data.resultado);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`${Url}/usuarios/buscar`, {
        params: { query: searchTerm },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al encontrarar usuarios:", error);
    }
  };

  return (
    <>
      <Buscador onSearch={handleSearch} />
      <div className="p-4">
        {cargando ? (
          <p className="text-gray-500">Cargando...</p>
        ) : (

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <div
                  key={usuario.identificacion}
                  className="p-4 shadow-lg rounded-lg bg-white border border-gray-200"
                >
                  {/* Contenedor de la imagen con tamaño y bordes redondeados */}
                  <div className="w-60 h-60 max-w-xs mx-auto relative">
                    <img
                      src={usuario.foto ? `${Url}/img/${usuario.foto}` : ""}
                      alt="Usuario"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{usuario.nombre}</h2>
                  <p className="text-gray-600">Email: {usuario.email}</p>
                  <p className="text-gray-600">Teléfono: {usuario.telefono}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No se encontraron usuarios</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Usuarios;
