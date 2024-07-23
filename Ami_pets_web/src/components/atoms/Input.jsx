import React from 'react';

function Input({ name, type, placeholder, onChange, className }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`border-2 border-gray-400 p-2 rounded ${className}`}
    />
  );
}

export default Input;
