import React from 'react';
import { IoClose } from 'react-icons/io5';

const ModalUsuario = ({ children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <IoClose onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-2 right-2 cursor-pointer h-6 w-6" />
      {children}
    </div>
  </div>
);

export default ModalUsuario;
