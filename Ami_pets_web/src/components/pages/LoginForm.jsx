import React, { useState } from "react";
import Input from "../atoms/Input";
import Boton from "../atoms/Boton";
import ModalUsuario from "../organismos/ModalUsuario";
import UsuarioForm from "../moleculas/UsuarioForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { Url } from "../../../Url";

function LoginForm() {
  const [showModal, setShowModal] = useState(false);
  const [correo, setCorreo] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${Url}/validacion`,
        { correo, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta completa:", response.data);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.usuario));

        console.log("Inicio de sesión exitoso", response.data);
        window.location.href = "/principal";
      } else {
        // Manejar el error
        console.error(
          "Error al iniciar sesión",
          response.data.message || "Error desconocido"
        );
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-700">
      <div className="w-full max-w-2xl h-4/5 p-12 bg-[#FDF2E9] rounded-lg shadow-md flex flex-col items-center justify-center">
        <div className="flex justify-center my-8">
          <img src="./img/logo_Ami.png" alt="Ami Pets" className="w-1/2" />
        </div>
        <form className="w-full flex flex-col items-center space-y-4">
          <Input
            type="email"
            placeholder="Correo"
            className="w-3/4"
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            className="w-3/4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-3/4 flex flex-col items-center space-y-4">
            <Boton text="Iniciar sesión" onClick={handleLogin} />
            <Boton text="Registrarme" onClick={handleOpenModal} />
          </div>
        </form>
        <div className="mt-4 text-center w-full">
          <a href="#" className="text-xl hover:text-yellow-900">
            <strong>¿Olvidaste tu contraseña?</strong>
          </a>
        </div>
        <div className="mt-4 text-center w-full">
          <Link to="/principal" className="text-xl hover:text-yellow-900">
            <strong>Ingresar como invitado</strong>
          </Link>
        </div>
      </div>
      {showModal && (
        <ModalUsuario onClose={handleCloseModal}>
          <UsuarioForm onClose={handleCloseModal} />
        </ModalUsuario>
      )}
    </div>
  );
}

export default LoginForm;
