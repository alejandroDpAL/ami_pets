import React from 'react';
import Input from '../atoms/Input.jsx';
import Boton from '../atoms/Boton.jsx';

const LoginForm = () => (

  
  <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-700">
    <div className="w-full max-w-2xl h-4/5 p-12 bg-[#FDF2E9] rounded-lg shadow-md flex flex-col items-center justify-center">
      <div className="flex justify-center my-8">
        <img src="./img/logo_Ami.png" alt="Ami Pets" className="w-1/2" />
      </div>
      <form className="w-full flex flex-col items-center space-y-4">
        <Input type="email" placeholder="correo" className="w-3/4" />
        <Input type="password" placeholder="contraseña" className="w-3/4" />
        <div className="w-3/4 flex flex-col items-center space-y-4">
          <Boton text="iniciar sesión" />
          <Boton text="Registrarme" />
        </div>
      </form>
      <div className="mt-4 text-center w-full">
        <a href="#" className="text-xl hover:text-yellow-900">
          <strong>¿olvidaste tu contraseña?</strong>
        </a>
      </div>
      <div className="mt-4 text-center w-full">
        <a href="../src/components/pages/Principal.jsx" className="text-xl hover:text-yellow-900">
          <strong>Ingresar como invitado</strong>
        </a>
      </div>
    </div>
  </div>
);

export default LoginForm;
