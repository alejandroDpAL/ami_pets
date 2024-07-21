import React, { useState, useEffect } from "react";
import ModalMascotas from "../organismos/ModalMascota.jsx";
import Header from "../moleculas/Header";
import Buscador from "../moleculas/Buscador";
import axios from "axios";
import { Url } from "../../../Url.jsx";
import { IoEye } from "react-icons/io5";

function Principal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);
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
      <Header userName={"mario "} />
      <Buscador onSearch={handleSearch} />

      <div
        className={`container mx-auto mt-10 ${
          menuOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="p-4 ml-16 shadow-lg rounded-lg bg-yellow-200 w-[380px] h-[360px] relative"
            >
              <h2 className="text-3xl font-semibold mb-2">{mascota.nombre}</h2>
              <img
                src={
                  mascota.foto_principal
                    ? `${Url}/uploads/${mascota.foto_principal}`
                    : "./img/dog.png"
                }
                alt="Mascota"
                className="w-full h-40 object-cover bg-gray-200 rounded-lg"
              />
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <p className="text-xl">
                    <b>{mascota.raza}</b>
                  </p>
                  <IoEye
                    className="h-12 w-12 ml-auto mt-2 text-yellow-500 cursor-pointer"
                    onClick={() => handleEyeClick(mascota.id)}
                  />
                </div>
                <p className="text-xl">
                  <b>{mascota.edad} años</b>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
    </>
  );
}

export default Principal;
