// Este sería el componente padre que utiliza MascotasForm
import React from 'react';
import { IoClose } from 'react-icons/io5';
import MascotasForm from '../moleculas/MascotasForm'; // Asegúrate de que la ruta sea correcta

const MascotasAgregar = ({ handleClose }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
        <IoClose onClick={handleClose} className="absolute top-2 right-2 text-gray-500 h-6 w-6 hover:text-gray-700" />
        <MascotasForm userId={currentUser.identificacion} modo="add" onClose={handleClose} texto="Texto de ayuda" />
      </div>
    </div>
  );
};

export default MascotasAgregar;
