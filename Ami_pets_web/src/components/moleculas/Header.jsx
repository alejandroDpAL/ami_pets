import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado// Importa el componente SlideMenu
import Menu from './Menu.jsx';

const Header = ({ userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-yellow-700 text-white">

      <FaBars className="text-3xl cursor-pointer" onClick={toggleMenu} />

      <span className="text-3xl mr-4">{userName}</span>
      {isMenuOpen && <Menu isOpen={isMenuOpen} handleClose={() => setIsMenuOpen(false)} />}
    </div>
  );
};

export default Header;
