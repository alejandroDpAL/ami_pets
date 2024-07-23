import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaPaw } from 'react-icons/fa'; // Importa el ícono de huella
import axios from 'axios';
import { Url } from '../../../Url.jsx';

const ModalMascotas = ({ isOpen, handleClose, title, mascota }) => {
  const [adoptarStatus, setAdoptarStatus] = useState('Quiero adoptar');

  useEffect(() => {
    if (!isOpen) {
      setAdoptarStatus('Quiero adoptar');
    }
  }, [isOpen]);

  const handleAdoptarClick = () => {
    if (adoptarStatus === 'Quiero adoptar') {
      setAdoptarStatus('Cancelar solicitud');
      alert('Solicitud enviada, estás a la espera del administrador');
    } else if (adoptarStatus === 'Cancelar solicitud') {
      alert('Solicitud cancelada con éxito');
      setAdoptarStatus('Quiero adoptar');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-700 opacity-50"></div>
      </div>

      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl w-full">
        <div className="absolute top-0 right-0 p-2">
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <IoClose className="h-8 w-8" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mascota ? (
            <>
              <div className="flex justify-center items-center p-2">
                <img
                  src={
                    mascota.foto_principal
                      ? `${Url}/img/${mascota.foto_principal}`
                      : ''
                  }
                  alt="Mascota"
                  className="w-full h-full object-cover rounded-lg bg-gray-400"
                />
              </div>
              <div className="flex flex-col justify-between p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">{title}</h3>
                  <p><b>Nombre:</b> {mascota.nombre}</p>
                  <p><b>Edad:</b> {mascota.edad}</p>
                  <p><b>Género:</b> {mascota.genero}</p>
                  <p><b>Especie:</b> {mascota.especie}</p>
                  <p><b>Raza:</b> {mascota.raza}</p>
                  <p><b>Ubicación:</b> {mascota.ubicacion}</p>
                  <p><b>Descripción:</b> {mascota.descripcion}</p>
                  <p><b>Vacunas:</b> {mascota.vacunas}</p>
                  <p><b>Discapacidades:</b> {mascota.discapacidades}</p>
                  <p><b>Trato Especial:</b> {mascota.trato_especial}</p>
                  <p><b>Fecha de Publicación:</b> {mascota.fecha_publicacion}</p>
                </div>
                <button
                  className={`mt-4 ml-[90px] px-3 py-1.5 w-[180px] text-white rounded flex items-center ${adoptarStatus === 'Quiero adoptar' ? 'bg-green-500' : 'bg-red-500'}`}
                  onClick={handleAdoptarClick}
                >
                  {adoptarStatus}
                  <FaPaw className="ml-2" />
                </button>
              </div>
            </>
          ) : (
            <p>No se encontraron datos de la mascota.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMascotas;
