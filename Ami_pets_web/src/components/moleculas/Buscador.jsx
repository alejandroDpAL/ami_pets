import React, { useState } from 'react';

function Buscador({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-md shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="p-2 w-[500px] h-[46px] rounded-l-md border border-gray-300 focus:outline-none focus:border-yellow-500"
      />
      <button
        onClick={handleSearchClick}
        className="p-2 bg-yellow-500 h-[44px] w-[70px] text-white rounded-r-md hover:bg-yellow-600"
      >
        Buscar
      </button>
    </div>
  );
}

export default Buscador;
