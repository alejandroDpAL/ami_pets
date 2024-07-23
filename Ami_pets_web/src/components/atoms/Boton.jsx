import React from 'react';

function Boton({ text, onClick, type }) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className="bg-yellow-500 text-white py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}

export default Boton;
