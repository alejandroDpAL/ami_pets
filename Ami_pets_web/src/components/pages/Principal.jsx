import React, { useState, useEffect } from "react";
import ModalMascotas from "../organismos/ModalMascota.jsx";

import Header from "../moleculas/Header";
import Buscador from "../moleculas/Buscador";
import axios from "axios";
import { Url } from "../../../Url.jsx";
import { IoEye } from "react-icons/io5";
import { FaPencilAlt, FaTimes, FaPlus } from "react-icons/fa";
import MascotasAgregar from "../organismos/MascotasAgregar.jsx";

function Principal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAgregarOpen, setModalAgregarOpen] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [modo, setModo] = useState("registrar");
  const [mascotas, setMascotas] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get(`${Url}/mascotas/listar`);
        setMascotas(response.data);
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const toggleModalAgregar = () => {
    setModalAgregarOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEyeClick = async (id) => {
    try {
      const response = await axios.get(`${Url}/mascotas/listar_id/${id}`);
      setSelectedMascota(response.data);
      toggleModal();
    } catch (error) {
      console.error("Error fetching mascota data:", error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await axios.put(`${Url}/mascotas/actualizar/${id}`);
      setSelectedMascota(response.data);
      setModo("add");
      toggleModalAgregar();
    } catch (error) {
      console.error("Error fetching mascota data:", error);
    }
  };

  const handleAddClick = () => {
    setSelectedMascota(null);
    setModo("add");
    toggleModalAgregar();
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`${Url}/mascotas/buscar`, {
        params: { query: searchTerm },
      });
      setMascotas(response.data);
    } catch (error) {
      console.error("Error searching mascotas:", error);
    }
  };

  return (
    <>
      <div
        className={`container mx-auto mt-10 ${
          menuOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="p-4 shadow-lg rounded-lg bg-yellow-200 w-full max-w-xs mx-4"
            >
              <div className="flex flex-col items-start">
                <div className="flex row-span-2 w-full justify-between ">
                  <h2 className="text-2xl font-semibold mb-2 ">{mascota.nombre}</h2>
                  <IoEye
                    className="h-8 w-8 text-yellow-500 cursor-pointer flex justify-end"
                    onClick={() => handleEyeClick(mascota.id)}
                  />
                </div>
                <div className="w-full h-[200px] flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={
                      mascota.foto_principal
                        ? `${Url}/img/${mascota.foto_principal}`
                        : ""
                    }
                    alt="Mascota"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col mr-4">
                  <p className="text-lg"><b>{mascota.raza}</b></p>
                  <p className="text-lg"><b>{mascota.edad}</b></p>
                </div>
                <div className="flex row-span-3 justify-between w-full mt-4">
                  <FaPencilAlt
                    className="h-8 w-8 text-gray-800 cursor-pointer"
                    onClick={() => handleEditClick(mascota.id)}
                  />
                  <FaPlus
                    className="h-8 w-8 text-green-500 cursor-pointer"
                    onClick={handleAddClick}
                  />
                  <FaTimes
                    className="h-8 w-8 text-red-500 cursor-pointer"
                    // Agrega la funcionalidad de eliminar aquí
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalMascotas
        isOpen={modalOpen}
        handleClose={toggleModal}
        title="Detalles de la Mascota"
        mascota={selectedMascota}
      >
        <p className="text-sm text-gray-600">
          Detalles adicionales sobre la mascota aquí...
        </p>
      </ModalMascotas>

      {modalAgregarOpen && (
        <MascotasAgregar
          onClose={toggleModalAgregar}
          modo={modo}
          mascotaData={selectedMascota}
        />
      )}
    </>
  );
}

export default Principal;