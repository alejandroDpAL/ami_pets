import React, { useState, useEffect } from 'react';
import Input from '../atoms/Input.jsx';
import Boton from '../atoms/Boton.jsx';
import axios from 'axios';
import { Url } from '../../../Url.jsx';
import { FaCameraRetro } from 'react-icons/fa6';

const MascotasAgregar = ({ onClose, modo, mascotaData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: '',
    especie: '',
    raza: '',
    ubicacion: '',
    descripcion: '',
    foto_principal: null,
  });

  useEffect(() => {
    if (modo === 'editar' && mascotaData) {
      setFormData({
        nombre: mascotaData.nombre || '',
        edad: mascotaData.edad || '',
        genero: mascotaData.genero || '',
        especie: mascotaData.especie || '',
        raza: mascotaData.raza || '',
        ubicacion: mascotaData.ubicacion || '',
        descripcion: mascotaData.descripcion || '',
        foto_principal: null,
      });
    }
  }, [modo, mascotaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      foto_principal: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      if (modo === 'registrar') {
        await axios.post(`${Url}/mascotas/crear`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Mascota registrada con éxito');
      } else if (modo === 'editar' && mascotaData) {
        await axios.put(`${Url}/mascotas/actualizar/${mascotaData.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Mascota actualizada con éxito');
      }
      onClose();
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <input
                type="file"
                name="foto_principal"
                onChange={handleFileChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              <FaCameraRetro className="h-10 w-10 opacity-50" />
            </div>
          </div>
          <Input name="nombre" type="text" placeholder="Nombre" onChange={handleChange} value={formData.nombre} className="w-full" />
          <Input name="edad" type="text" placeholder="Edad" onChange={handleChange} value={formData.edad} className="w-full" />
          <Input name="genero" type="text" placeholder="Género" onChange={handleChange} value={formData.genero} className="w-full" />
          <Input name="especie" type="text" placeholder="Especie" onChange={handleChange} value={formData.especie} className="w-full" />
          <Input name="raza" type="text" placeholder="Raza" onChange={handleChange} value={formData.raza} className="w-full" />
          <Input name="ubicacion" type="text" placeholder="Ubicación" onChange={handleChange} value={formData.ubicacion} className="w-full" />
          <Input name="descripcion" type="text" placeholder="Descripción" onChange={handleChange} value={formData.descripcion} className="w-full col-span-2" />
          <div className="col-span-2 flex justify-center mt-4">
            <Boton text={modo === 'registrar' ? 'Registrar' : 'Actualizar'} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MascotasAgregar;
