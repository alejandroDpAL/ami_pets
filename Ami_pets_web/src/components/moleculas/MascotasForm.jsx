import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Url } from '../../../Url.jsx';
import Input from '../atoms/Input.jsx';
import Boton from '../atoms/Boton.jsx';

const MascotasForm = ({ mode, selectedMascota, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: '',
    especie: '',
    raza: '',
    ubicacion: '',
    descripcion: '',
    vacunas: '',
    discapacidades: '',
    trato_especial: '',
    fk_usuario: '',
    foto_principal: null,
  });

  useEffect(() => {
    if (mode === 'edit' && selectedMascota) {
      setFormData({
        nombre: selectedMascota.nombre || '',
        edad: selectedMascota.edad || '',
        genero: selectedMascota.genero || '',
        especie: selectedMascota.especie || '',
        raza: selectedMascota.raza || '',
        ubicacion: selectedMascota.ubicacion || '',
        descripcion: selectedMascota.descripcion || '',
        vacunas: selectedMascota.vacunas || '',
        discapacidades: selectedMascota.discapacidades || '',
        trato_especial: selectedMascota.trato_especial || '',
        fk_usuario: selectedMascota.fk_usuario || '',
        foto_principal: null,
      });
    } else if (mode === 'add') {
      setFormData({
        nombre: '',
        edad: '',
        genero: '',
        especie: '',
        raza: '',
        ubicacion: '',
        descripcion: '',
        vacunas: '',
        discapacidades: '',
        trato_especial: '',
        fk_usuario: '',
        foto_principal: null,
      });
    }
  }, [mode, selectedMascota]);

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
      formDataToSend.append(key, value);
    });

    try {
      if (mode === 'add') {
        await axios.post(`${Url}/mascotas/registrar`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else if (mode === 'edit') {
        await axios.put(`${Url}/mascotas/actualizar/${selectedMascota.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <Input
          label="Edad"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccionar</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <Input
          label="Especie"
          name="especie"
          value={formData.especie}
          onChange={handleChange}
        />
        <Input
          label="Raza"
          name="raza"
          value={formData.raza}
          onChange={handleChange}
        />
        <Input
          label="Ubicación"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
        />
        <Input
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <Input
          label="Vacunas"
          name="vacunas"
          value={formData.vacunas}
          onChange={handleChange}
        />
        <Input
          label="Discapacidades"
          name="discapacidades"
          value={formData.discapacidades}
          onChange={handleChange}
        />
        <Input
          label="Trato Especial"
          name="trato_especial"
          value={formData.trato_especial}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">Foto Principal</label>
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          <input
            type="file"
            name="foto_principal"
            onChange={handleFileChange}
            className="absolute w-32 h-32 opacity-0 cursor-pointer"
          />
          {formData.foto_principal ? (
            <img
              src={URL.createObjectURL(formData.foto_principal)}
              alt="Foto principal"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">+</span>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Boton type="submit" texto={mode === 'add' ? 'Agregar' : 'Actualizar'} />
        <Boton type="button" texto="Cancelar" onClick={onClose} />
      </div>
    </form>
  );
};

export default MascotasForm;
