import React from "react";
import { FaTimes } from "react-icons/fa"; // Icono de cierre
import { Link } from "react-router-dom";

const Menu = ({ isOpen, handleClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-yellow-600 shadow-lg transform transition-transform z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <FaTimes
          className="text-white text-2xl cursor-pointer"
          onClick={handleClose}
        />
      </div>

      {/* Contenido del menú lo de adentro */}
      <div className="p-4">

        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src="/img/logo_Ami.png"
              alt="Avatar"
              className="w-32 h-32 rounded-full bg-gray-200"
            />
          </div>
          <div className="text-center">
            <p className=" text-white text-3xl font-semibold">mario</p>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="my-4 border-t border-gray-300"></div>

        {/* Opciones del menú */}
        <div>
          <Link
            to="/usuarios"
            className="block py-2 text-xl hover:bg-yellow-800 rounded-xl pl-2 "
          >
            Usuarios
          </Link>
          <Link
            to="/principal"
            className="block py-2 text-xl hover:bg-yellow-800 rounded-xl pl-2 "
          >
            Mascotas
          </Link>
          <Link
            to="/adopciones"
            className="block py-2 text-xl hover:bg-yellow-800 rounded-xl pl-2 "
          >
            Adopciones
          </Link>
          <Link
            to="/"
            className="block py-2 text-xl hover:bg-yellow-800 rounded-xl pl-2 "
          >
            Cerrar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
