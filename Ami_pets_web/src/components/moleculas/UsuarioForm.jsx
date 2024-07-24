import React, { useState } from 'react';
import Input from '../atoms/Input.jsx';
import Boton from '../atoms/Boton.jsx';
import axios from 'axios';
import { Url } from '../../../Url.jsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaCameraRetro } from 'react-icons/fa6';

function UsuarioForm({ onClose }) {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    telefono: '',
    correo: '',
    password: '',
    direccion: '',
    foto: null,
  });

  const [showPassword, setShowPassword] = useState(false);

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
      foto: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verifica que el archivo esté presente antes de continuar
    if (!formData.foto) {
      alert('Por favor, selecciona una foto.');
      return;
    }
  
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
  
    try {
      const response = await axios.post(`${Url}/usuarios/crear`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Maneja la respuesta exitosa
      if (response.status === 201 || response.status === 200) {
        alert('Usuario creado con éxito');
        onClose(); // Cierra el formulario o redirecciona según sea necesario
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      // Maneja el error
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <div className="relative w-24 h-24 rounded-full border-2 border-gray-400  flex items-center justify-center">
          <input
            type="file"
            name="foto"
            onChange={handleFileChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          <FaCameraRetro className='h-10 w-10 opacity-50' />

        </div>
      </div>
      <Input name="identificacion" type="text" placeholder="Identificación" onChange={handleChange} className="w-full" />
      <Input name="nombre" type="text" placeholder="Nombre" onChange={handleChange} className="w-full" />
      <Input name="telefono" type="text" placeholder="Teléfono" onChange={handleChange} className="w-full" />
      <Input name="correo" type="email" placeholder="Correo" onChange={handleChange} className="w-full" />
      <div className="relative w-full">
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full"
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>
      <Input name="direccion" type="text" placeholder="Dirección" onChange={handleChange} className="w-full" />
      <Boton text="Registrar" type="submit" />
    </form>
  );
}

export default UsuarioForm;
