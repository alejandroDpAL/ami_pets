import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosBook } from 'react-icons/io'; 
import { Url } from '../../../Url.jsx';
import { GiMedicines } from 'react-icons/gi';
import { MdOutlinePets } from 'react-icons/md'; // Asegúrate de importar el ícono MdOutlinePets
import axios from 'axios';

const ModalMascotas = ({ isOpen, handleClose, title, mascota }) => {
  const [vacunas, setVacunas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [showVacunas, setShowVacunas] = useState(false);
  const [showHistorial, setShowHistorial] = useState(false);
  const [vacunasNotFound, setVacunasNotFound] = useState(false);
  const [adoptarStatus, setAdoptarStatus] = useState('Quiero adoptar'); // Estado inicial del botón

  useEffect(() => {
    if (!isOpen) {
      // Reset states when modal is closed
      setVacunas([]);
      setHistorial([]);
      setShowVacunas(false);
      setShowHistorial(false);
      setVacunasNotFound(false);
      setAdoptarStatus('Quiero adoptar'); // Reset estado de adopción
    }
  }, [isOpen]);

  const handleMedicineClick = async () => {
    if (!isOpen) return; // Only fetch data if modal is open

    try {
      const response = await axios.get(`${Url}/vacunas/listar_id/${mascota.id}`);
      if (response.data.length === 0) {
        setVacunasNotFound(true);
        setVacunas([]);
      } else {
        setVacunas(response.data);
        setVacunasNotFound(false);
      }
      setShowVacunas(!showVacunas); // Toggle visibility
    } catch (error) {
      console.error("Error fetching vacunas:", error);
      setVacunasNotFound(true);
    }
  };

  const handleBookClick = async () => {
    if (!isOpen) return; // Only fetch data if modal is open

    try {
      const response = await axios.get(`${Url}/historial/listar_id/${mascota.id}`);
      setHistorial(response.data);
      setShowHistorial(!showHistorial); // Toggle visibility
    } catch (error) {
      console.error("Error fetching historial:", error);
    }
  };

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
                  src={mascota.foto_principal ? `${Url}/uploads/${mascota.foto_principal}` : "./img/dog.png"} 
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
                  <p><b>Categoria:</b> {mascota.especie}</p>
                  <p><b>Raza:</b> {mascota.raza}</p>
                  <p><b>Ubicación:</b> {mascota.ubicacion}</p>
                  <p><b>Descripción:</b> {mascota.descripcion}</p>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <div className="flex gap-4 mb-2">
                    <GiMedicines 
                      className={`text-gray-600 h-8 w-8 cursor-pointer ${showVacunas ? 'text-yellow-600' : ''}`}
                      onClick={handleMedicineClick}
                    />
                    <IoIosBook 
                      className={`text-gray-600 h-8 w-8 cursor-pointer ${showHistorial ? 'text-yellow-600' : ''}`}
                      onClick={handleBookClick}
                    /> 
                  </div>
                  {showVacunas && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold">Vacunas:</h4>
                      {vacunasNotFound ? (
                        <p>Vacunas no encontradas.</p>
                      ) : (
                        <ul>
                          {vacunas.map((vacuna) => (
                            <li key={vacuna.id} className="mb-2">
                              <p><b>Nombre:</b> {vacuna.nombre}</p>
                              <p><b>Fecha de Aplicación:</b> {vacuna.fecha_aplicacion}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {showHistorial && historial.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold">Historial:</h4>
                      <ul>
                        {historial.map((item) => (
                          <li key={item.id} className="mb-2">
                            <p><b>Vacuna:</b> {item.nombre_vacuna}</p>
                            <p><b>Usuario:</b> {item.nombre_usuario}</p>
                            <p><b>Caso Especial:</b> {item.caso_especial || 'N/A'}</p>
                            <p><b>Discapacidad Presente:</b> {item.discapacidad_presente || 'N/A'}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={handleAdoptarClick}
                    className={`px-4 py-2 mt-16 rounded-lg ${
                      adoptarStatus === 'Quiero adoptar' ? 'bg-yellow-500 hover:bg-yellow-600' : 
                      adoptarStatus === 'Cancelar solicitud' ? 'bg-red-500 hover:bg-red-600' : 
                      'bg-red-500 hover:bg-red-600'
                    } text-white flex items-center`}
                  >
                    {adoptarStatus}
                    <MdOutlinePets className="ml-2 h-6 w-6" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="p-4">Cargando detalles...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMascotas;
