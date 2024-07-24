import React from 'react';

const ModalSesion = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; 
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Opciones de Sesión</h2>
        <button onClick={onClose}>Cerrar</button>
        <div className="options-container">
          <button onClick={() => alert('Seleccionaste Ver Perfil')}>Ver Perfil</button>
          <button onClick={() => alert('Seleccionaste Cerrar Sesión')}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSesion;
