import React from 'react';

const Boton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="w-2/3 px-4 py-2 my-2 mr-2 flex justify-center text-xl font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
  >
    {text}
  </button>
);

export default Boton;
